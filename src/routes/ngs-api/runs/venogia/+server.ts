import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { getRun } from '$lib/server/repositories/runsRepository.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { submitRun } from '$lib/server/logic/submitRunLogic.js';
import { venogiaRunSubmissionSchema } from '$lib/types/api/validation/venogiaSubmission.js';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const pool = await leaderboardDb.connect();
	const request = await pool.request();

	try {
		const runs = await getRun(request, {});
		return json(runs);
	} catch (err) {
		console.error(err);
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate request
	const body = await request.json();
	const { object: parsedRun, validationError } = await validateApiRequest<RunSubmissionRequest>(
		venogiaRunSubmissionSchema,
		body
	);
	if (!parsedRun) {
		return jsonError(400, validationError);
	}

	return submitRun(parsedRun);
}
