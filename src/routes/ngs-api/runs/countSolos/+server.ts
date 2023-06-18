import { leaderboardDb } from '$lib/server/db/db.js';
import type { CountSolosDbModel } from '$lib/server/types/db/runs/countSolo.js';
import { fields } from '$lib/server/util/nameof.js';
import type { SoloCounts } from '$lib/types/api/runs/countSolos.js';
import { json } from '@sveltejs/kit';

const countSoloFields = fields<CountSolosDbModel>();

export async function GET({ request }) {
	try {
		const pool = await leaderboardDb.connect();

		const sqlQuery = `
    SELECT   
      (SELECT COUNT(*) FROM Purples.Solo) AS ${countSoloFields.PurplesCount},
      (SELECT COUNT(*) FROM DFAegis.Solo) AS ${countSoloFields.DfaCount},
      (SELECT COUNT(*) FROM IndomitableRuns) AS ${countSoloFields.IndomitableCount}
    `;

		const results = await pool.request().query(sqlQuery);
		const counts = results.recordset[0] as CountSolosDbModel;

		const response: SoloCounts = {
			purples: parseInt(counts.PurplesCount),
			dfa: parseInt(counts.DfaCount),
			indomitables: parseInt(counts.IndomitableCount)
		};

		return json(response);
	} catch (err) {
		console.error(err);
	}
}
