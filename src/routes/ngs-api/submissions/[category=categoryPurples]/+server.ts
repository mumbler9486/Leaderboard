import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import {
	checkPurpleVideoExists,
	getPurpleDuoSubmissions,
	getPurplePartySubmissions,
	getPurpleSoloSubmissions,
	insertPurplePartySubmission,
	insertPurpleSoloSubmission
} from '$lib/server/repositories/purpleSubmissionsRepository.js';
import {
	mapPurpleDuoToSubmission,
	mapPurplePartyToSubmission,
	mapPurpleSoloToSubmission
} from '$lib/server/mappers/api/purpleSubmitMapper.js';
import { RunCategories, parseRunCategory } from '$lib/types/api/categories.js';
import {
	purpleSubmissionRequestSchema,
	type PurpleSubmissionRequest
} from '$lib/types/api/validation/purpleSubmissions.js';
import { jsonError } from '$lib/server/error.js';
import { normalizeYoutubeLink } from '$lib/utils/youtube.js';
import { weaponsToDbValMap } from '$lib/server/db/util/weaponType.js';
import { parseWeapon } from '$lib/types/api/weapon.js';
import { notifyDiscordNewRunSubmitted } from '$lib/server/discordNotify.js';
import { PurpleRegion } from '$lib/server/types/purpleRegions.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const category = parseRunCategory(params.category);

	const poolConnection = await leaderboardDb.connect();

	switch (category) {
		case RunCategories.PurpleParty:
			try {
				const request = poolConnection.request();
				const data = await getPurplePartySubmissions(request);
				const submissions = mapPurplePartyToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		case RunCategories.PurpleDuo:
			try {
				const request = poolConnection.request();
				const data = await getPurpleDuoSubmissions(request);
				const submissions = mapPurpleDuoToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		case RunCategories.PurpleSolo:
			try {
				const request = poolConnection.request();
				const data = await getPurpleSoloSubmissions(request);
				const submissions = mapPurpleSoloToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		default:
			throw error(404, 'not_found');
	}
}

// For webhook notify
const partyTypeMap: { [key: number]: string } = {
	1: 'Solo',
	2: 'Duo',
	3: 'Party',
	4: 'Party'
};

const regionNameMap: { [key: string]: string } = {
	[PurpleRegion.Aelio]: 'Aelio',
	[PurpleRegion.Retem]: 'Retem',
	[PurpleRegion.Kvaris]: 'Kvaris',
	[PurpleRegion.Stia]: 'Stia'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }) {
	const category = parseRunCategory(params.category);
	if (!category) {
		return jsonError(404, 'Unknown category');
	}

	// Validate request
	const body = await request.json();
	let parsedRun: PurpleSubmissionRequest;
	try {
		parsedRun = await purpleSubmissionRequestSchema.validate(body);
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
		if (parsedRun.players.length == 1) {
			await insertPurpleSoloSubmission(request, parsedRun);
		} else {
			await insertPurplePartySubmission(request, parsedRun);
		}

		const player1Name = parsedRun.username;
		const questName = regionNameMap[parsedRun.region];
		const partyType = partyTypeMap[parsedRun.players.length] ?? '';
		notifyDiscordNewRunSubmitted(player1Name, `${questName} Purple (${partyType})`);
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkRunData = async (run: PurpleSubmissionRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Video links not already in use
	const videoLinks = run.players
		.map((p) => p.povVideoLink)
		.filter((l): l is string => l !== undefined);

	const existingVideoLinks = await checkPurpleVideoExists(pool.request(), videoLinks);

	if (existingVideoLinks.length > 0) {
		existingVideoLinks.forEach((l) => {
			errorList.push(`Video already used in another run. VideoUrl=${l}`);
		});
	}

	return errorList;
};
