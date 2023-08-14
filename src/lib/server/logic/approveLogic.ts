import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { getRunPlayer } from '$lib/server/repositories/playerRepository.js';
import { approveRun, checkRunExists, getRunById } from '$lib/server/repositories/runsRepository.js';
import { SubmissionStatusDbValue } from '$lib/server/types/db/runs/submissionStatus.js';
import type { ApproveRequest } from '$lib/types/api/validation/submissions';
import { notifyDiscordNewRunApprovedLogic } from './discordNotifyLogic';

export const approveRunSubmission = async (approveRequest: ApproveRequest) => {
	const pool = await leaderboardDb.connect();

	// Check data in db
	const { errorList: validationErrors, extra: data } = await checkData(approveRequest);
	if (validationErrors.length > 0 || !data) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	// Get run player
	const playerRequest = pool.request();
	const { playerName } = await getRunPlayer(playerRequest, data.playerId);
	if (!playerName) {
		console.error('Player name is null on approval. Aborting approval.');
		return jsonError(400, { error: 'bad_request', details: ['Unknown player in run'] });
	}

	try {
		await approveRun(pool.request(), approveRequest.runId, approveRequest.modNotes);

		notifyDiscordNewRunApprovedLogic(
			approveRequest.moderatorName,
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
	if (parseInt(submissionResult.RunSubmissionStatus) != SubmissionStatusDbValue.AwaitingApproval) {
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
