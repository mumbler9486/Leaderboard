import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import sql from 'mssql';
import type { Request } from 'mssql';
import { leaderboardDb } from '../db/db';
import { jsonError } from '../error';
import { checkRunExists, insertRun } from '../repositories/runsRepository';
import { getUser } from '../repositories/userRepository';
import { json } from '@sveltejs/kit';
import { notifyDiscordNewRun } from './discordNotifyLogic';

export const submitRun = async (parsedRun: RunSubmissionRequest) => {
	const pool = await leaderboardDb.connect();

	// Check user
	const { user, errors: userErrors } = await checkUserData(await pool.request(), parsedRun);
	if (!!userErrors) {
		return jsonError(403, { error: 'unauthorized', details: userErrors });
	}
	const userId = parseInt(user!.PlayerID);

	// Check run data
	const { errors: runRequestErrors } = await checkRunData(parsedRun);
	if (runRequestErrors.length > 0) {
		return jsonError(400, { error: 'bad_request', details: runRequestErrors });
	}

	// Insert run
	const transaction = new sql.Transaction(pool);
	try {
		await transaction.begin();
		await insertRun(transaction, parsedRun, userId);
		await transaction.commit();

		notifyDiscordNewRun(parsedRun.submitterName, parsedRun);
		return json({ data: 'success' });
	} catch (err) {
		await transaction.rollback();
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
};

const checkRunData = async (run: RunSubmissionRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Video links not already in use
	const videoLinks = run.party.map((p) => p.povLink).filter((l): l is string => l !== undefined);

	const existingVideoLinks = await checkRunExists(pool.request(), videoLinks);

	if (existingVideoLinks.length > 0) {
		existingVideoLinks.forEach((l) => {
			errorList.push(`Video already used in another run. VideoUrl=${l}`);
		});
	}

	return {
		errors: errorList
	};
};

const checkUserData = async (request: Request, run: RunSubmissionRequest) => {
	// Submitter exists
	const submitterUser = await getUser(request, run.submitterUserId);
	const playerId = parseInt(submitterUser?.PlayerID ?? '-1');
	if (!submitterUser || playerId <= 0) {
		return {
			user: null,
			errors: ['Submitter user does not exists']
		};
	}

	const submitterHasUserRole = submitterUser.Role === 'user' || submitterUser.ExtraRole === 'user';
	if (!submitterHasUserRole) {
		return {
			user: null,
			errors: ["Submitter user missing 'user' role"]
		};
	}

	return {
		user: submitterUser,
		errors: null
	};
};
