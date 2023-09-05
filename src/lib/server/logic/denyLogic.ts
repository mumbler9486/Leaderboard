import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { checkRunExists, denyRun } from '$lib/server/repositories/runsRepository.js';
import type { DenyRequest } from '$lib/types/api/validation/submissions';
import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';
import { getUser } from '../repositories/userRepository';
import { UserRole } from '$lib/types/api/users/userRole';
import { ErrorCodes } from '$lib/types/api/error';

export const denyRunSubmission = async (denyRequest: DenyRequest) => {
	// Check user permission
	const { errorList: roleError, name: moderatorName } = await checkUserPermission(
		denyRequest.moderatorUserId
	);
	if (roleError.length > 0 || !moderatorName) {
		return jsonError(401, { error: ErrorCodes.Unauthorized, details: roleError });
	}

	// Check data in db
	const { errorList: validationErrors, extra: data } = await checkRunData(denyRequest);
	if (validationErrors.length > 0 || !data) {
		return jsonError(400, { error: ErrorCodes.BadRequest, details: validationErrors });
	}

	try {
		const pool = await leaderboardDb.connect();
		const request = pool.request();
		await denyRun(request, denyRequest.runId, moderatorName, denyRequest.modNotes);

		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
};

const checkUserPermission = async (moderatorUserId: string) => {
	const pool = await leaderboardDb.connect();
	const request = pool.request();

	const user = await getUser(request, moderatorUserId);
	console.log(user);
	if (
		!user ||
		(!user.Roles?.includes(UserRole.Moderator) && !user.Roles?.includes(UserRole.Administrator))
	) {
		return {
			name: undefined,
			errorList: ['Permission denied. User not a moderator.']
		};
	}

	return {
		name: user.PlayerName,
		errorList: []
	};
};

const checkRunData = async (denyRequest: DenyRequest) => {
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
	if (parseInt(submissionResult.submissionStatus) != RunSubmissionStatus.AwaitingApproval) {
		errorList.push(`Submission already denied/approved`);
	}

	return {
		errorList,
		extra: {
			playerId: parseInt(submissionResult.submitterId)
		}
	};
};
