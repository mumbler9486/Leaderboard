import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { ServerSearchFilter } from '../types/api/runsSearch';
import type { RunAttributeFilter } from '../types/db/runs/runAttributeFilter';
import { runParty, runs } from '../db/schema';
import { and, eq, asc } from 'drizzle-orm';

export const getRuns = async (
	db: DrizzleD1Database,
	userFilters: RunsSearchFilter,
	serverFilters: ServerSearchFilter,
	attributeFilters?: RunAttributeFilter[]
) => {
  console.log("derp")
	const results = await db
		.select()
		.from(runs)
		.innerJoin(runParty, eq(runs.id, runParty.runId))
		.where(
			and(
				// Filter by submitting user
				!!serverFilters.submitterId ? eq(runs.submitterId, serverFilters.submitterId) : undefined,
				// Approved run filter
				serverFilters.submissionStatus !== undefined && serverFilters.submissionStatus !== null
					? eq(runs.submissionStatus, 1) //TODO use enum instead
					: undefined,
				// Class filter only available for solo runs
				!!userFilters.class
					? and(eq(runs.partySize, 1), eq(runParty.mainClass, userFilters.class))
					: undefined,
				!!userFilters.quest ? eq(runs.quest, userFilters.quest) : undefined,
				!!userFilters.category ? eq(runs.category, userFilters.category) : undefined,
				!!userFilters.rank ? eq(runs.questRank, userFilters.rank) : undefined,
				!!userFilters.server ? eq(runs.serverRegion, userFilters.server) : undefined
			)
		)
		.orderBy(asc(runs.runTime));

	// // Build filters
	// if (userFilters.userId) {
	// 	query += ` AND run.${runsDbFields.Id} IN (
	//     SELECT DISTINCT(RunId)
	//     FROM RunParty
	//     WHERE ${runPartyDbFields.PlayerId} = @participatingPlayerId
	//   )`;
	// 	request = request.input('participatingPlayerId', 1, userFilters.userId);
	// }

	// if (!!attributeFilters && attributeFilters.length > 0) {
	// 	const { request: inputtedRequest, query: appendedQuery } = appendAttributeFilter(
	// 		request,
	// 		query,
	// 		attributeFilters
	// 	);
	// 	request = inputtedRequest;
	// 	query = appendedQuery;
	// }

	// if (userFilters.partySize !== undefined && userFilters.partySize !== null) {
	// 	if (userFilters.partySize >= 3 && userFilters.partySize <= 4) {
	// 		//TODO temporary support for 3-4 player runs, future provide enums
	// 		query += ` AND run.${runsDbFields.PartySize} >= 3 AND run.${runsDbFields.PartySize} <= 4`;
	// 		request = request.input('partySize', 1, userFilters.partySize);
	// 	} else if (userFilters.partySize >= 5 && userFilters.partySize <= 8) {
	// 		//TODO temporary support for 5-8 player runs, future provide enums
	// 		query += ` AND run.${runsDbFields.PartySize} >= 5 AND run.${runsDbFields.PartySize} <= 8`;
	// 		request = request.input('partySize', 1, userFilters.partySize);
	// 	} else {
	// 		query += ` AND run.${runsDbFields.PartySize} = @partySize`;
	// 		request = request.input('partySize', 1, userFilters.partySize);
	// 	}
	// }

	// // Sorting and Pagination
	// let rankSorting = '';
	// if (userFilters.sort === RunSortOption.Recent) {
	// 	rankSorting = `runSearch.${getRunDbFields.RunSubmissionDate} DESC, runSearch.${getRunDbFields.RunId} ASC`;
	// 	query += ` ORDER BY run.${runsDbFields.SubmissionDate} DESC, run.${runsDbFields.Id} ASC`;
	// } else if (userFilters.sort === RunSortOption.MasqDepthRanking) {
	// 	rankSorting = `CAST(JSON_VALUE(runSearch.${getRunDbFields.RunAttributes},'$.depth') AS INT) DESC, runSearch.${getRunDbFields.RunQuestRank} DESC, runSearch.${getRunDbFields.RunTime} ASC, runSearch.${getRunDbFields.RunSubmissionDate} ASC, runSearch.${getRunDbFields.RunId} ASC`;
	// 	query += ` ORDER BY CAST(JSON_VALUE(run.${runsDbFields.Attributes},'$.depth') AS INT) DESC, run.${runsDbFields.QuestRank} DESC, run.${runsDbFields.RunTime} ASC, run.${runsDbFields.SubmissionDate} ASC, run.${runsDbFields.Id} ASC`;
	// } else {
	// 	// Ranking sort order
	// 	rankSorting = `runSearch.${getRunDbFields.RunTime} ASC, runSearch.${getRunDbFields.RunSubmissionDate} ASC, runSearch.${getRunDbFields.RunId} ASC`;
	// 	query += ` ORDER BY run.${runsDbFields.RunTime} ASC, run.${runsDbFields.SubmissionDate} ASC, run.${runsDbFields.Id} ASC`;
	// }

	// let takeRange = 30000;
	// if (userFilters.take) {
	// 	takeRange = userFilters.take;
	// }

	// let skipAmount = 1;
	// if (userFilters.page && userFilters.take) {
	// 	skipAmount = userFilters.page * userFilters.take;
	// }

	// query += ` OFFSET 0 ROWS`;

	// request = request.input('groupNumLower', 1, skipAmount);
	// request = request.input('groupNumUpper', 1, skipAmount + takeRange - 1);

	// const limitQueryFilter = `
	//   AND runSearchRanked.${getRunDbFields.RunMetaGroupNum} BETWEEN @groupNumLower AND @groupNumUpper`;

	// query = `
	//   SELECT
	//     runSearchRanked.*
	//   FROM (
	//     SELECT
	//       DENSE_RANK() OVER (ORDER BY ${rankSorting}) AS ${getRunDbFields.RunMetaGroupNum},
	//       runSearch.*
	//     FROM (${query}) runSearch
	//   ) runSearchRanked
	//   WHERE 1=1 ${limitQueryFilter}
	// `;

	// // Execute
	// const results = await request.query(query);
	// return results.recordset as GetRunDbModel[];

	return results;
};
