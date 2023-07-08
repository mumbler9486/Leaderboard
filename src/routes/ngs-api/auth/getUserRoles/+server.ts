import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import { getUserRoles } from '$lib/server/repositories/userRepository.ts';
import { guidRegex } from '$lib/utils/validation.js';
import { jsonError } from '$lib/server/error.js';

// For b2c
export async function POST({ request }) {
	const b2cIdentity = await request.json();
	const userGuid = b2cIdentity.objectId;

	if (!guidRegex.test(userGuid)) {
		console.error(`Malformed B2C Request. objectId not a Guid.`);
		return jsonError(400, 'Invalid objectId. Not a Guid');
	}

	try {
		const pool = await leaderboardDb.connect();
		const userRoles = await getUserRoles(await pool.request(), userGuid);

		return json({
			roles: userRoles
		});
	} catch (err) {
		console.error(err);
	}
}
