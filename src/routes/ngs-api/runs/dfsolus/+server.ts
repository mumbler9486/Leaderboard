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

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const pool = await leaderboardDb.connect();
	const request = await pool.request();

	try {
		const runs = await getRuns(request, { approved: true });
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
