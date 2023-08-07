import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { denyRequestSchema, type DenyRequest } from '$lib/types/api/validation/submissions.js';
import { SubmissionStatusDbValue } from '$lib/server/types/db/runs/submissionStatus.js';
import { checkRunExists, denyRun } from '$lib/server/repositories/runsRepository.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate request
	const body = await request.json();
	let denyRequest: DenyRequest;
	try {
		denyRequest = await denyRequestSchema.validate(body);
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}
	if (!denyRequest) {
		return jsonError(400, { error: 'json_parse_error' });
	}

	// Check data in db
	const { errorList: validationErrors, extra: data } = await checkData(denyRequest);
	if (validationErrors.length > 0 || !data) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	try {
		const pool = await leaderboardDb.connect();
		const request = pool.request();
		await denyRun(request, denyRequest.runId, denyRequest.modNotes);

		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkData = async (run: DenyRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Run exists
	const request = pool.request();
	const submissionResult = await checkRunExists(request, run.runId);

	if (!submissionResult || !submissionResult.runId) {
		errorList.push(`Unknown submissionId`);
		return {
			errorList
		};
	}
	if (parseInt(submissionResult.submissionStatus) != SubmissionStatusDbValue.AwaitingApproval) {
		errorList.push(`Submission already denied/approved`);
	}

	return {
		errorList,
		extra: {
			playerId: parseInt(submissionResult.submitterId)
		}
	};
};
