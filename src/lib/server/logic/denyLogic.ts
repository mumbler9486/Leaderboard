import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { SubmissionStatusDbValue } from '$lib/types/api/runs/submissionStatus.js';
import { checkRunExists, denyRun } from '$lib/server/repositories/runsRepository.js';
import type { DenyRequest } from '$lib/types/api/validation/submissions';

export const denyRunSubmission = async (denyRequest: DenyRequest) => {
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
};

const checkData = async (denyRequest: DenyRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Run exists
	const request = pool.request();
	const submissionResult = await checkRunExists(request, denyRequest.runId);

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
