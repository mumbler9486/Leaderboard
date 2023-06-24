import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import { getPlayerList } from '$lib/server/repositories/playerRepository.js';
import { mapPlayerAutoFillList } from '$lib/server/mappers/api/playerMapper.js';

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
