import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db.js';
import { searchPlayers as searchPlayers } from '$lib/server/repositories/playerRepository.js';
import { mapPlayerSearch as mapPlayerSearch } from '$lib/server/mappers/api/playerMapper.js';
import {
	playerSearchSchema,
	type PlayerSearchSchema,
} from '$lib/types/api/validation/playerSearch.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { jsonError } from '$lib/server/error.js';

export async function GET({ url }) {
	const urlParams = parseToRawSchema(url, playerSearchSchema);

	const { object: parsedFilter, validationError } = await validateApiRequest<PlayerSearchSchema>(
		playerSearchSchema,
		urlParams
	);
	if (!parsedFilter) {
		return jsonError(400, validationError);
	}

	try {
		const pool = await leaderboardDb.connect();
		const request = await pool.request();

		const playerList = await searchPlayers(request, parsedFilter);
		const mappedSearchResults = mapPlayerSearch(playerList);

		return json(mappedSearchResults);
	} catch (err) {
		console.error(err);
	}
}
