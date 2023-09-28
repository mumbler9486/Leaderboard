import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import { getPlayerByGuid } from '$lib/server/repositories/playerRepository.js';
import { mapPlayer } from '$lib/server/mappers/api/playerMapper.js';
import { jsonError } from '$lib/server/error.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import {
	profileUpdateRequestSchema,
	type ProfileUpdateRequest
} from '$lib/types/api/validation/profileUpdate.js';
import { getUserValidated } from '$lib/server/validation/authorization.js';
import { UserRole } from '$lib/types/api/users/userRole.js';
import { updatePlayerProfile } from '$lib/server/repositories/playerProfileRepository.js';

export async function GET({ locals }) {
	const { user, error } = getUserValidated(locals, [UserRole.User]);
	if (!!error) {
		return error;
	}

	const userId = user.userId;
	try {
		const pool = await leaderboardDb.connect();
		const request = await pool.request();

		const player = await getPlayerByGuid(request, userId);
		if (!player) {
			return jsonError(404, 'Unknown user.');
		}

		const mappedPlayer = mapPlayer(player);
		return json(mappedPlayer);
	} catch (err) {
		console.error(err);
	}
}

export async function PUT({ request, locals }) {
	const { user, error } = getUserValidated(locals, [UserRole.User]);
	if (!!error) {
		return error;
	}

	const userId = user.userId;
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
