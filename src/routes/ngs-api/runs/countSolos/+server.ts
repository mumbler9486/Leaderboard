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
      (SELECT COUNT(*) FROM IndomitableNexAelioRuns) AS ${countSoloFields.IndomitableNexAelioCount},
      (SELECT COUNT(*) FROM IndomitableRenusRetemRuns) AS ${countSoloFields.IndomitableRenusRetemCount},
      (SELECT COUNT(*) FROM IndomitableAmsKvarisRuns) AS ${countSoloFields.IndomitableAmsKvarisCount},
      (SELECT COUNT(*) FROM IndomitableNilsStiaRuns) AS ${countSoloFields.IndomitableNilsStiaCount}
    `;

		const results = await pool.request().query(sqlQuery);
		const counts = results.recordset[0] as CountSolosDbModel;

		console.log(results.recordset);

		const response: SoloCounts = {
			purples: parseInt(counts.PurplesCount),
			dfa: parseInt(counts.DfaCount),
			indomitables:
				parseInt(counts.IndomitableNexAelioCount) +
				parseInt(counts.IndomitableRenusRetemCount) +
				parseInt(counts.IndomitableAmsKvarisCount) +
				parseInt(counts.IndomitableNilsStiaCount)
		};

		return json(response);
	} catch (err) {
		console.error(err);
	}
}
