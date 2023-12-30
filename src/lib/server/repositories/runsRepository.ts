import sql, { type Request } from 'mssql';
import type { RunPartyDbModel } from '../types/db/runs/runParty';
import type { RunDbModel } from '../types/db/runs/run';
import { fields } from '../util/nameof';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { normalizeYoutubeLink } from '$lib/utils/youtube';
import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';
import type { RunAttributeFilter } from '../types/db/runs/runAttributeFilter';
import type { PlayersDbModel2 } from '../types/db/users/players';
import type { Game } from '$lib/types/api/game';
import type { CountSolosDbModel } from '../types/db/runs/countSolo';
import { parseServerRegion } from '$lib/types/api/serverRegions';
import { parseNgsWeapon } from '$lib/types/api/weapon';
import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';
import type { GetRunDbModel } from '../types/db/runs/getRun';
import type { ServerSearchFilter } from '../types/api/runsSearch';
import type { Pool } from 'pg';

const runsDbFields = fields<RunDbModel>();
const runPartyDbFields = fields<RunPartyDbModel>();
const playersDbFields = fields<PlayersDbModel2>();
const getRunDbFields = fields<GetRunDbModel>();
const countSoloFields = fields<CountSolosDbModel>();

const RunQuery = `
	SELECT
    run.${runsDbFields.id} AS ${getRunDbFields.run_id},
		run.${runsDbFields.submitter_id} AS ${getRunDbFields.run_submitter_id},
		run.${runsDbFields.game} AS ${getRunDbFields.run_game},
		run.${runsDbFields.quest} AS ${getRunDbFields.run_quest},
		run.${runsDbFields.category} AS ${getRunDbFields.run_category},
		run.${runsDbFields.server_region} AS ${getRunDbFields.run_server_region},
		run.${runsDbFields.patch} AS ${getRunDbFields.run_patch},
		run.${runsDbFields.quest_rank} AS ${getRunDbFields.run_quest_rank},
		run.${runsDbFields.party_size} AS ${getRunDbFields.run_party_size},
		run.${runsDbFields.run_time} AS ${getRunDbFields.run_time},
		run.${runsDbFields.notes} AS ${getRunDbFields.run_notes},
		run.${runsDbFields.submission_date} AS ${getRunDbFields.run_submission_date},
		run.${runsDbFields.submission_status} AS ${getRunDbFields.run_submission_status},
		run.${runsDbFields.date_reviewed} AS ${getRunDbFields.run_date_reviewed},
		run.${runsDbFields.reviewed_by} AS ${getRunDbFields.run_reviewed_by},
		run.${runsDbFields.mod_notes} AS ${getRunDbFields.run_mod_notes},
		run.${runsDbFields.attributes} AS ${getRunDbFields.run_attributes},

		rp.${runPartyDbFields.id} AS ${getRunDbFields.party_id},
		rp.${runPartyDbFields.run_id} AS ${getRunDbFields.party_run_id},
		rp.${runPartyDbFields.player_id} AS ${getRunDbFields.party_player_id},
		rp.${runPartyDbFields.ordinal} AS ${getRunDbFields.party_ordinal},
		rp.${runPartyDbFields.pov_link} AS ${getRunDbFields.party_pov_link},
		rp.${runPartyDbFields.run_character_name} AS ${getRunDbFields.party_run_character_name},
		rp.${runPartyDbFields.main_class} AS ${getRunDbFields.party_main_class},
		rp.${runPartyDbFields.sub_class} AS ${getRunDbFields.party_sub_class},
		rp.${runPartyDbFields.weapons} AS ${getRunDbFields.party_weapons},

		player.${playersDbFields.player_name} AS ${getRunDbFields.player_name},
		player.${playersDbFields.character_name} AS ${getRunDbFields.player_character_name},
		player.${playersDbFields.preferred_name_type} AS ${getRunDbFields.player_preferred_name_type},
		player.${playersDbFields.server} AS ${getRunDbFields.player_server},
		player.${playersDbFields.ship} AS ${getRunDbFields.player_ship},
		player.${playersDbFields.flag} AS ${getRunDbFields.player_flag},
		player.${playersDbFields.name_effect_type} AS ${getRunDbFields.player_name_effect_type},
		player.${playersDbFields.name_color1} AS ${getRunDbFields.player_name_color1},
		player.${playersDbFields.name_color2} AS ${getRunDbFields.player_name_color2},

		sp.${playersDbFields.player_name} AS ${getRunDbFields.submitter_name},
		sp.${playersDbFields.character_name} AS ${getRunDbFields.submitter_character_name},
		sp.${playersDbFields.preferred_name_type} AS ${getRunDbFields.submitter_preferred_name_type},
		sp.${playersDbFields.server} AS ${getRunDbFields.submitter_server},
		sp.${playersDbFields.ship} AS ${getRunDbFields.submitter_ship},
		sp.${playersDbFields.flag} AS ${getRunDbFields.submitter_flag},
		sp.${playersDbFields.name_effect_type} AS ${getRunDbFields.submitter_name_effect_type},
		sp.${playersDbFields.name_color1} AS ${getRunDbFields.submitter_name_color1},
		sp.${playersDbFields.name_color2} AS ${getRunDbFields.submitter_name_color2}

	FROM runs AS run
	INNER JOIN run_party AS rp ON rp.${runPartyDbFields.run_id} = run.${runsDbFields.id}
	LEFT JOIN players player ON player.${playersDbFields.id} = rp.${runPartyDbFields.player_id}  
	INNER JOIN players AS sp ON run.${runsDbFields.submitter_id} = sp.${playersDbFields.id}

	WHERE 1=1
`;

