import sql from 'mssql';
import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { notifyDiscordNewRunApproved } from '$lib/server/discordNotify.js';
import {
	approveRequestSchema,
	type ApproveRequest
} from '$lib/types/api/validation/submissions.js';
import { getRunPlayer } from '$lib/server/repositories/playerRepository.js';
import { RunCategories, parseRunCategory } from '$lib/types/api/categories.js';
import {
	approvePurpleDuo,
	approvePurpleParty,
	approvePurpleSolo,
	getPurpleDuoExists,
	getPurplePartyExists,
	getPurpleSoloExists
} from '$lib/server/repositories/purpleSubmissionsRepository.js';

const purpleQuestNames: { [key: string]: string } = {
	[RunCategories.PurpleParty]: 'Purple Party',
	[RunCategories.PurpleDuo]: 'Purple Duo',
	[RunCategories.PurpleSolo]: 'Purple Solo'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params }) {
	const category = parseRunCategory(params.category);
	if (!category) {
		return jsonError(404, 'Unknown category');
	}

	// Validate request
	const body = await request.json();
	let approveRequest: ApproveRequest;
	try {
		approveRequest = await approveRequestSchema.validate(body);
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}
	if (!approveRequest) {
		return jsonError(400, { error: 'json_parse_error' });
	}

	const pool = await leaderboardDb.connect();

	// Check data in db
	const { errorList: validationErrors, extra: data } = await checkData(approveRequest, category);
	if (validationErrors.length > 0 || !data) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	// Get run data
	const playerRequest = pool.request();
	const { playerName } = await getRunPlayer(playerRequest, data.playerId);

	const transaction = new sql.Transaction(pool);
	try {
		await transaction.begin();
		if (category == RunCategories.PurpleSolo) {
			await approvePurpleSolo(transaction, approveRequest);
		} else if (category == RunCategories.PurpleDuo) {
			await approvePurpleDuo(transaction, approveRequest);
		} else if (category == RunCategories.PurpleParty) {
			await approvePurpleParty(transaction, approveRequest);
		}
		await transaction.commit();

		notifyDiscordNewRunApproved(
			approveRequest.moderatorName,
			playerName ?? '<Player_Name>',
			purpleQuestNames[category]
		);
		return json({ data: 'success' });
	} catch (err) {
		await transaction.rollback();
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkData = async (run: ApproveRequest, category: RunCategories) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Run exists
	const submissionRequest = pool.request();

	let submissionResult:
		| {
				SubmissionId: string;
				SubmissionStatus: string;
				PlayerId: string;
		  }
		| undefined;
	if (category == RunCategories.PurpleSolo) {
		submissionResult = await getPurpleSoloExists(submissionRequest, run.runId);
	} else if (category == RunCategories.PurpleDuo) {
		submissionResult = await getPurpleDuoExists(submissionRequest, run.runId);
	} else if (category == RunCategories.PurpleParty) {
		submissionResult = await getPurplePartyExists(submissionRequest, run.runId);
	}

	if (!submissionResult) {
		errorList.push(`Unknown submissionId`);
		return {
			errorList
		};
	}
	if (submissionResult && submissionResult.SubmissionStatus != '0') {
		errorList.push(`Submission already denied/approved`);
	}

	return {
		errorList,
		extra: {
			playerId: parseInt(submissionResult.PlayerId)
		}
	};
};
