import sql from 'mssql';
import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { parseWeapon } from '$lib/types/api/weapon';
import { leaderboardDb } from '$lib/server/db/db';
import { error, json } from '@sveltejs/kit';
import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import { type InferType, string, number, object, array } from 'yup';
import { normalizeYoutubeLink, youtubeUrlRegex } from '$lib/utils/youtube.js';
import { jsonError } from '$lib/server/error.js';
import { weaponsToDbValMap } from '$lib/server/db/util/weaponType.js';
import { notifyDiscordNewRunSubmitted } from '$lib/server/discordNotify.js';

const denyRequestSchema = object({
	category: string().required(),
	moderatorId: number().required(),
	runId: number().required(),
	modNotes: string().nullable().max(500)
});

const indomitableTables: { [key: string]: string } = {
	indomitablenexaelio: 'IndomitableNexAelioRuns',
	indomitablerenusretem: 'IndomitableRenusRetemRuns',
	indomitableamskvaris: 'IndomitableAmsKvarisRuns',
	indomitablenilsstia: 'IndomitableNilsStiaRuns'
};

type DenyRequest = InferType<typeof denyRequestSchema>;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate request
	const body = await request.json();
	let submission: DenyRequest;
	try {
		submission = await denyRequestSchema.validate(body);
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

	// Check data in db
	const validationErrors = await checkData(submission);
	if (validationErrors.length > 0) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	try {
		await denySubmissionRun(submission);
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkData = async (run: DenyRequest) => {
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

const denySubmissionRun = async (run: DenyRequest) => {
	const table = indomitableTables[run.category];
	const pool = await leaderboardDb.connect();
	const result = await pool
		.request()
		.input('submissionId', sql.Int, run.runId)
		.input('modNotes', sql.NVarChar, run.modNotes).query(`
      UPDATE Submissions.${table}
      SET SubmissionStatus = 1, ModNotes = @modNotes
      WHERE SubmissionId = @submissionId;
    `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Indomitable Run denial failed.`);
	}
};