export const getRunById = async (
	pool: Pool,
	runId: number,
	approved: boolean = true
): Promise<GetRunDbModel | undefined> => {
	let query = RunQuery;

	query += ` AND run.${runsDbFields.submission_status} = $1`;
	query += ` AND run.${runsDbFields.id} = $2`;

	const results = await pool.query(query, [approved, runId]);
	const runs = results.rows as GetRunDbModel[];
	return runs[0];
};

export const getRuns = async (
	pool: Pool,
	userFilters: RunsSearchFilter,
	serverFilters: ServerSearchFilter,
	attributeFilters?: RunAttributeFilter[]
) => {
	let query = RunQuery;
	let queryParamNum = 1;
	const queryParams = [];

	// Build filters
	if (serverFilters.submitterId) {
		query += ` AND run.${runsDbFields.submitter_id} = $${queryParamNum++}`;
		queryParams.push(serverFilters.submitterId);
	}

	if (serverFilters.submissionStatus !== undefined && serverFilters.submissionStatus !== null) {
		const approvedInt = serverFilters.submissionStatus ? 1 : 0;
		query += ` AND run.${runsDbFields.submission_status} = $${queryParamNum++}`;
		queryParams.push(approvedInt);
	}

	if (userFilters.userId) {
		query += ` AND run.${runsDbFields.id} IN (
			SELECT DISTINCT(RunId)
			FROM run_party
			WHERE ${runPartyDbFields.player_id} = $${queryParamNum++}
		)`;
		queryParams.push(userFilters.userId);
	}

	if (userFilters.class) {
		const mappedClass = userFilters.class;
		query += ` AND run.${runsDbFields.party_size} = 1 AND rp.${
			runPartyDbFields.main_class
		} = $${queryParamNum++}`;
		queryParams.push(mappedClass);
	}

	if (userFilters.quest) {
		query += ` AND run.${runsDbFields.quest} = $${queryParamNum++}`;
		queryParams.push(userFilters.quest);
	}

	if (userFilters.category) {
		query += ` AND run.${runsDbFields.category} = $${queryParamNum++}`;
		queryParams.push(userFilters.category);
	}

	if (userFilters.rank) {
		query += ` AND run.${runsDbFields.quest_rank} = $${queryParamNum++}`;
		queryParams.push(userFilters.rank);
	}

	if (userFilters.server) {
		query += ` AND run.${runsDbFields.server_region} = $${queryParamNum++}`;
		queryParams.push(userFilters.server);
	}

	// if (!!attributeFilters && attributeFilters.length > 0) {
	// 	const { request: inputtedRequest, query: appendedQuery } = appendAttributeFilter(
	// 		pool,
	// 		query,
	// 		attributeFilters
	// 	);
	// 	pool = inputtedRequest;
	// 	query = appendedQuery;
	// }

	if (userFilters.partySize !== undefined && userFilters.partySize !== null) {
		if (userFilters.partySize >= 3) {
			//TODO temporary support for 3 player runs, provide enums
			query += ` AND run.${runsDbFields.party_size} >= $${queryParamNum++}`;
			queryParams.push(userFilters.partySize);
		} else {
			query += ` AND run.${runsDbFields.party_size} = $${queryParamNum++}`;
			queryParams.push(userFilters.partySize);
		}
	}

	// Sorting and Pagination
	let rankSorting = '';
	if (userFilters.sort === 'recent') {
		rankSorting = `runSearch.${getRunDbFields.run_submission_date} DESC, runSearch.${getRunDbFields.run_id} ASC`;
		query += ` ORDER BY run.${runsDbFields.submission_date} DESC, run.${runsDbFields.id} ASC`;
	} else {
		// Ranking sort order
		rankSorting = `runSearch.${getRunDbFields.run_time} ASC, runSearch.${getRunDbFields.run_submission_date} ASC, runSearch.${getRunDbFields.run_id} ASC`;
		query += ` ORDER BY run.${runsDbFields.run_time} ASC, run.${runsDbFields.submission_date} ASC, run.${runsDbFields.id} ASC`;
	}

	let takeRange = 30000;
	if (userFilters.take) {
		takeRange = userFilters.take;
	}

	let skipAmount = 1;
	if (userFilters.page && userFilters.take) {
		skipAmount = userFilters.page * userFilters.take;
	}

	query += ` OFFSET 0 ROWS`;

	queryParams.push(skipAmount);
	queryParams.push(skipAmount + takeRange);

	const limitQueryFilter = ` 
    AND runSearchRanked.${
			getRunDbFields.run_meta_group_num
		} BETWEEN $${queryParamNum++} AND $${queryParamNum++}`;

	query = `
    SELECT 
			runSearchRanked.*
    FROM (
			SELECT 
				DENSE_RANK() OVER (ORDER BY ${rankSorting}) AS ${getRunDbFields.run_meta_group_num},
				runSearch.*
			FROM (${query}) runSearch
		) runSearchRanked
    WHERE 1=1 ${limitQueryFilter}
  `;

	// Execute
	const results = await pool.query(query, queryParams);
	console.log(query, queryParams, results.rows);
	return results.rows as GetRunDbModel[];
};

