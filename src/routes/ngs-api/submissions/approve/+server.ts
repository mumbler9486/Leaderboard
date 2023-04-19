import sql from 'mssql';
import { leaderboardDb } from '$lib/server/db/db';
import { error, json } from '@sveltejs/kit';
import { type InferType, string, number, object } from 'yup';
import { jsonError } from '$lib/server/error.js';
import { notifyDiscordNewRunApproved } from '$lib/server/discordNotify.js';

const approveRequestSchema = object({
	category: string().required(),
	moderatorName: string().required(),
	runId: number().required(),
	modNotes: string().nullable().max(500)
});

const indomitableTables: { [key: string]: string } = {
	indomitablenexaelio: 'IndomitableNexAelioRuns',
	indomitablerenusretem: 'IndomitableRenusRetemRuns',
	indomitableamskvaris: 'IndomitableAmsKvarisRuns',
	indomitablenilsstia: 'IndomitableNilsStiaRuns'
};

const indomitableQuestNames: { [key: string]: string } = {
	indomitablenexaelio: 'Indomitable Nex Aelio',
	indomitablerenusretem: 'Indomitable Renus Retem',
	indomitableamskvaris: 'Indomitable Ams Kvaris',
	indomitablenilsstia: 'Indomitable Nils Stia'
};

type ApproveRequest = InferType<typeof approveRequestSchema>;

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
		throw Error(`Invalid boss ${submission.category}`);
	}

	// Get run data
	const { playerName } = await getRunPlayer(submission);

	// Check data in db
	const validationErrors = await checkData(submission);
	if (validationErrors.length > 0) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	const pool = await leaderboardDb.connect();
	const transaction = new sql.Transaction(pool);
	try {
		await transaction.begin();
		await approveSubmissionRun(transaction, submission);
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

const getRunPlayer = async (run: ApproveRequest) => {
	const pool = await leaderboardDb.connect();
	const table = indomitableTables[run.category];

	const submissionRequest = pool.request();
	const submissionResults = await submissionRequest.input('submissionId', sql.Int, run.runId)
		.query(`
    SELECT submissions.SubmissionId, pi.PlayerId, pi.PlayerName
    FROM Submissions.${table} AS submissions
		INNER JOIN Players.Information AS pi ON submissions.PlayerID = pi.PlayerID
    WHERE SubmissionId = @submissionId;
		`);

	if (!submissionResults.recordset[0]) {
		return { playerId: 0, playerName: undefined };
	}

	const player = submissionResults.recordset[0];
	return {
		playerId: parseInt(player.PlayerId),
		playerName: player.PlayerName as string
	};
};

const checkData = async (run: ApproveRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	const table = indomitableTables[run.category];

	// Run exists
	let submissionRequest = pool.request();
	submissionRequest.input('submissionId', sql.Int, run.runId);
	const submissionResults = await submissionRequest.query(`
    SELECT SubmissionId, SubmissionStatus
    FROM Submissions.${table}
    WHERE SubmissionId = @submissionId;
		`);

	const records = Array.from(submissionResults.recordset);
	if (records.length == 0) {
		errorList.push(`Unknown submissionId`);
	}
	if (records.some((s) => s.SubmissionStatus != 0)) {
		errorList.push(`Submission already denied/approved.`);
	}

	return errorList;
};

const approveSubmissionRun = async (transaction: sql.Transaction, run: ApproveRequest) => {
	const table = indomitableTables[run.category];

	const request = transaction.request();
	request.input('modNotes', sql.NVarChar, run.modNotes).input('submissionId', sql.Int, run.runId);

	// Add run data to runs table
	const runInsertResult = await request.query(`
    INSERT INTO ${table} (PlayerID,RunCharacterName,ShipOverride,Patch,Region,Rank,RunTime,MainClass,SubClass,WeaponInfo1,WeaponInfo2,WeaponInfo3,WeaponInfo4,WeaponInfo5,WeaponInfo6,Link,Notes,SubmissionTime,SubmitterID,VideoTag,ModNotes,Augments)
    SELECT PlayerID,RunCharacterName,NULL,Patch,NULL,Rank,RunTime,MainClass,SubClass,WeaponInfo1,WeaponInfo2,WeaponInfo3,WeaponInfo4,WeaponInfo5,WeaponInfo6,Link,Notes,SubmissionTime,SubmitterID,VideoTag,@modNotes,Augments
    FROM Submissions.${table}
		WHERE SubmissionId = @submissionId;
  `);
	if (runInsertResult.rowsAffected[0] == 0) {
		throw Error(`Indomitable Run insertion failed.`);
	}

	// Update Submission
	const submissionResult = await request.query(`
      UPDATE Submissions.${table}
      SET SubmissionStatus = 1, ModNotes = @modNotes
      WHERE SubmissionId = @submissionId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Indomitable Run approval failed.`);
	}
};
