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
} from '$lib/server/types/validation/submissions.js';
import { getRunPlayer } from '$lib/server/repositories/playerRepository.js';

const indomitableQuestNames: { [key: string]: string } = {
	indomitable_nexaelio: 'Indomitable Nex Aelio',
	indomitable_renusretem: 'Indomitable Renus Retem',
	indomitable_amskvaris: 'Indomitable Ams Kvaris',
	indomitable_nilsstia: 'Indomitable Nils Stia'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params }) {
	const category = params.category?.toLowerCase() ?? '';

	// Validate request
	const body = await request.json();
	let submission: ApproveRequest;
	try {
		submission = await approveRequestSchema.validate(body);
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}
	if (!submission) {
		return jsonError(400, { error: 'json_parse_error' });
	}

	const pool = await leaderboardDb.connect();

	// Check data in db
	const { errorList: validationErrors, extra: data } = await checkData(submission, category);
	if (validationErrors.length > 0 || !data) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	// Get run data
	const playerRequest = pool.request();
	const { playerName } = await getRunPlayer(playerRequest, data.playerId);

	const transaction = new sql.Transaction(pool);
	try {
		await transaction.begin();
		await approveIndomitableSubmission(transaction, category, submission);
		await transaction.commit();

		notifyDiscordNewRunApproved(
			submission.moderatorName,
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

const checkData = async (run: ApproveRequest, category: string) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Run exists
	const submissionRequest = pool.request();
	const submissionResult = await getIndomitableExists(submissionRequest, category, run.runId);
	if (!submissionResult) {
		errorList.push(`Unknown submissionId`);
		return {
			errorList
		};
	}
	if (submissionResult && submissionResult.SubmissionStatus != 0) {
		errorList.push(`Submission already denied/approved`);
	}

	return {
		errorList,
		extra: {
			playerId: parseInt(submissionResult.PlayerId)
		}
	};
};