export const insertRun = async (
	pool: Pool,
	game: Game,
	run: RunSubmissionRequest,
	submitterId: number
) => {
	// TODO make transaction

	const serverRegion = parseServerRegion(run.serverRegion);
	const runDetails =
		run.details === null || run.details === undefined ? null : JSON.stringify(run.details);
	const serializedRunTime = serializeTimeToSqlTime(run.time);

	const runInsertResult = await pool.query(
		`
    INSERT INTO Runs (
      ${runsDbFields.submitter_id},
      ${runsDbFields.game},
      ${runsDbFields.quest},
      ${runsDbFields.category},
      ${runsDbFields.server_region},
      ${runsDbFields.patch},
      ${runsDbFields.quest_rank},
			${runsDbFields.party_size},
      ${runsDbFields.run_time},
      ${runsDbFields.notes},
      ${runsDbFields.submission_date},
      ${runsDbFields.submission_status},
      ${runsDbFields.date_reviewed},
      ${runsDbFields.mod_notes},
      ${runsDbFields.attributes},
      ${runsDbFields.reviewed_by})
    VALUES (
      @submitterId,
			@game,
      @quest,
      @category,
      @serverRegion,
      @patch,
      @rank,
			@partySize,
      @runTime,
      @notes,
      @submissionDate,
      @submissionStatus,
      @dateApproved,
      @modNotes,
      @attributes,
			NULL)
    RETURNING ${runsDbFields.id};
  `,
		[
			submitterId,
			game,
			run.quest,
			run.category,
			serverRegion,
			run.party.length,
			run.patch,
			run.questRank,
			serializedRunTime,
			run.notes,
			new Date(),
			RunSubmissionStatus.AwaitingApproval,
			null,
			null,
			runDetails,
		]
	);
	if (runInsertResult.rowCount == 0) {
		throw Error(`Run insertion failed.`);
	}
	console.log(runInsertResult);
	const insertedRunId = runInsertResult.rows[0].id;

	await insertRunParty(pool, 1001, run.party);
};

