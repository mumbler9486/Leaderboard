import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import { submitRun } from '$lib/server/logic/submitRunLogic.js';
import { Game } from '$lib/types/api/game.js';
import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus.js';
import { getUserValidated } from '$lib/server/validation/authorization.js';
import { UserRole } from '$lib/types/api/users/userRole.js';
import type { ServerSearchFilter } from '$lib/server/types/api/runsSearch.js';
import { allLeaderboards } from '$lib/leaderboard/boards.js';
import type { NgsRunCategories } from '$lib/types/api/runs/categories.js';
import type { NgsQuests } from '$lib/types/api/runs/quests.js';
import { validQuestCategories } from '../../../../../params/category.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const category = validQuestCategories[params.category?.toLowerCase()] as
		| NgsRunCategories
		| undefined;
	const quest = params.quest as NgsQuests;
	console.log(category, quest);
	const boardInfo = allLeaderboards.find((b) => b.quest === quest && b.category === category);
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
	parsedFilter.category = category;

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
		const runs = await getRuns(request, parsedFilter, serverFilters, attributeFilter);
		const mappedRuns = mapRuns(runs);
		return json(mappedRuns);
	} catch (err) {
		console.error(err);
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request, locals }) {
	const category = validQuestCategories[params.category?.toLowerCase()] as
		| NgsRunCategories
		| undefined;
	const quest = params.quest as NgsQuests;
	const boardInfo = allLeaderboards.find((b) => b.quest === quest && b.category === category);
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
