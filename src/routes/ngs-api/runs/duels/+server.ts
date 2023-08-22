import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import { submitRun } from '$lib/server/logic/submitRunLogic.js';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission.js';
import type { RunAttributeFilter } from '$lib/server/types/db/runs/runAttributeFilter.js';
import {
	duelRunsSearchFilterSchema,
	type DuelRunsSearchFilter
} from '$lib/types/api/validation/duelRunsSearchFilter.js';
import {
	duelSubmissionSchema,
	type DuelRunSubmission
} from '$lib/types/api/validation/duelSubmissions.js';
import { Game } from '$lib/types/api/game.js';
import { NgsQuests } from '$lib/types/api/runs/quests.js';
import { NgsRunCategories } from '$lib/types/api/runs/categories.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const urlParams = parseToRawSchema(url, duelRunsSearchFilterSchema);

	const { object: parsedFilter, validationError } = await validateApiRequest<DuelRunsSearchFilter>(
		duelRunsSearchFilterSchema,
		urlParams
	);
	if (!parsedFilter) {
		return jsonError(400, validationError);
	}

	const pool = await leaderboardDb.connect();
	const request = await pool.request();

	const filter: DuelRunsSearchFilter = {
		...parsedFilter,
		quest: NgsQuests.Duels,
		category: !parsedFilter.category ? NgsRunCategories.Halvaldi : parsedFilter.category
	};

	const duelAugmentsFilter: RunAttributeFilter[] | undefined =
		filter.augments === undefined || filter.augments === null
			? undefined
			: [
					{
						path: 'augments',
						type: 'boolean',
						value: filter.augments
					}
			  ];

	try {
		const runs = await getRuns(request, filter, true, duelAugmentsFilter);
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
	const { object: parsedRun, validationError } = await validateApiRequest<DuelRunSubmission>(
		duelSubmissionSchema,
		body
	);
	if (!parsedRun) {
		return jsonError(400, validationError);
	}

	return submitRun(Game.Ngs, parsedRun);
}
