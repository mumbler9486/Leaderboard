import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import {
	checkDfaVideoExists,
	getDfaDuoSubmissions,
	getDfaPartySubmissions,
	getDfaSoloSubmissions,
	insertDfaPartySubmission,
	insertDfaSoloSubmission
} from '$lib/server/repositories/dfaSubmissionsRepository.js';
import {
	mapDfaDuoToSubmission,
	mapDfaPartyToSubmission,
	mapDfaSoloToSubmission
} from '$lib/server/mappers/api/dfaSubmitMapper.js';
import { RunCategories, parseRunCategory } from '$lib/types/api/categories.js';
import { notifyDiscordNewRunSubmitted } from '$lib/server/discordNotify.js';
import { jsonError } from '$lib/server/error.js';
import {
	dfaSubmissionRequestSchema,
	type DfaSubmissionRequest
} from '$lib/server/types/validation/dfaSubmissions.js';
import { weaponsToDbValMap } from '$lib/server/db/util/weaponType.js';
import { parseWeapon } from '$lib/types/api/weapon.js';
import { normalizeYoutubeLink } from '$lib/utils/youtube.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const category = parseRunCategory(params.category);

	const poolConnection = await leaderboardDb.connect();

	switch (category) {
		case RunCategories.DfaParty:
			try {
				const request = poolConnection.request();
				const data = await getDfaPartySubmissions(request);
				const submissions = mapDfaPartyToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		case RunCategories.DfaDuo:
			try {
				const request = poolConnection.request();
				const data = await getDfaDuoSubmissions(request);
				const submissions = mapDfaDuoToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		case RunCategories.DfaSolo:
			try {
				const request = poolConnection.request();
				const data = await getDfaSoloSubmissions(request);
				const submissions = mapDfaSoloToSubmission(data);
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
	8: 'Full MPA'
};

const questTypeMap: { [key: string]: string } = {
	trigger: 'Trigger',
	urgent: 'Urgent Quest'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate request
	const body = await request.json();
	let parsedRun: DfaSubmissionRequest;
	try {
		parsedRun = await dfaSubmissionRequestSchema.validate(body);
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
			await insertDfaSoloSubmission(request, parsedRun);
		} else {
			await insertDfaPartySubmission(request, parsedRun);
		}

		const player1Name = parsedRun.username;
		const dfaType = questTypeMap[parsedRun.type];
		const partyType = partyTypeMap[parsedRun.players.length] ?? '';
		notifyDiscordNewRunSubmitted(player1Name, `Dark Falz Aegis [${dfaType}] (${partyType})`);
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkRunData = async (run: DfaSubmissionRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Video links not already in use
	const videoLinks = run.players
		.map((p) => p.povVideoLink)
		.filter((l): l is string => l !== undefined);

	const existingVideoLinks = await checkDfaVideoExists(pool.request(), videoLinks);

	if (existingVideoLinks.length > 0) {
		existingVideoLinks.forEach((l) => {
			errorList.push(`Video already used in another run. VideoUrl=${l}`);
		});
	}

	return errorList;
};
