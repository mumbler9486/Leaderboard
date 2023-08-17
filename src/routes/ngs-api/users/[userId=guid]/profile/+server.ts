import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import { getPlayerByGuid } from '$lib/server/repositories/playerRepository.js';
import { jsonError } from '$lib/server/error.js';
import {
	profileUpdateRequestSchema,
	type ProfileUpdateRequest
} from '$lib/types/api/validation/profileUpdate.js';
import { updatePlayerProfile } from '$lib/server/repositories/playerProfileRepository.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';

export async function PUT({ params, request }) {
	const userId = params.userId;
	const body = await request.json();

	const { object: updateProfileRequest, validationError } =
		await validateApiRequest<ProfileUpdateRequest>(profileUpdateRequestSchema, body);
	if (!updateProfileRequest) {
		return jsonError(400, validationError);
	}

	try {
		const pool = await leaderboardDb.connect();

		const player = await getPlayerByGuid(await pool.request(), userId);
		if (!player) {
			return jsonError(404, 'Unknown user.');
		}

		const playerId = parseInt(player.Id);
		await updatePlayerProfile(await pool.request(), playerId, updateProfileRequest!);

		return json(true);
	} catch (err) {
		console.error(err);
		throw err;
	}
}
