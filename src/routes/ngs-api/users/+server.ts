import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import {
	createAccount,
	getPlayerList,
	isPlayerNameUnique
} from '$lib/server/repositories/playerRepository.js';
import { mapPlayerAutoFillList } from '$lib/server/mappers/api/playerMapper.js';
import {
	createAccountSchema,
	type CreateAccountRequest
} from '$lib/server/types/api/createAccount.js';
import { jsonError } from '$lib/server/error.js';
import { getUserExists } from '$lib/server/repositories/userRepository.js';
import { ErrorCodes } from '$lib/types/api/error.js';
import { getUserValidated } from '$lib/server/validation/authorization.js';

export async function GET({}) {
	try {
		const pool = await leaderboardDb.connect();
		const request = await pool.request();

		const playerList = await getPlayerList(request);
		const playerListAutoFill = mapPlayerAutoFillList(playerList);

		return json(playerListAutoFill);
	} catch (err) {
		console.error(err);
	}
}

export async function POST({ request, locals }) {
	const { user, error } = getUserValidated(locals);
	if (!!error) {
		return error;
	}

	const body = await request.json();

	let updateProfileRequest: CreateAccountRequest;
	try {
		updateProfileRequest = await createAccountSchema.validate(body, { stripUnknown: true });
	} catch (err: any) {
		return jsonError(400, {
			error: ErrorCodes.ValidationError,
			details: err.errors
		});
	}

	const pool = await leaderboardDb.connect();
	try {
		const isUserExist = await getUserExists(pool.request(), user.userId);
		if (isUserExist) {
			return jsonError(400, {
				error: ErrorCodes.BadRequest,
				details: ['Account setup already completed.']
			});
		}

		const isNameUnique = await isPlayerNameUnique(pool.request(), updateProfileRequest.username);
		if (!isNameUnique) {
			return jsonError(400, {
				error: ErrorCodes.BadRequest,
				details: [
					'Username (not character name) already exists. Please contact the site administrator for assistance.'
				]
			});
		}

		await createAccount(pool.request(), updateProfileRequest);

		return json(true);
	} catch (err) {
		console.error(err);
		throw err;
	}
}
