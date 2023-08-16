import { leaderboardDb } from '$lib/server/db/db.js';
import type { CountSolosDbModel } from '$lib/server/types/db/runs/countSolo.js';
import { fields } from '$lib/server/util/nameof.js';
import type { SoloCounts } from '$lib/types/api/runs/countSolos.js';
import { json } from '@sveltejs/kit';

const countSoloFields = fields<CountSolosDbModel>();

export async function GET({}) {
	try {
		const pool = await leaderboardDb.connect();

		const sqlQuery = `
			SELECT COUNT(*) AS ${countSoloFields.SoloRunsCount}
			FROM dbo.Runs
			WHERE dbo.Runs.PartySize = 1
    `;

		const results = await pool.request().query(sqlQuery);
		const counts = results.recordset[0] as CountSolosDbModel;

		const response: SoloCounts = {
			soloRuns: parseInt(counts.SoloRunsCount)
		};

		return json(response);
	} catch (err) {
		console.error(err);
	}
}
