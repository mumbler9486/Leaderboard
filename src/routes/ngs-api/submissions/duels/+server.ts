import { leaderboardDb } from '$lib/server/db/db.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const pool = await leaderboardDb.connect();
	const request = await pool.request();

	const filter = {
		quest: 'duels'
	} as RunsSearchFilter;

	try {
		const runs = await getRuns(request, filter, false);
		const mappedRuns = mapRuns(runs);
		return json(mappedRuns);
	} catch (err) {
		console.error(err);
	}
}
