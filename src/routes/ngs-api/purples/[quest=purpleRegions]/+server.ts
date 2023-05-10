import sql from 'mssql';
import { Weapon, parseWeapon } from '$lib/types/api/weapon';
import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { notifyDiscordNewRunSubmitted } from '$lib/server/discordNotify';
import { normalizeYoutubeLink } from '$lib/utils/youtube';
import { jsonError } from '$lib/server/error.js';
import { weaponsToDbValMap } from '$lib/server/db/util/weaponType.js';
import {
	purpleSubmissionRequestSchema,
	type PurpleSubmissionRequest
} from '$lib/server/types/validation/purpleSubmissions.js';
import {
	checkPurpleVideoExists,
	insertPurplePartySubmission,
	insertPurpleSoloSubmission
} from '$lib/server/repositories/purpleSubmissionsRepository.js';

// For webhook notify
const partyTypeMap: { [key: number]: string } = {
	1: 'Solo',
	2: 'Duo',
	3: 'Party',
	4: 'Party'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }) {
	const quest = params.quest ?? '';

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
	parsedRun.region = quest.toLowerCase();
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
		const questName = quest.charAt(0).toUpperCase() + quest.slice(1);
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
