import { leaderboardDb } from '$lib/server/db/pgDb';
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
import type { PlayersDbModel2 } from '../types/db/users/players';
import type { ServerUser } from '../types/auth/serverUser';
import type { NgsQuests } from '$lib/types/api/runs/quests';
import type { NgsRunCategories } from '$lib/types/api/runs/categories';

export const approveRunSubmission = async (
	requestUser: ServerUser,
	approveRequest: ApproveRequest
) => {
	const pool = await leaderboardDb.connect();

	// Check user permission
	const { errorList: roleError, user: moderator } = await checkUserPermission(requestUser.userId);
	if (roleError.length > 0 || !moderator) {
		return jsonError(401, { error: ErrorCodes.Unauthorized, details: roleError });
	}

	// Check data in db
	const { errorList: validationErrors, run: runData } = await checkRunData(
		approveRequest,
		moderator
	);
	if (validationErrors.length > 0 || !runData) {
		return jsonError(400, { error: ErrorCodes.BadRequest, details: validationErrors });
	}

	// Get run player
	const { playerName } = await getRunPlayer(pool, parseInt(runData.run_submitter_id));
	if (!playerName) {
		console.error('Player name is null on approval. Aborting approval.');
		return jsonError(400, { error: 'bad_request', details: ['Unknown player in run'] });
	}

	const moderatorName = moderator.player_name;

	try {
		await approveRun(pool, approveRequest.runId, moderatorName, approveRequest.modNotes);

		notifyDiscordNewRunApprovedLogic(
			moderatorName,
			playerName ?? '<unknown_player>',
			runData.run_quest as NgsQuests,
			runData.run_category as NgsRunCategories,
			parseInt(runData.run_party_size)
		);
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
};

const checkUserPermission = async (moderatorUserId: string) => {
	const pool = await leaderboardDb.connect();

	const user = await getUser(pool, moderatorUserId);

	if (!user || !user.roles?.includes(UserRole.Moderator)) {
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

const checkRunData = async (run: ApproveRequest, moderator: PlayersDbModel2) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Run exists
	const submissionResult = await getRunById(pool, run.runId, false);

	if (!submissionResult) {
		errorList.push(`Unknown run id`);
		return {
			errorList,
			run: undefined,
		};
	}
	if (parseInt(submissionResult.run_submission_status) != RunSubmissionStatus.AwaitingApproval) {
		errorList.push(`Submission already denied/approved`);
	}

	// if (moderator.id.toString() === submissionResult.RunSubmitterId) {
	// 	errorList.push(`Cannot approve a run submitted by one's self.`);
	// }

	return {
		errorList,
		run: submissionResult,
	};
};
