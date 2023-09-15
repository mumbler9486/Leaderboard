import { leaderboardDb } from '$lib/server/db/db.js';
import { jsonError } from '$lib/server/error.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter.js';
import {
	submissionSearchFilterSchema,
	type SubmissionSearchFilter
} from '$lib/types/api/validation/submissionSearchFilter.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url, platform }) {
	const urlParams = parseToRawSchema(url, submissionSearchFilterSchema);

	const { object: parsedFilter, validationError } =
		await validateApiRequest<SubmissionSearchFilter>(submissionSearchFilterSchema, urlParams);
	if (!parsedFilter) {
		return jsonError(400, validationError);
	}

	const filter = {
		page: parsedFilter.page,
		take: parsedFilter.take,
		sort: parsedFilter.sort
	} as RunsSearchFilter;
	const submissionStatus = parsedFilter.status ?? undefined;

	try {
		const pool = await leaderboardDb.connect();
		const request = await pool.request();

		const runs = await getRuns(request, filter, submissionStatus);
		const mappedRuns = mapRuns(runs);
		return json(mappedRuns);
	} catch (err) {
		console.error(err);
	}
}
