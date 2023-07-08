import sql from 'mssql';
import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import { createAccount, getPlayerList } from '$lib/server/repositories/playerRepository.js';
import { mapPlayerAutoFillList } from '$lib/server/mappers/api/playerMapper.js';
import {
	createAccountSchema,
	type CreateAccountRequest
} from '$lib/server/types/api/createAccount.js';
import { jsonError } from '$lib/server/error.js';
import { getUserExists } from '$lib/server/repositories/userRepository.js';

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

export async function POST({ request }) {
	const body = await request.json();

	let updateProfileRequest: CreateAccountRequest;
	try {
		updateProfileRequest = await createAccountSchema.validate(body);
	} catch (err: any) {
		console.error('Cannot create account for user');
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}

	const pool = await leaderboardDb.connect();
	let transaction: sql.Transaction | undefined;
	try {
		const isUserExist = await getUserExists(pool.request(), updateProfileRequest.userId);
		if (isUserExist) {
			return jsonError(400, {
				error: 'bad_request',
				details: ['Account setup already completed.']
			});
		}

		transaction = new sql.Transaction(pool);
		await transaction.begin();
		await createAccount(transaction, updateProfileRequest);
		await transaction.commit();

		return json(true);
	} catch (err) {
		transaction?.rollback();
		console.error(err);
		throw err;
	}
}
