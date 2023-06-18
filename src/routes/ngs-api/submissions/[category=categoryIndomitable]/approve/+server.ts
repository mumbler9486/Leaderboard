import sql from 'mssql';
import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { notifyDiscordNewRunApproved } from '$lib/server/discordNotify.js';
import {
	approveIndomitableSubmission,
	getIndomitableExists
} from '$lib/server/repositories/indomitableSubmissionsRepository.js';
import {
	approveRequestSchema,
	type ApproveRequest
} from '$lib/types/api/validation/submissions.js';
import { getRunPlayer } from '$lib/server/repositories/playerRepository.js';
import { RunCategories, parseRunCategory } from '$lib/types/api/categories.js';

const indomitableQuestNames: { [key: string]: string } = {
	[RunCategories.IndomitableNexAelio]: 'Indomitable Nex Aelio',
	[RunCategories.IndomitableRenusRetem]: 'Indomitable Renus Retem',
	[RunCategories.IndomitableAmsKvaris]: 'Indomitable Ams Kvaris',
	[RunCategories.IndomitableNilsStia]: 'Indomitable Nils Stia',
	[RunCategories.IndomitableHalvaldi]: 'Indomitable Halvaldi'
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
		await approveIndomitableSubmission(transaction, approveRequest);
		await transaction.commit();

		notifyDiscordNewRunApproved(
			approveRequest.moderatorName,
			playerName ?? '<Player_Name>',
			indomitableQuestNames[category]
		);
		return json({ data: 'success' });
	} catch (err) {
		await transaction.rollback();
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkData = async (approveRequest: ApproveRequest, category: RunCategories) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Run exists
	const submissionRequest = pool.request();
	const submissionResult = await getIndomitableExists(
		submissionRequest,
		category,
		approveRequest.runId
	);
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
