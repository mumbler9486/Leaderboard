// import sql, { type Request } from 'mssql';
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
	request: any,
	runId: number,
	approved: boolean = true
): Promise<GetRunDbModel[] | undefined> => {
	let query = RunQuery;

	query += ` AND run.${runsDbFields.SubmissionStatus} = @approved`;
	request = request.input('approved', 1, approved);

	query += ` AND run.${runsDbFields.Id} = @runId`;
	request = request.input('runId', 1, runId);

	const results = await request.query(query);
	const runs = results.recordset as GetRunDbModel[];
	return runs;
};

export const getRuns = async (
	request: any,
	userFilters: RunsSearchFilter,
	serverFilters: ServerSearchFilter,
	attributeFilters?: RunAttributeFilter[]
) => {
	let query = RunQuery;

	// Build filters
	if (serverFilters.submitterId) {
		query += ` AND run.${runsDbFields.SubmitterId} = @submitterId`;
		request = request.input('submitterId', 1, serverFilters.submitterId);
	}

	if (serverFilters.submissionStatus !== undefined && serverFilters.submissionStatus !== null) {
		const approvedInt = serverFilters.submissionStatus ? 1 : 0;
		query += ` AND run.${runsDbFields.SubmissionStatus} = @approved`;
		request = request.input('approved', 1, approvedInt);
	}

	if (userFilters.userId) {
		query += ` AND run.${runsDbFields.Id} IN (
			SELECT DISTINCT(RunId)
			FROM RunParty
			WHERE ${runPartyDbFields.PlayerId} = @participatingPlayerId
		)`;
		request = request.input('participatingPlayerId', 1, userFilters.userId);
	}

	if (userFilters.class) {
		const mappedClass = userFilters.class;
		query += ` AND run.${runsDbFields.PartySize} = 1 AND rp.${runPartyDbFields.MainClass} = @class`;
		request = request.input('class', 1, mappedClass);
	}

	if (userFilters.quest) {
		query += ` AND run.${runsDbFields.Quest} = @quest`;
		request = request.input('quest', 1, userFilters.quest);
	}

	if (userFilters.category) {
		query += ` AND run.${runsDbFields.Category} = @category`;
		request = request.input('category', 1, userFilters.category);
	}

	if (userFilters.rank) {
		query += ` AND run.${runsDbFields.QuestRank} = @rank`;
		request = request.input('rank', 1, userFilters.rank);
	}

	if (userFilters.server) {
		query += ` AND run.${runsDbFields.ServerRegion} = @server`;
		request = request.input('server', 1, userFilters.server);
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
			request = request.input('partySize', 1, userFilters.partySize);
		} else if (userFilters.partySize >= 5 && userFilters.partySize <= 8) {
			//TODO temporary support for 5-8 player runs, future provide enums
			query += ` AND run.${runsDbFields.PartySize} >= 5 AND run.${runsDbFields.PartySize} <= 8`;
			request = request.input('partySize', 1, userFilters.partySize);
		} else {
			query += ` AND run.${runsDbFields.PartySize} = @partySize`;
			request = request.input('partySize', 1, userFilters.partySize);
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

	request = request.input('groupNumLower', 1, skipAmount);
	request = request.input('groupNumUpper', 1, skipAmount + takeRange - 1);

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
	transaction: any,
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
		.input('submitterId', 1, submitterId)
		.input('game', 3, game) //Nvarchar
		.input('quest', 50, run.quest) //Nvarchar
		.input('category', 30, run.category) //Nvarchar
		.input('serverRegion', 10, serverRegion) //Nvarchar
		.input('partySize', 1, run.party.length)
		.input('patch', 30, run.patch) //Nvarchar
		.input('rank', 1, run.questRank)
		.input('runTime', 1, serializedRunTime)
		.input('notes', 500, run.notes) //Nvarchar
		.input('submissionDate', 1, new Date())
		.input('submissionStatus', 1, RunSubmissionStatus.AwaitingApproval)
		.input('dateApproved', 1, null)
		.input('modNotes', 500, null) //Nvarchar
		.input('attributes', 4000, runDetails); //Nvarchar

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

const insertRunParty = async (request: any, runId: number, partyMembers: RunSubmissionParty[]) => {
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
			.input(`playerId${i}`, 1, member.playerId)
			.input(`ordinal${i}`, 1, member.ordinal)
			.input(`povLink${i}`, 100, normalizedPovLink) //nvarchar
			.input(`runCharacterName${i}`, 30, member.inVideoName) //nvarchar
			.input(`mainClass${i}`, 30, mainClass) //nvarchar
			.input(`subClass${i}`, 30, subClass) //nvarchar
			.input(`styleClass${i}`, 30, styleClass) //nvarchar
			.input(`weapons${i}`, 4000, JSON.stringify(weapons)); //nvarchar

		insertValueRows.push(`
      (@runId,@playerId${i},@ordinal${i},@povLink${i},@runCharacterName${i},@mainClass${i},@subClass${i},@styleClass${i},@weapons${i})
    `);
	});

	partyInsertRequest = partyInsertRequest.input(`runId`, 1, runId);
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

export const checkRunVideoExists = async (request: any, videoLinks: string[]) => {
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

export const checkRunExists = async (request: any, runId: number) => {
	const runResult = await request.input('runId', 1, runId).query(`
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
	request: any,
	runId: number,
	reviewerName: string,
	modNotes: string | null | undefined
) => {
	const submissionResult = await request
		.input('approveStatus', 1, RunSubmissionStatus.Approved)
		.input('approvalDate', 1, new Date())
		.input('reviewerName', 30, reviewerName) //nvarchar
		.input('modNotes', 500, modNotes) //nvarchar
		.input('runId', 1, runId).query(`
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
	request: any,
	runId: number,
	reviewerName: string,
	modNotes: string | null | undefined
) => {
	const submissionResult = await request
		.input('denyStatus', 1, RunSubmissionStatus.Rejected)
		.input('approvalDate', 1, new Date())
		.input('modNotes', 500, modNotes) //nvarchar
		.input('reviewerName', 30, reviewerName) //nvarchar
		.input('runId', 1, runId).query(`
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
	request: any,
	queryString: string,
	attributeFilters: RunAttributeFilter[]
) => {
	attributeFilters.forEach((f, i) => {
		const paramName = `attr_value${i}`;
		const attrPath = `attr_path${i}`;
		queryString += ` AND JSON_VALUE(run.${runsDbFields.Attributes}, @${attrPath})= @${paramName}`;

		request = request.input(attrPath, 1, `$.${f.path}`);

		if (f.type === 'string') {
			request = request.input(paramName, 1, f.value);
		} else if (f.type === 'number') {
			request = request.input(paramName, 1, f.value);
		} else if (f.type === 'boolean') {
			//TODO what type should JSOn boolean be?
			request = request.input(paramName, 1, f.value);
		} else {
			throw new Error('Unknown attribute type');
		}
	});

	return {
		request,
		query: queryString,
	};
};

export const countRuns = async (request: any) => {
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
