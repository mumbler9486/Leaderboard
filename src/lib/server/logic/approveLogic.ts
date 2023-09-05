import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { getRunPlayer } from '$lib/server/repositories/playerRepository.js';
import { approveRun, getRunById } from '$lib/server/repositories/runsRepository.js';
import type { ApproveRequest } from '$lib/types/api/validation/submissions';
import { notifyDiscordNewRunApprovedLogic } from './discordNotifyLogic';
import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';
import { ErrorCodes } from '$lib/types/api/error';
import { getUser } from '../repositories/userRepository';
import { UserRole } from '$lib/types/api/users/userRole';

export const approveRunSubmission = async (approveRequest: ApproveRequest) => {
	const pool = await leaderboardDb.connect();

	// Check user permission
	const { errorList: roleError, name: moderatorName } = await checkUserPermission(
		approveRequest.moderatorUserId
	);
	if (roleError.length > 0 || !moderatorName) {
		return jsonError(401, { error: ErrorCodes.Unauthorized, details: roleError });
	}

	// Check data in db
	const { errorList: validationErrors, extra: data } = await checkData(approveRequest);
	if (validationErrors.length > 0 || !data) {
		return jsonError(400, { error: ErrorCodes.BadRequest, details: validationErrors });
	}

	// Get run player
	const playerRequest = pool.request();
	const { playerName } = await getRunPlayer(playerRequest, data.playerId);
	if (!playerName) {
		console.error('Player name is null on approval. Aborting approval.');
		return jsonError(400, { error: 'bad_request', details: ['Unknown player in run'] });
	}

	try {
		await approveRun(pool.request(), approveRequest.runId, moderatorName, approveRequest.modNotes);

		notifyDiscordNewRunApprovedLogic(
			moderatorName,
			playerName ?? '<unknown_player>',
			data.run.RunQuest,
			data.run.RunCategory,
			parseInt(data.run.RunPartySize)
		);
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

const checkData = async (run: ApproveRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Run exists
	const request = pool.request();
	const submissionResult = await getRunById(request, run.runId, false);

	if (!submissionResult) {
		errorList.push(`Unknown run id`);
		return {
			errorList
		};
	}
	if (parseInt(submissionResult.RunSubmissionStatus) != RunSubmissionStatus.AwaitingApproval) {
		errorList.push(`Submission already denied/approved`);
	}

	return {
		errorList,
		extra: {
			playerId: parseInt(submissionResult.RunSubmitterId),
			run: submissionResult
		}
	};
};
