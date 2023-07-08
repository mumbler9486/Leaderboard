import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import { getUserRoles } from '$lib/server/repositories/userRepository.ts';
import { guidRegex } from '$lib/utils/validation.js';
import { jsonError } from '$lib/server/error.js';

// For b2c
// See https://learn.microsoft.com/en-us/azure/active-directory-b2c/add-api-connector-token-enrichment?pivots=b2c-user-flow
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
			version: '1.0.0',
			action: 'Continue',
			userRoles: userRoles
		});
	} catch (err) {
		console.error(err);
	}
}
