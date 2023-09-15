import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import sql from 'mssql';
import type { Request } from 'mssql';
import { leaderboardDb } from '../db/db';
import { jsonError } from '../error';
import { checkRunVideoExists, insertRun } from '../repositories/runsRepository';
import { getUser } from '../repositories/userRepository';
import { json } from '@sveltejs/kit';
import { notifyDiscordNewRun } from './discordNotifyLogic';
import type { SubmitResult } from '$lib/types/api/runs/submitResult';
import { getPlayers } from '../repositories/playerRepository';
import type { Game } from '$lib/types/api/game';
import { UserRole } from '$lib/types/api/users/userRole';
import type { PlayerInfo } from '$lib/types/api/runs/run';
import type { PlayersDbModel } from '../types/db/users/players';

export const submitRun = async (game: Game, parsedRun: RunSubmissionRequest) => {
	const pool = await leaderboardDb.connect();
	const validationRequest = await pool.request();

	// Check user
	const { user, errors: userErrors } = await checkSubmittingUser(validationRequest, parsedRun);
	if (!!userErrors) {
		return jsonError(403, { error: 'unauthorized', details: userErrors });
	}
	const userId = parseInt(user!.Id);

	// Check run data
	const { errors: runRequestErrors } = await checkRunData(validationRequest, parsedRun);
	if (runRequestErrors.length > 0) {
		return jsonError(400, { error: 'bad_request', details: runRequestErrors });
	}

	// Check players
	const playerErrors = await checkPartyPlayers(validationRequest, user, parsedRun);
	if (playerErrors.length > 0) {
		return jsonError(400, { error: 'bad_request', details: playerErrors });
	}

	// Insert run
	const transaction = new sql.Transaction(pool);
	try {
		await transaction.begin();
		await insertRun(transaction, game, parsedRun, userId);
		await transaction.commit();

		notifyDiscordNewRun(parsedRun.submitterName, parsedRun);
		const successResponse: SubmitResult = {
			success: true
		};
		return json(successResponse);
	} catch (err) {
		await transaction.rollback();
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
};

const checkRunData = async (request: Request, run: RunSubmissionRequest) => {
	const errorList: string[] = [];

	// Video links not already in use
	const videoLinks = run.party.map((p) => p.povLink).filter((l): l is string => l !== undefined);

	const existingVideoLinks = await checkRunVideoExists(request, videoLinks);

	if (existingVideoLinks.length > 0) {
		existingVideoLinks.forEach((l) => {
			errorList.push(`Video already used in another run. VideoUrl=${l}`);
		});
	}

	return {
		errors: errorList
	};
};

const checkSubmittingUser = async (request: Request, run: RunSubmissionRequest) => {
	// Submitter exists
	const submitterUser = await getUser(request, run.submitterUserId);
	const submitterPlayerId = parseInt(submitterUser?.Id ?? '-1');
	if (!submitterUser || submitterPlayerId <= 0) {
		return {
			user: null,
			errors: ['Submitter user does not exist']
		};
	}

	const submitterHasUserRole = submitterUser.Roles.includes('user');
	if (!submitterHasUserRole) {
		return {
			user: null,
			errors: ["Submitter missing 'user' role"]
		};
	}

	return {
		user: submitterUser,
		errors: null
	};
};

const checkPartyPlayers = async (
	request: Request,
	submitter: PlayersDbModel,
	run: RunSubmissionRequest
) => {
	const submitterIsModerator =
		!submitter.Roles?.includes(UserRole.Moderator) &&
		!submitter.Roles?.includes(UserRole.Administrator);
	const submitterIsPlayer1 = run.party[0]?.playerId === parseInt(submitter?.Id) ?? false;
	if (!submitterIsModerator && !submitterIsPlayer1) {
		return ['Submitter must be player 1.'];
	}

	// Party members exist
	const playerIds = run.party.map((p) => p.playerId).filter((pid): pid is number => !!pid);
	const existingPlayers = await getPlayers(request, playerIds);

	const playersNotExist = playerIds.filter((p) => !existingPlayers.some((e) => e.playerId === p));

	if (playersNotExist.length > 0) {
		const notExistPlayerNames = playersNotExist
			.map((nep) => {
				const notExistingPlayer = run.party.find((partyP) => nep === partyP.playerId);
				return `(${notExistingPlayer?.playerId},${notExistingPlayer?.inVideoName})`;
			})
			.join(',');
		return [`One or more players do not exist in the database. Players=${notExistPlayerNames}`];
	}

	return [];
};
