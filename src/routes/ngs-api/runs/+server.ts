import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import {
	runsSearchFilterSchema,
	type RunsSearchFilter,
} from '$lib/types/api/validation/runsSearchFilter.js';
import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus.js';
import type { ServerSearchFilter } from '$lib/server/types/api/runsSearch.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const urlParams = parseToRawSchema(url, runsSearchFilterSchema);

	const { object: parsedFilter, validationError } = await validateApiRequest<RunsSearchFilter>(
		runsSearchFilterSchema,
		urlParams
	);
	if (!parsedFilter) {
		return jsonError(400, validationError);
	}

	const serverFilters: ServerSearchFilter = {
		submissionStatus: RunSubmissionStatus.Approved,
	};

	const pool = await leaderboardDb.connect();
	const request = await pool.request();

	try {
		const runs = await getRuns(request, parsedFilter, serverFilters);
		const mappedRuns = mapRuns(runs);
		return json(mappedRuns);
	} catch (err) {
		console.error(err);
	}
}
