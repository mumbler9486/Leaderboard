import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import { getUserRoles } from '$lib/server/repositories/userRepository.js';

// For b2c
export async function POST({ request }) {
	try {
		const pool = await leaderboardDb.connect();
		const userGuid = await request.text();
		const userRoles = await getUserRoles(await pool.request(), userGuid);

		return json(userRoles);
	} catch (err) {
		console.error(err);
	}
}
