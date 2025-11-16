import sql, { type Request } from 'mssql';
import type { RunPartyDbModel } from '../types/db/runs/runParty';
import type { RunDbModel } from '../types/db/runs/run';
import { fields } from '../util/nameof';
import type {
	RunSubmissionParty,
	RunSubmissionRequest,
} from '$lib/types/api/validation/runSubmission';
import { normalizeYoutubeLink } from '$lib/utils/youtube';
import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';
import type { RunAttributeFilter } from '../types/db/runs/runAttributeFilter';
import type { PlayersDbModel } from '../types/db/users/players';
import type { Game } from '$lib/types/api/game';
import type { CountRunsDbModel } from '../types/db/runs/countStats';
import { parseServerRegion } from '$lib/types/api/serverRegions';
import { parseNgsWeapon } from '$lib/types/api/weapon';
import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';
import type { GetRunDbModel } from '../types/db/runs/getRun';
import type { ServerSearchFilter } from '../types/api/runsSearch';
import { PartySize } from '$lib/types/api/partySizes';
import { RunSortOption } from '$lib/types/api/runs/sortOptions';

const runsDbFields = fields<RunDbModel>();
const runPartyDbFields = fields<RunPartyDbModel>();
const playersDbFields = fields<PlayersDbModel>();
const getRunDbFields = fields<GetRunDbModel>();
const countRunsFields = fields<CountRunsDbModel>();

const RunQuery = `
	SELECT
    run.${runsDbFields.Id} AS ${getRunDbFields.RunId},
		run.${runsDbFields.SubmitterId} AS ${getRunDbFields.RunSubmitterId},
		run.${runsDbFields.Game} AS ${getRunDbFields.RunGame},
		run.${runsDbFields.Quest} AS ${getRunDbFields.RunQuest},
		run.${runsDbFields.Category} AS ${getRunDbFields.RunCategory},
		run.${runsDbFields.ServerRegion} AS ${getRunDbFields.RunServerRegion},
		run.${runsDbFields.Patch} AS ${getRunDbFields.RunPatch},
		run.${runsDbFields.QuestRank} AS ${getRunDbFields.RunQuestRank},
		run.${runsDbFields.PartySize} AS ${getRunDbFields.RunPartySize},
		run.${runsDbFields.RunTime} AS ${getRunDbFields.RunTime},
		run.${runsDbFields.Notes} AS ${getRunDbFields.RunNotes},
		run.${runsDbFields.SubmissionDate} AS ${getRunDbFields.RunSubmissionDate},
		run.${runsDbFields.SubmissionStatus} AS ${getRunDbFields.RunSubmissionStatus},
		run.${runsDbFields.DateReviewed} AS ${getRunDbFields.RunDateReviewed},
		run.${runsDbFields.ReviewedBy} AS ${getRunDbFields.RunReviewedBy},
		run.${runsDbFields.ModNotes} AS ${getRunDbFields.RunModNotes},
		run.${runsDbFields.Attributes} AS ${getRunDbFields.RunAttributes},

		rp.${runPartyDbFields.Id} AS ${getRunDbFields.PartyId},
		rp.${runPartyDbFields.RunId} AS ${getRunDbFields.PartyRunId},
		rp.${runPartyDbFields.PlayerId} AS ${getRunDbFields.PartyPlayerId},
		rp.${runPartyDbFields.Ordinal} AS ${getRunDbFields.PartyOrdinal},
		rp.${runPartyDbFields.PovLink} AS ${getRunDbFields.PartyPovLink},
		rp.${runPartyDbFields.RunCharacterName} AS ${getRunDbFields.PartyRunCharacterName},
		rp.${runPartyDbFields.MainClass} AS ${getRunDbFields.PartyMainClass},
		rp.${runPartyDbFields.SubClass} AS ${getRunDbFields.PartySubClass},
		rp.${runPartyDbFields.StyleClass} AS ${getRunDbFields.PartyStyleClass},
		rp.${runPartyDbFields.Weapons} AS ${getRunDbFields.PartyWeapons},

		player.${playersDbFields.PlayerName} AS ${getRunDbFields.PlayerName},
		player.${playersDbFields.CharacterName} AS ${getRunDbFields.PlayerCharacterName},
		player.${playersDbFields.PreferredNameType} AS ${getRunDbFields.PlayerPreferredNameType},
		player.${playersDbFields.Server} AS ${getRunDbFields.PlayerServer},
		player.${playersDbFields.Ship} AS ${getRunDbFields.PlayerShip},
		player.${playersDbFields.Flag} AS ${getRunDbFields.PlayerFlag},
		player.${playersDbFields.NameEffectType} AS ${getRunDbFields.PlayerNameEffectType},
		player.${playersDbFields.NameColor1} AS ${getRunDbFields.PlayerNameColor1},
		player.${playersDbFields.NameColor2} AS ${getRunDbFields.PlayerNameColor2},

		sp.${playersDbFields.PlayerName} AS ${getRunDbFields.SubmitterName},
		sp.${playersDbFields.CharacterName} AS ${getRunDbFields.SubmitterCharacterName},
		sp.${playersDbFields.PreferredNameType} AS ${getRunDbFields.SubmitterPreferredNameType},
		sp.${playersDbFields.Server} AS ${getRunDbFields.SubmitterServer},
		sp.${playersDbFields.Ship} AS ${getRunDbFields.SubmitterShip},
		sp.${playersDbFields.Flag} AS ${getRunDbFields.SubmitterFlag},
		sp.${playersDbFields.NameEffectType} AS ${getRunDbFields.SubmitterNameEffectType},
		sp.${playersDbFields.NameColor1} AS ${getRunDbFields.SubmitterNameColor1},
		sp.${playersDbFields.NameColor2} AS ${getRunDbFields.SubmitterNameColor2}

	FROM dbo.Runs AS run
	INNER JOIN dbo.RunParty AS rp ON rp.${runPartyDbFields.RunId} = run.${runsDbFields.Id}
	LEFT JOIN dbo.Players player ON player.${playersDbFields.Id} = rp.${runPartyDbFields.PlayerId}  
	INNER JOIN dbo.Players AS sp ON run.${runsDbFields.SubmitterId} = sp.${playersDbFields.Id}

	WHERE 1=1
`;

