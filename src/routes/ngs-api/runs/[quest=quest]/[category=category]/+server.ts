import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { getMasqRuns, getRuns } from '$lib/server/repositories/runsRepository.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import { submitRun } from '$lib/server/logic/submitRunLogic.js';
import { Game } from '$lib/types/api/game.js';
import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus.js';
import { getUserValidated } from '$lib/server/validation/authorization.js';
import { UserRole } from '$lib/types/api/users/userRole.js';
import type { ServerSearchFilter } from '$lib/server/types/api/runsSearch.js';
import { lookupBoardByRoute } from '$lib/leaderboard/boards.js';
import { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';
import { RunAttributeFilter } from '$lib/server/types/db/runs/runAttributeFilter';
import sql, { type Request } from 'mssql';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { NgsRunCategories } from '$lib/types/api/runs/categories';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const boardInfo = lookupBoardByRoute(params.quest, params.category);
	if (!boardInfo) {
		return jsonError(404, 'Not Found');
	}

	// Validate request
	const urlParams = parseToRawSchema(url, boardInfo.runSearchSchema);
	const { object: parsedFilter, validationError } = await validateApiRequest(
		boardInfo.runSearchSchema,
		urlParams
	);
	if (!parsedFilter) {
		return jsonError(400, validationError);
	}
	parsedFilter.category = boardInfo.category;

	// Refine filters
	const serverFilters: ServerSearchFilter = {
		submissionStatus: RunSubmissionStatus.Approved,
	};
	boardInfo.assignRunSearchDefaults(parsedFilter);
	const attributeFilter = boardInfo.createAttributeFilter(parsedFilter);

	// Get runs
	const pool = await leaderboardDb.connect();
	const request = await pool.request();
	try {
		const runs = await getRunsByQuest(request, parsedFilter, serverFilters, attributeFilter);
		const mappedRuns = mapRuns(runs);
		return json(mappedRuns);
	} catch (err) {
		console.error(err);
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request, locals }) {
	const boardInfo = lookupBoardByRoute(params.quest, params.category);
	if (!boardInfo) {
		return jsonError(404, 'Not Found');
	}

	const { user, error } = getUserValidated(locals, [UserRole.User, UserRole.Moderator]);
	if (!!error) {
		return error;
	}

	// Validate request
	const body = await request.json();
	const { object: parsedRun, validationError } = await validateApiRequest(
		boardInfo.runSubmissionSchema,
		body
	);
	if (!parsedRun) {
		return jsonError(400, validationError);
	}

	return submitRun(Game.Ngs, user, parsedRun);
}

const getRunsByQuest = async (
	request: Request,
	userFilters: RunsSearchFilter,
	serverFilters: ServerSearchFilter,
	attributeFilters?: RunAttributeFilter[]
) => {
	console.log(userFilters, attributeFilters);
	if (
		userFilters.quest === NgsQuests.ExtraDuels &&
		userFilters.category === NgsRunCategories.Masquerade
	) {
		return await getMasqRuns(request, userFilters, serverFilters, attributeFilters);
	}

	return await getRuns(request, userFilters, serverFilters, attributeFilters);
};