const insertRunParty = async (
	pool: Pool,
	runId: number,
	partyMembers: RunSubmissionRequest['party']
) => {
	const insertValueRows: string[] = [];
	partyMembers.forEach((member, i) => {
		// Transform request
		const normalizedPovLink = member.povLink ? normalizeYoutubeLink(member.povLink) : null;
		const weapons = member.weapons.map((w) => parseNgsWeapon(w)!);
		const mainClass = member.mainClass;
		const subClass = member.subClass;

		partyInsertRequest = partyInsertRequest
			.input(`playerId${i}`, sql.Int, member.playerId)
			.input(`ordinal${i}`, sql.Int, member.ordinal)
			.input(`povLink${i}`, sql.NVarChar(100), normalizedPovLink)
			.input(`runCharacterName${i}`, sql.NVarChar(30), member.inVideoName)
			.input(`mainClass${i}`, sql.NVarChar(30), mainClass)
			.input(`subClass${i}`, sql.NVarChar(30), subClass)
			.input(`weapons${i}`, sql.NVarChar(4000), JSON.stringify(weapons));

		insertValueRows.push(`
      (@runId,@playerId${i},@ordinal${i},@povLink${i},@runCharacterName${i},@mainClass${i},@subClass${i},@weapons${i})
    `);
	});

	partyInsertRequest = partyInsertRequest.input(`runId`, sql.Int, runId);
	const result = await partyInsertRequest.query(`
    INSERT INTO run_party (
      ${runPartyDbFields.run_id},
      ${runPartyDbFields.player_id},
      ${runPartyDbFields.ordinal},
      ${runPartyDbFields.pov_link},
      ${runPartyDbFields.run_character_name},
      ${runPartyDbFields.main_class},
      ${runPartyDbFields.sub_class},
      ${runPartyDbFields.weapons})
    VALUES
      ${insertValueRows.join(',')}
  `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Run party insertion failed.`);
	}
};

export const checkRunVideoExists = async (pool: Pool, videoLinks: string[]) => {
	let videoLinkRequest = pool;

	const videoLinksResults = await videoLinkRequest.query(
		`
    SELECT ${runPartyDbFields.pov_link} 
      FROM run_party
      WHERE ${runPartyDbFields.pov_link} IN ($1::varchar[])
  `,
		[videoLinks]
	);

	const duplicateLinks = videoLinksResults.rows as RunPartyDbModel[];
	if (duplicateLinks.length > 0) {
		return duplicateLinks.map((r) => r.pov_link as string);
	}
	return [];
};

export const checkRunExists = async (pool: Pool, runId: number) => {
	const runResult = await pool.query(
		`
      SELECT
				${runsDbFields.id},
				${runsDbFields.submission_status},
				${runsDbFields.submission_date},
				${runsDbFields.submitter_id}
			FROM Runs
      WHERE ${runsDbFields.id} = $1;
    `[runId]
	);
	if (runResult.rowCount === 0) {
		return undefined;
	}

	const submission = runResult.rows[0] as RunDbModel;
	return {
		runId: submission?.id,
		submissionStatus: submission?.submission_status,
		submitterId: submission?.submitter_id,
	};
};

export const approveRun = async (
	pool: Pool,
	runId: number,
	reviewerName: string,
	modNotes: string | null | undefined
) => {
	const submissionResult = await pool.query(
		`
			UPDATE Runs
			SET 
				${runsDbFields.submission_status} = $1,
				${runsDbFields.date_reviewed} = $2,
				${runsDbFields.reviewed_by} = $3,
				${runsDbFields.mod_notes} = $4
			WHERE ${runsDbFields.id} = $5;
    `[(RunSubmissionStatus.Approved, new Date(), modNotes, reviewerName, runId)]
	);

	if (submissionResult.rowCount == 0) {
		throw Error(`Run approval failed.`);
	}
};

export const denyRun = async (
	pool: Pool,
	runId: number,
	reviewerName: string,
	modNotes: string | null | undefined
) => {
	const submissionResult = await pool.query(
		`
      UPDATE Runs
			SET 
				${runsDbFields.submission_status} = $1,
				${runsDbFields.date_reviewed} = $2,
				${runsDbFields.reviewed_by} = $3,
				${runsDbFields.mod_notes} = $4
			WHERE ${runsDbFields.id} = $5;
    `,
		[RunSubmissionStatus.Rejected, new Date(), modNotes, reviewerName, runId]
	);

	if (submissionResult.rowCount == 0) {
		throw Error(`Run denial failed.`);
	}
};

const serializeTimeToSqlTime = (runTime: RunSubmissionRequest['time']) =>
	`${runTime.hours.toString().padStart(2)}:${runTime.minutes
		.toString()
		.padStart(2)}:${runTime.seconds.toString().padStart(2)}`;

const appendAttributeFilter = (
	request: Request,
	queryString: string,
	attributeFilters: RunAttributeFilter[]
) => {
	attributeFilters.forEach((f, i) => {
		const paramName = `attr_value${i}`;
		const attrPath = `attr_path${i}`;
		queryString += ` AND JSON_VALUE(run.${runsDbFields.attributes}, @${attrPath})= @${paramName}`;

		request = request.input(attrPath, sql.NVarChar, `$.${f.path}`);

		if (f.type === 'string') {
			request = request.input(paramName, sql.NVarChar, f.value);
		} else if (f.type === 'number') {
			request = request.input(paramName, sql.Int, f.value);
		} else if (f.type === 'boolean') {
			//TODO what type should JSOn boolean be?
			request = request.input(paramName, sql.Bit, f.value);
		} else {
			throw new Error('Unknown attribute type');
		}
	});

	return {
		request: request,
		query: queryString,
	};
};

export const countSoloRuns = async (request: Pool) => {
	const sqlQuery = `
			SELECT COUNT(*) AS ${countSoloFields.SoloRunsCount}
			FROM Runs
			WHERE Runs.${runsDbFields.party_size} = 1
    `;

	const results = await request.query(sqlQuery);
	const counts = results.rows[0] as CountSolosDbModel;
	return counts;
};
