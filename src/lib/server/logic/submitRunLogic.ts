import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { leaderboardDb } from '../db/pgDb';
import { jsonError } from '../error';
import { checkRunVideoExists, insertRun } from '../repositories/runsRepository';
import { getUser } from '../repositories/userRepository';
import { json } from '@sveltejs/kit';
import { notifyDiscordNewRun } from './discordNotifyLogic';
import type { SubmitResult } from '$lib/types/api/runs/submitResult';
import { getPlayers } from '../repositories/playerRepository';
import type { Game } from '$lib/types/api/game';
import { UserRole } from '$lib/types/api/users/userRole';
import type { ServerUser } from '../types/auth/serverUser';
import { ErrorCodes } from '$lib/types/api/error';
import type { Pool } from 'pg';

export const submitRun = async (
	game: Game,
	requestUser: ServerUser,
	parsedRun: RunSubmissionRequest
) => {
	const pool = await leaderboardDb.connect();

	// Check user
	const { user, errors: userErrors } = await checkSubmittingUser(pool, requestUser);
	if (!!userErrors) {
		return jsonError(403, { error: ErrorCodes.Unauthorized, details: userErrors });
	}
	const playerId = user!.id;

	// Check run data
	const { errors: runRequestErrors } = await checkRunData(pool, parsedRun);
	if (runRequestErrors.length > 0) {
		return jsonError(400, { error: ErrorCodes.BadRequest, details: runRequestErrors });
	}

	// Check players
	const playerErrors = await checkPartyPlayers(pool, requestUser, playerId, parsedRun);
	if (playerErrors.length > 0) {
		return jsonError(400, { error: ErrorCodes.BadRequest, details: playerErrors });
	}

	// Insert run
	const poolClient = await pool.connect();
	try {
		poolClient.query('BEGIN');

		poolClient.query('COMMIT');
		await insertRun(poolClient, game, parsedRun, playerId);

		notifyDiscordNewRun(parsedRun.submitterName, parsedRun);
		const successResponse: SubmitResult = {
			success: true,
		};
		return json(successResponse);
	} catch (err) {
		poolClient.query('ROLLBACK');
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
};

const checkRunData = async (pool: Pool, run: RunSubmissionRequest) => {
	const errorList: string[] = [];

	// Video links not already in use
	const videoLinks = run.party.map((p) => p.povLink).filter((l): l is string => l !== undefined);

	const existingVideoLinks = await checkRunVideoExists(pool, videoLinks);

	if (existingVideoLinks.length > 0) {
		existingVideoLinks.forEach((l) => {
			errorList.push(`Video already used in another run. VideoUrl=${l}`);
		});
	}

	return {
		errors: errorList,
	};
};

const checkSubmittingUser = async (pool: Pool, requestUser: ServerUser) => {
	// Submitter exists
	const submitterUser = await getUser(pool, requestUser.userId);
	const submitterPlayerId = submitterUser?.id ?? -1;
	if (!submitterUser || submitterPlayerId <= 0) {
		return {
			user: null,
			errors: ['Submitter user does not exist'],
		};
	}

	const submitterHasUserRole = requestUser.hasRole(UserRole.User);
	if (!submitterHasUserRole) {
		return {
			user: null,
			errors: ["Submitter missing 'user' role"],
		};
	}

	return {
		user: submitterUser,
		errors: null,
	};
};

const checkPartyPlayers = async (
	pool: Pool,
	requestUser: ServerUser,
	playerId: number,
	run: RunSubmissionRequest
) => {
	const submitterIsModerator = requestUser.hasRole(UserRole.Moderator);
	const submitterIsPlayer1 = run.party[0]?.playerId === playerId ?? false;
	if (!submitterIsModerator && !submitterIsPlayer1) {
		return ['Submitter must be player 1.'];
	}

	// Party members exist
	const playerIds = run.party.map((p) => p.playerId).filter((pid): pid is number => !!pid);
	const existingPlayers = await getPlayers(pool, playerIds);

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
