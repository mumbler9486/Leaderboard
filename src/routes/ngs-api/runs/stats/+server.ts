import { leaderboardDb } from '$lib/server/db/db.js';
import { countRuns } from '$lib/server/repositories/runsRepository.js';
import { PartySize } from '$lib/types/api/partySizes.js';
import type { RunStats } from '$lib/types/api/runs/runStats.js';
import { json } from '@sveltejs/kit';

export async function GET({}) {
	try {
		const pool = await leaderboardDb.connect();
		const counts = await countRuns(pool.request());

		const response: RunStats = {
			soloCount: counts.soloCount,
			duoCount: counts.duoCount,
			partyCount: counts.partyCount,
		};

		return json(response);
	} catch (err) {
		console.error(err);
	}
}
