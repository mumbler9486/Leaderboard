import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { parseIndomitableBoss } from '$lib/types/api/duels/indomitableBoss.js';
import {
	indomitableRunSearchFilterSchema,
	type IndomitableRunSearchFilter
} from '$lib/server/types/validation/indomitableRunFilter.js';
import { getIndomitableRuns } from '$lib/server/repositories/indomitableRunsRepository.js';
import { mapIndomitableToRun } from '$lib/server/mappers/api/indomitableRunMapper.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const boss = parseIndomitableBoss(params.boss);
	if (!boss) {
		return jsonError(404, 'Unknown boss');
	}

	const urlParams = {
		server: url.searchParams.get('server'),
		class: url.searchParams.get('class'),
		augmentations: url.searchParams.get('augmentations')
	};

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

	// Get data
	try {
		const pool = await leaderboardDb.connect();
		let request = await pool.request();
		const runs = await getIndomitableRuns(request, filters, boss);
		const mapped = mapIndomitableToRun(runs);

		return json(mapped);
	} catch (err) {
		console.error(err);
		throw err;
	}
}
