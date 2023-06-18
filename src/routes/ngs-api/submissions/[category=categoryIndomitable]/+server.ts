import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import {
	checkIndomitableVideoExists,
	getIndomitableSubmissions,
	insertIndomitableSoloRun
} from '$lib/server/repositories/indomitableSubmissionsRepository.js';
import { mapIndomitableDuel } from '$lib/server/mappers/api/indomitableSubmitMapper.js';
import { RunCategories, parseRunCategory } from '$lib/types/api/categories.js';
import { jsonError } from '$lib/server/error.js';
import {
	indomitableSubmissionRequestSchema,
	type IndomitableSubmissionRequest
} from '$lib/types/api/validation/indomitableSubmissions.js';
import { normalizeYoutubeLink } from '$lib/utils/youtube.js';
import { parseWeapon } from '$lib/types/api/weapon.js';
import { weaponsToDbValMap } from '$lib/server/db/util/weaponType.js';
import { notifyDiscordNewRunSubmitted } from '$lib/server/discordNotify.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const category = parseRunCategory(params.category);
	if (!category) {
		return jsonError(404, 'Unknown category');
	}

	const poolConnection = await leaderboardDb.connect();

	try {
		const request = poolConnection.request();
		const data = await getIndomitableSubmissions(request, category);
		const submissions = mapIndomitableDuel(data, category);
		return json(submissions);
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const indomitableBosses: { [key: string]: string } = {
	[RunCategories.IndomitableNexAelio]: 'Nex Aelio',
	[RunCategories.IndomitableRenusRetem]: 'Renus Retem',
	[RunCategories.IndomitableAmsKvaris]: 'Ams Kvaris',
	[RunCategories.IndomitableNilsStia]: 'Nils Stia',
	[RunCategories.IndomitableHalvaldi]: 'Halvaldi'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }) {
	const category = parseRunCategory(params.category);
	if (!category) {
		return jsonError(404, 'Unknown category');
	}

	// Validate request
	const body = await request.json();
	let parsedRun: IndomitableSubmissionRequest;
	try {
		parsedRun = await indomitableSubmissionRequestSchema.validate(body);
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}
	if (!parsedRun) {
		return jsonError(400, { error: 'json_parse_error' });
	}

	// Transform data
	parsedRun.players.forEach((p) => {
		p.povVideoLink = p.povVideoLink ? normalizeYoutubeLink(p.povVideoLink) : null;
		p.weapons = p.weapons.map((w) => weaponsToDbValMap[parseWeapon(w) ?? '']);
	});

	// Check run data
	const validationErrors = await checkRunData(parsedRun);
	if (validationErrors.length > 0) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	// Insert run
	try {
		const pool = await leaderboardDb.connect();
		const request = pool.request();
		await insertIndomitableSoloRun(request, parsedRun, category);

		const player1Name = parsedRun.username;
		const bossName = indomitableBosses[category];
		notifyDiscordNewRunSubmitted(player1Name, `Indomitable ${bossName} Duel`);
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkRunData = async (run: IndomitableSubmissionRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Video links not already in use
	const videoLinks = run.players
		.map((p) => p.povVideoLink)
		.filter((l): l is string => l !== undefined);

	const existingVideoLinks = await checkIndomitableVideoExists(pool.request(), videoLinks);

	if (existingVideoLinks.length > 0) {
		existingVideoLinks.forEach((l) => {
			errorList.push(`Video already used in another run. VideoUrl=${l}`);
		});
	}

	return errorList;
};
