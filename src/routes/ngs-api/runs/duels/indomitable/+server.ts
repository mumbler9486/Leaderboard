import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss.js';
import {
	indomitableRunSearchFilterSchema,
	type IndomitableRunSearchFilter
} from '$lib/types/api/validation/indomitableRunFilter.js';
import { getIndomitableRuns } from '$lib/server/repositories/indomitableRunsRepository.js';
import { mapIndomitableToRun } from '$lib/server/mappers/api/indomitableRunMapper.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const urlParams = parseToRawSchema(url, indomitableRunSearchFilterSchema);

	let filters: IndomitableRunSearchFilter;
	try {
		filters = await indomitableRunSearchFilterSchema.validate(urlParams, {
			stripUnknown: true
		});
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}

	// Offset doesnt work at this time
	if (filters.page != null) {
		return jsonError(400, 'Page offset not supported on this endpoint yet.');
	}

	// Get data
	try {
		const pool = await leaderboardDb.connect();
		const nexRuns = await getIndomitableRuns(
			await pool.request(),
			filters,
			IndomitableBoss.NexAelio
		);
		const renusRuns = await getIndomitableRuns(
			await pool.request(),
			filters,
			IndomitableBoss.RenusRetem
		);
		const amsRuns = await getIndomitableRuns(
			await pool.request(),
			filters,
			IndomitableBoss.AmsKvaris
		);
		const nilsRuns = await getIndomitableRuns(
			await pool.request(),
			filters,
			IndomitableBoss.NilsStia
		);
		const halvaldiRuns = await getIndomitableRuns(
			await pool.request(),
			filters,
			IndomitableBoss.Halvaldi
		);

		let mappedRuns = mapIndomitableToRun(nexRuns, IndomitableBoss.NexAelio)
			.concat(mapIndomitableToRun(renusRuns, IndomitableBoss.RenusRetem))
			.concat(mapIndomitableToRun(amsRuns, IndomitableBoss.AmsKvaris))
			.concat(mapIndomitableToRun(nilsRuns, IndomitableBoss.NilsStia))
			.concat(mapIndomitableToRun(halvaldiRuns, IndomitableBoss.Halvaldi))
			.sort((a, b) => {
				if (filters.sort === 'recent') {
					return a.submissionTime > b.submissionTime ? -1 : 1;
				}
				return 0;
			});

		if (filters.take != null) {
			mappedRuns = mappedRuns.splice(0, filters.take);
		}

		return json(mappedRuns);
	} catch (err) {
		console.error(err);
		throw err;
	}
}
