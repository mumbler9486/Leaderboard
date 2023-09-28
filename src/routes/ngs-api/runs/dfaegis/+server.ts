import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import { submitRun } from '$lib/server/logic/submitRunLogic.js';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission.js';
import { dfAegisSubmissionSchema } from '$lib/types/api/validation/dfAegisSubmission.js';
import {
	dfAegisRunsSearchFilterSchema,
	type DfAegisRunsSearchFilter
} from '$lib/types/api/validation/dfAegisRunsSearchFilter.js';
import type { RunAttributeFilter } from '$lib/server/types/db/runs/runAttributeFilter.js';
import { Game } from '$lib/types/api/game.js';
import { NgsQuests } from '$lib/types/api/runs/quests.js';
import { NgsRunCategories } from '$lib/types/api/runs/categories.js';
import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus.js';
import { getUserValidated } from '$lib/server/validation/authorization.js';
import { UserRole } from '$lib/types/api/users/userRole.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const urlParams = parseToRawSchema(url, dfAegisRunsSearchFilterSchema);

	const { object: parsedFilter, validationError } =
		await validateApiRequest<DfAegisRunsSearchFilter>(dfAegisRunsSearchFilterSchema, urlParams);
	if (!parsedFilter) {
		return jsonError(400, validationError);
	}

	const pool = await leaderboardDb.connect();
	const request = await pool.request();

	const filter: DfAegisRunsSearchFilter = {
		...parsedFilter,
		quest: NgsQuests.DfAegis,
		category: !parsedFilter.category ? NgsRunCategories.UrgentQuest : parsedFilter.category,
		partySize: !parsedFilter.partySize ? 1 : parsedFilter.partySize
	};

	const supportFilter: RunAttributeFilter[] | undefined = !filter.support
		? undefined
		: [
				{
					path: 'support',
					type: 'string',
					value: filter.support
				}
		  ];

	try {
		const runs = await getRuns(request, filter, RunSubmissionStatus.Approved, supportFilter);
		const mappedRuns = mapRuns(runs);
		return json(mappedRuns);
	} catch (err) {
		console.error(err);
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { user, error } = getUserValidated(locals, [
		UserRole.User,
		UserRole.Administrator,
		UserRole.Moderator
	]);
	if (!!error) {
		return error;
	}

	// Validate request
	const body = await request.json();
	const { object: parsedRun, validationError } = await validateApiRequest<RunSubmissionRequest>(
		dfAegisSubmissionSchema,
		body
	);
	if (!parsedRun) {
		return jsonError(400, validationError);
	}

	return submitRun(Game.Ngs, user, parsedRun);
}
