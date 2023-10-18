import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { checkRunExists, denyRun } from '$lib/server/repositories/runsRepository.js';
import type { DenyRequest } from '$lib/types/api/validation/submissions';
import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';
import { getUser } from '../repositories/userRepository';
import { UserRole } from '$lib/types/api/users/userRole';
import { ErrorCodes } from '$lib/types/api/error';
import type { PlayersDbModel } from '../types/db/users/players';
import type { ServerUser } from '../types/auth/serverUser';

export const denyRunSubmission = async (requestUser: ServerUser, denyRequest: DenyRequest) => {
	// Check user permission
	const { errorList: roleError, user: moderator } = await checkUserPermission(requestUser.userId);
	if (roleError.length > 0 || !moderator) {
		return jsonError(401, { error: ErrorCodes.Unauthorized, details: roleError });
	}

	// Check data in db
	const { errorList: validationErrors, run: runData } = await checkRunData(denyRequest, moderator);
	if (validationErrors.length > 0 || !runData) {
		return jsonError(400, { error: ErrorCodes.BadRequest, details: validationErrors });
	}

	try {
		const pool = await leaderboardDb.connect();
		const request = pool.request();
		await denyRun(request, denyRequest.runId, moderator.PlayerName, denyRequest.modNotes);

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

	if (!user || !user.Roles?.includes(UserRole.Moderator)) {
		return {
			name: undefined,
			errorList: ['Permission denied. User not a moderator.'],
		};
	}

	return {
		user: user,
		errorList: [],
	};
};

const checkRunData = async (denyRequest: DenyRequest, moderator: PlayersDbModel) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Run exists
	const request = pool.request();
	const submissionResult = await checkRunExists(request, denyRequest.runId);

	if (!submissionResult || !submissionResult.runId) {
		errorList.push(`Unknown submissionId`);
		return {
			errorList,
			run: undefined,
		};
	}
	if (parseInt(submissionResult.submissionStatus) != RunSubmissionStatus.AwaitingApproval) {
		errorList.push(`Submission already denied/approved`);
	}

	return {
		errorList,
		run: submissionResult,
	};
};
