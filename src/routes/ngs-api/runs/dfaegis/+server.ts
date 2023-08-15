import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import {
	runsSearchFilterSchema,
	type RunsSearchFilter
} from '$lib/types/api/validation/runsSearchFilter.js';
import { GameDbValue } from '$lib/server/types/db/runs/game.js';
import { submitRun } from '$lib/server/logic/submitRunLogic.js';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission.js';
import { purpleSubmissionSchema } from '$lib/types/api/validation/purpleSubmissions.js';
import { dfAegisSubmissionSchema } from '$lib/types/api/validation/dfAegisSubmission.js';

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

	const pool = await leaderboardDb.connect();
	const request = await pool.request();

	const filter: RunsSearchFilter = {
		...parsedFilter,
		quest: 'dfaegis',
		category: !parsedFilter.category ? 'urgent_quest' : parsedFilter.category,
		partySize: !parsedFilter.partySize ? 1 : parsedFilter.partySize
	};

	try {
		const runs = await getRuns(request, filter, true);
		const mappedRuns = mapRuns(runs);
		return json(mappedRuns);
	} catch (err) {
		console.error(err);
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate request
	const body = await request.json();
	const { object: parsedRun, validationError } = await validateApiRequest<RunSubmissionRequest>(
		dfAegisSubmissionSchema,
		body
	);
	if (!parsedRun) {
		return jsonError(400, validationError);
	}

	return submitRun(GameDbValue.Ngs, parsedRun);
}