export const getRunById = async (
	request: Request,
	runId: number,
	approved: boolean = true
): Promise<GetRunDbModel[] | undefined> => {
	let query = RunQuery;

	query += ` AND run.${runsDbFields.SubmissionStatus} = @approved`;
	request = request.input('approved', sql.TinyInt, approved);

	query += ` AND run.${runsDbFields.Id} = @runId`;
	request = request.input('runId', sql.Int, runId);

	const results = await request.query(query);
	const runs = results.recordset as GetRunDbModel[];
	return runs;
};

export const getRuns = async (
	request: Request,
	userFilters: RunsSearchFilter,
	serverFilters: ServerSearchFilter,
	attributeFilters?: RunAttributeFilter[]
) => {
	let query = RunQuery;

	// Build filters
	if (serverFilters.submitterId) {
		query += ` AND run.${runsDbFields.SubmitterId} = @submitterId`;
		request = request.input('submitterId', sql.Int, serverFilters.submitterId);
	}

	if (serverFilters.submissionStatus !== undefined && serverFilters.submissionStatus !== null) {
		const approvedInt = serverFilters.submissionStatus ? 1 : 0;
		query += ` AND run.${runsDbFields.SubmissionStatus} = @approved`;
		request = request.input('approved', sql.TinyInt, approvedInt);
	}

	if (userFilters.userId) {
		query += ` AND run.${runsDbFields.Id} IN (
			SELECT DISTINCT(RunId)
			FROM RunParty
			WHERE ${runPartyDbFields.PlayerId} = @participatingPlayerId
		)`;
		request = request.input('participatingPlayerId', sql.Int, userFilters.userId);
	}

	if (userFilters.class) {
		const mappedClass = userFilters.class;
		query += ` AND run.${runsDbFields.PartySize} = 1 AND rp.${runPartyDbFields.MainClass} = @class`;
		request = request.input('class', sql.NVarChar, mappedClass);
	}

	if (userFilters.quest) {
		query += ` AND run.${runsDbFields.Quest} = @quest`;
		request = request.input('quest', sql.NVarChar, userFilters.quest);
	}

	if (userFilters.category) {
		query += ` AND run.${runsDbFields.Category} = @category`;
		request = request.input('category', sql.NVarChar, userFilters.category);
	}

	if (userFilters.rank) {
		query += ` AND run.${runsDbFields.QuestRank} = @rank`;
		request = request.input('rank', sql.TinyInt, userFilters.rank);
	}

	if (userFilters.server) {
		query += ` AND run.${runsDbFields.ServerRegion} = @server`;
		request = request.input('server', sql.NVarChar, userFilters.server);
	}

	if (!!attributeFilters && attributeFilters.length > 0) {
		const { request: inputtedRequest, query: appendedQuery } = appendAttributeFilter(
			request,
			query,
			attributeFilters
		);
		request = inputtedRequest;
		query = appendedQuery;
	}

	if (userFilters.partySize !== undefined && userFilters.partySize !== null) {
		if (userFilters.partySize >= 3 && userFilters.partySize <= 4) {
			//TODO temporary support for 3-4 player runs, future provide enums
			query += ` AND run.${runsDbFields.PartySize} >= 3 AND run.${runsDbFields.PartySize} <= 4`;
			request = request.input('partySize', sql.TinyInt, userFilters.partySize);
		} else if (userFilters.partySize >= 5 && userFilters.partySize <= 8) {
			//TODO temporary support for 5-8 player runs, future provide enums
			query += ` AND run.${runsDbFields.PartySize} >= 5 AND run.${runsDbFields.PartySize} <= 8`;
			request = request.input('partySize', sql.TinyInt, userFilters.partySize);
		} else {
			query += ` AND run.${runsDbFields.PartySize} = @partySize`;
			request = request.input('partySize', sql.TinyInt, userFilters.partySize);
		}
	}

	// Sorting and Pagination
	let rankSorting = '';
	if (userFilters.sort === RunSortOption.Recent) {
		rankSorting = `runSearch.${getRunDbFields.RunSubmissionDate} DESC, runSearch.${getRunDbFields.RunId} ASC`;
		query += ` ORDER BY run.${runsDbFields.SubmissionDate} DESC, run.${runsDbFields.Id} ASC`;
	} else if (userFilters.sort === RunSortOption.MasqDepthRanking) {
		rankSorting = `CAST(JSON_VALUE(runSearch.${getRunDbFields.RunAttributes},'$.depth') AS INT) DESC, runSearch.${getRunDbFields.RunQuestRank} DESC, runSearch.${getRunDbFields.RunTime} ASC, runSearch.${getRunDbFields.RunSubmissionDate} ASC, runSearch.${getRunDbFields.RunId} ASC`;
		query += ` ORDER BY CAST(JSON_VALUE(run.${runsDbFields.Attributes},'$.depth') AS INT) DESC, run.${runsDbFields.QuestRank} DESC, run.${runsDbFields.RunTime} ASC, run.${runsDbFields.SubmissionDate} ASC, run.${runsDbFields.Id} ASC`;
	} else {
		// Ranking sort order
		rankSorting = `runSearch.${getRunDbFields.RunTime} ASC, runSearch.${getRunDbFields.RunSubmissionDate} ASC, runSearch.${getRunDbFields.RunId} ASC`;
		query += ` ORDER BY run.${runsDbFields.RunTime} ASC, run.${runsDbFields.SubmissionDate} ASC, run.${runsDbFields.Id} ASC`;
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

	request = request.input('groupNumLower', sql.Int, skipAmount);
	request = request.input('groupNumUpper', sql.Int, skipAmount + takeRange - 1);

	const limitQueryFilter = ` 
    AND runSearchRanked.${getRunDbFields.RunMetaGroupNum} BETWEEN @groupNumLower AND @groupNumUpper`;

	query = `
    SELECT 
			runSearchRanked.*
    FROM (
			SELECT 
				DENSE_RANK() OVER (ORDER BY ${rankSorting}) AS ${getRunDbFields.RunMetaGroupNum},
				runSearch.*
			FROM (${query}) runSearch
		) runSearchRanked
    WHERE 1=1 ${limitQueryFilter}
  `;

	// Execute
	const results = await request.query(query);
	return results.recordset as GetRunDbModel[];
};

export const insertRun = async (
	transaction: sql.Transaction,
	game: Game,
	run: RunSubmissionRequest,
	submitterId: number
) => {
	const request = transaction.request();

	const serverRegion = parseServerRegion(run.serverRegion);
	const runDetails =
		run.details === null || run.details === undefined ? null : JSON.stringify(run.details);

	const serializedRunTime = serializeTimeToSqlTime(run.time);
	const insertRequest = request
		.input('submitterId', sql.Int, submitterId)
		.input('game', sql.NVarChar(3), game)
		.input('quest', sql.NVarChar(50), run.quest)
		.input('category', sql.NVarChar(30), run.category)
		.input('serverRegion', sql.NVarChar(10), serverRegion)
		.input('partySize', sql.TinyInt, run.party.length)
		.input('patch', sql.NVarChar(30), run.patch)
		.input('rank', sql.TinyInt, run.questRank)
		.input('runTime', sql.NVarChar, serializedRunTime)
		.input('notes', sql.NVarChar(500), run.notes)
		.input('submissionDate', sql.DateTime2, new Date())
		.input('submissionStatus', sql.TinyInt, RunSubmissionStatus.AwaitingApproval)
		.input('dateApproved', sql.DateTime2, null)
		.input('modNotes', sql.NVarChar(500), null)
		.input('attributes', sql.NVarChar(4000), runDetails);

	const runInsertResult = await insertRequest.query(`
    INSERT INTO dbo.Runs (
      ${runsDbFields.SubmitterId},
      ${runsDbFields.Game},
      ${runsDbFields.Quest},
      ${runsDbFields.Category},
      ${runsDbFields.ServerRegion},
      ${runsDbFields.Patch},
      ${runsDbFields.QuestRank},
			${runsDbFields.PartySize},
      ${runsDbFields.RunTime},
      ${runsDbFields.Notes},
      ${runsDbFields.SubmissionDate},
      ${runsDbFields.SubmissionStatus},
      ${runsDbFields.DateReviewed},
      ${runsDbFields.ModNotes},
      ${runsDbFields.Attributes},
      ${runsDbFields.ReviewedBy})
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
    SELECT SCOPE_IDENTITY() AS LastID;
  `);
	if (runInsertResult.rowsAffected[0] == 0) {
		throw Error(`Run insertion failed.`);
	}
	const insertedRunId = parseInt(runInsertResult.recordset[0].LastID);

	await insertRunParty(request, insertedRunId, run.party);
};

const insertRunParty = async (
	request: Request,
	runId: number,
	partyMembers: RunSubmissionParty[]
) => {
	let partyInsertRequest = request;
	const insertValueRows: string[] = [];
	partyMembers.forEach((member, i) => {
		// Transform request
		const normalizedPovLink = member.povLink ? normalizeYoutubeLink(member.povLink) : null;
		const weapons = member.weapons.map((w) => parseNgsWeapon(w)!);
		const mainClass = member.mainClass;
		const subClass = member.subClass;
		const styleClass = member.styleClass;

		partyInsertRequest = partyInsertRequest
			.input(`playerId${i}`, sql.Int, member.playerId)
			.input(`ordinal${i}`, sql.Int, member.ordinal)
			.input(`povLink${i}`, sql.NVarChar(100), normalizedPovLink)
			.input(`runCharacterName${i}`, sql.NVarChar(30), member.inVideoName)
			.input(`mainClass${i}`, sql.NVarChar(30), mainClass)
			.input(`subClass${i}`, sql.NVarChar(30), subClass)
			.input(`styleClass${i}`, sql.NVarChar(30), styleClass)
			.input(`weapons${i}`, sql.NVarChar(4000), JSON.stringify(weapons));

		insertValueRows.push(`
      (@runId,@playerId${i},@ordinal${i},@povLink${i},@runCharacterName${i},@mainClass${i},@subClass${i},@styleClass${i},@weapons${i})
    `);
	});

	partyInsertRequest = partyInsertRequest.input(`runId`, sql.Int, runId);
	const result = await partyInsertRequest.query(`
    INSERT INTO dbo.RunParty (
      ${runPartyDbFields.RunId},
      ${runPartyDbFields.PlayerId},
      ${runPartyDbFields.Ordinal},
      ${runPartyDbFields.PovLink},
      ${runPartyDbFields.RunCharacterName},
      ${runPartyDbFields.MainClass},
      ${runPartyDbFields.SubClass},
			${runPartyDbFields.StyleClass},
      ${runPartyDbFields.Weapons})
    VALUES
      ${insertValueRows.join(',')}
  `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Run party insertion failed.`);
	}
};

export const checkRunVideoExists = async (request: sql.Request, videoLinks: string[]) => {
	let videoLinkRequest = request;

	const paramNames: string[] = [];
	videoLinks.forEach((l, i) => {
		const paramName = `link${i}`;
		paramNames.push(paramName);
		videoLinkRequest = videoLinkRequest.input(paramName, l);
	});

	const paramList = paramNames.map((p) => `@${p}`);
	const videoLinksResults = await videoLinkRequest.query(`
    SELECT ${runPartyDbFields.PovLink} 
      FROM dbo.RunParty 
      WHERE ${runPartyDbFields.PovLink} IN (${paramList.join(',')})
  `);

	const duplicateLinks = videoLinksResults.recordset as RunPartyDbModel[];
	return duplicateLinks.length > 0 ? duplicateLinks.map((r) => r.PovLink as string) : [];
};

export const checkRunExists = async (request: sql.Request, runId: number) => {
	const runResult = await request.input('runId', sql.Int, runId).query(`
      SELECT
				${runsDbFields.Id},
				${runsDbFields.SubmissionStatus},
				${runsDbFields.SubmissionDate},
				${runsDbFields.SubmitterId}
			FROM dbo.Runs
      WHERE ${runsDbFields.Id} = @runId;
    `);
	if (Array.from(runResult.recordset).length == 0) {
		return undefined;
	}
	const submission = runResult.recordset[0] as RunDbModel;
	return {
		runId: submission?.Id,
		submissionStatus: submission?.SubmissionStatus,
		submitterId: submission?.SubmitterId,
	};
};

export const approveRun = async (
	request: Request,
	runId: number,
	reviewerName: string,
	modNotes: string | null | undefined
) => {
	const submissionResult = await request
		.input('approveStatus', sql.TinyInt, RunSubmissionStatus.Approved)
		.input('approvalDate', sql.DateTime2, new Date())
		.input('reviewerName', sql.NVarChar(30), reviewerName)
		.input('modNotes', sql.NVarChar(500), modNotes)
		.input('runId', sql.Int, runId).query(`
      UPDATE dbo.Runs
      SET 
				${runsDbFields.SubmissionStatus} = @approveStatus,
				${runsDbFields.DateReviewed} = @approvalDate,
				${runsDbFields.ReviewedBy} = @reviewerName,
				${runsDbFields.ModNotes} = @modNotes
      WHERE ${runsDbFields.Id} = @runId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Run approval failed.`);
	}
};

export const denyRun = async (
	request: Request,
	runId: number,
	reviewerName: string,
	modNotes: string | null | undefined
) => {
	const submissionResult = await request
		.input('denyStatus', sql.TinyInt, RunSubmissionStatus.Rejected)
		.input('approvalDate', sql.DateTime2, new Date())
		.input('modNotes', sql.NVarChar(500), modNotes)
		.input('reviewerName', sql.NVarChar(30), reviewerName)
		.input('runId', sql.Int, runId).query(`
      UPDATE dbo.Runs
			SET 
				${runsDbFields.SubmissionStatus} = @denyStatus,
				${runsDbFields.DateReviewed} = @approvalDate,
				${runsDbFields.ReviewedBy} = @reviewerName,
				${runsDbFields.ModNotes} = @modNotes
			WHERE ${runsDbFields.Id} = @runId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
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
		queryString += ` AND JSON_VALUE(run.${runsDbFields.Attributes}, @${attrPath})= @${paramName}`;

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

export const countRuns = async (request: Request) => {
	const sqlQuery = `
		SELECT
			CASE
				WHEN PartySize = 1 THEN 'Solo'
				WHEN PartySize = 2 THEN 'Duo'
				WHEN PartySize >= 3 AND PartySize <= 4 THEN 'Party'
				ELSE 'Other'
			END AS ${countRunsFields.GroupName},
			COUNT(*) AS ${countRunsFields.Count}
		FROM runs
		GROUP BY
			CASE
				WHEN PartySize = 1 THEN 'Solo'
				WHEN PartySize = 2 THEN 'Duo'
				WHEN PartySize >= 3 AND PartySize <= 4 THEN 'Party'
				ELSE 'Other'
			END
    `;

	const results = await request.query(sqlQuery);
	const counts = results.recordset as CountRunsDbModel[];

	return {
		soloCount: parseInt(counts.find((x) => x.GroupName === 'Solo')?.Count ?? '-1'),
		duoCount: parseInt(counts.find((x) => x.GroupName === 'Duo')?.Count ?? '-1'),
		partyCount: parseInt(counts.find((x) => x.GroupName === 'Party')?.Count ?? '-1'),
	};
};
