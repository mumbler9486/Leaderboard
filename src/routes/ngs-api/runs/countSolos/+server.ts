import { leaderboardDb } from '$lib/server/db/db.js';
import { countSoloRuns } from '$lib/server/repositories/runsRepository.js';
import type { SoloCounts } from '$lib/types/api/runs/countSolos.js';
import { json } from '@sveltejs/kit';

export async function GET({}) {
	try {
		const pool = await leaderboardDb.connect();
		const counts = await countSoloRuns(pool.request());

		const response: SoloCounts = {
			soloRuns: parseInt(counts.SoloRunsCount)
		};

		return json(response);
	} catch (err) {
		console.error(err);
	}
}
