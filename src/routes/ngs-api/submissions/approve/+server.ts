import sql from 'mssql';
import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { notifyDiscordNewRunApproved } from '$lib/server/discordNotify.js';
import { approveIndomitableSubmission } from '$lib/server/repositories/indomitableSubmissionsRepository.js';
import {
	approveRequestSchema,
	type ApproveRequest
} from '$lib/server/types/validation/submissions.js';
import { getRunPlayer } from '$lib/server/repositories/playerRepository.js';

const indomitableTables: { [key: string]: string } = {
	indomitable_nexaelio: 'IndomitableNexAelioRuns',
	indomitable_renusretem: 'IndomitableRenusRetemRuns',
	indomitable_amskvaris: 'IndomitableAmsKvarisRuns',
	indomitable_nilsstia: 'IndomitableNilsStiaRuns'
};

const indomitableQuestNames: { [key: string]: string } = {
	indomitable_nexaelio: 'Indomitable Nex Aelio',
	indomitable_renusretem: 'Indomitable Renus Retem',
	indomitable_amskvaris: 'Indomitable Ams Kvaris',
	indomitable_nilsstia: 'Indomitable Nils Stia'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
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

	const insertTable = indomitableTables[submission.category.toLowerCase()];
	if (!insertTable) {
		return jsonError(400, `Invalid category ${submission.category}`);
	}

	const pool = await leaderboardDb.connect();

	// Check data in db
	const { errorList: validationErrors, extra: data } = await checkData(submission);
	if (validationErrors.length > 0) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	// Get run data
	const playerRequest = pool.request();
	const { playerName } = await getRunPlayer(playerRequest, data.playerId);

	const transaction = new sql.Transaction(pool);
	try {
		await transaction.begin();
		await approveIndomitableSubmission(transaction, submission);
		await transaction.commit();

		notifyDiscordNewRunApproved(
			submission.moderatorName,
			playerName ?? '<Player_Name>',
			indomitableQuestNames[submission.category.toLowerCase()]
		);
		return json({ data: 'success' });
	} catch (err) {
		await transaction.rollback();
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkData = async (run: ApproveRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	const table = indomitableTables[run.category];

	// Run exists
	const submissionRequest = pool.request();
	submissionRequest.input('submissionId', sql.Int, run.runId);
	const submissionResults = await submissionRequest.query(`
    SELECT SubmissionId, SubmissionStatus, PlayerId
    FROM Submissions.${table}
    WHERE SubmissionId = @submissionId;
		`);

	if (Array.from(submissionResults.recordset).length == 0) {
		errorList.push(`Unknown submissionId`);
	}
	const submission = submissionResults.recordset[0];
	if (submission.SubmissionStatus != 0) {
		errorList.push(`Submission already denied/approved.`);
	}

	return {
		errorList,
		extra: {
			playerId: parseInt(submission.PlayerId)
		}
	};
};
