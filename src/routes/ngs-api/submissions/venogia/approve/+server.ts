import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { notifyDiscordNewRunApproved } from '$lib/server/discordNotify.js';
import {
	approveRequestSchema,
	type ApproveRequest
} from '$lib/types/api/validation/submissions.js';
import { getRunPlayer } from '$lib/server/repositories/playerRepository.js';
import { approveRun, checkRunExists } from '$lib/server/repositories/runsRepository.js';
import { SubmissionStatusDbValue } from '$lib/server/types/db/runs/submissionStatus.js';

const VenogiaQuestName = 'Venogia UQ';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate request
	const body = await request.json();
	let approveRequest: ApproveRequest;
	try {
		approveRequest = await approveRequestSchema.validate(body);
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}
	if (!approveRequest) {
		return jsonError(400, { error: 'json_parse_error' });
	}

	const pool = await leaderboardDb.connect();

	// Check data in db
	const { errorList: validationErrors, extra: data } = await checkData(approveRequest);
	if (validationErrors.length > 0 || !data) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	// Get run data
	const playerRequest = pool.request();
	const { playerName } = await getRunPlayer(playerRequest, data.playerId);

	try {
		await approveRun(pool.request(), approveRequest.runId, approveRequest.modNotes);

		notifyDiscordNewRunApproved(
			approveRequest.moderatorName,
			playerName ?? '<Player_Name>',
			VenogiaQuestName
		);
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkData = async (run: ApproveRequest) => {
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
