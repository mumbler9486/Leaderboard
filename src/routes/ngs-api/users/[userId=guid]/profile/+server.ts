import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import { getPlayer } from '$lib/server/repositories/playerRepository.js';
import { jsonError } from '$lib/server/error.js';
import {
	profileUpdateRequestSchema,
	type ProfileUpdateRequest
} from '$lib/types/api/validation/profileUpdate.js';
import { updatePlayerProfile } from '$lib/server/repositories/playerProfileRepository.js';

export async function GET({ params }) {
	console.log(params);
	return json(true);
}

export async function PUT({ params, request }) {
	const userId = params.userId;
	const body = await request.json();

	let updateProfileRequest: ProfileUpdateRequest;
	try {
		updateProfileRequest = await profileUpdateRequestSchema.validate(body);
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}

	try {
		const pool = await leaderboardDb.connect();

		const player = await getPlayer(await pool.request(), userId);
		if (!player) {
			return jsonError(404, 'Unknown user.');
		}

		const playerId = parseInt(player.PlayerID);
		await updatePlayerProfile(await pool.request(), playerId, updateProfileRequest);

		return json(true);
	} catch (err) {
		console.error(err);
	}
}
