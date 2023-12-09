import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/pgDb.js';
import { getPlayerById } from '$lib/server/repositories/playerRepository.js';
import { mapPlayer } from '$lib/server/mappers/api/playerMapper.js';
import { jsonError } from '$lib/server/error.js';

export async function GET({ params }) {
	const playerId = parseInt(params.playerId);
	try {
		const pool = await leaderboardDb.connect();

		const player = await getPlayerById(pool, playerId);
		if (!player) {
			return jsonError(404, 'Unknown user.');
		}

		const mappedPlayer = mapPlayer(player);
		return json(mappedPlayer);
	} catch (err) {
		console.error(err);
	}
}
