import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { submitRun } from '$lib/server/logic/submitRunLogic.js';
import { dfSolusRunSubmissionSchema } from '$lib/types/api/validation/dfSolusSubmission.js';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import { GameDbValue } from '$lib/server/types/db/runs/game.js';
import {
	runsSearchFilterSchema,
	type RunsSearchFilter
} from '$lib/types/api/validation/runsSearchFilter.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';

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

	try {
		const runs = await getRuns(request, { ...parsedFilter, approved: true });
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
		dfSolusRunSubmissionSchema,
		body
	);
	if (!parsedRun) {
		return jsonError(400, validationError);
	}

	return submitRun(GameDbValue.Ngs, parsedRun);
}
