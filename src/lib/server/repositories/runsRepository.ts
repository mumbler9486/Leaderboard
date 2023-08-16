import sql, { type Request } from 'mssql';
import type { RunPartyDbModel } from '../types/db/runs/runParty';
import type { RunDbModel } from '../types/db/runs/run';
import { fields } from '../util/nameof';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { SubmissionStatusDbValue } from '../types/db/runs/submissionStatus';
import { mapNgsClassToDbVal } from '../types/db/runs/ngsClasses';
import { mapWeaponToDbVal } from '../types/db/runs/weapons';
import { normalizeYoutubeLink } from '$lib/utils/youtube';
import { mapServerRegionToDbVal } from '../types/db/runs/serverRegions';
import type { GameDbValue } from '../types/db/runs/game';
import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';
import type { RunAttributeFilter } from '../types/db/runAttributeFilter';

const runsDbFields = fields<RunDbModel>();
const runPartyDbFields = fields<RunPartyDbModel>();
const getRunDbFields = fields<GetRunDbModel>();

export interface GetRunDbModel {
	// Run
	RunId: string;
	RunSubmitterId: string;
	RunGame: string;
	RunQuest: string;
	RunCategory: string;
	RunServerRegion: string;
	RunPatch: string;
	RunQuestRank: string;
	RunPartySize: string;
	RunTime: string;
	RunNotes: string;
	RunSubmissionDate: string;
	RunSubmissionStatus: string;
	RunDateApproved: string;
	RunModNotes: string;
	RunAttributes: string;

	// Party
	PartyId: string;
	PartyRunId: string;
	PartyPlayerId: string;
	PartyOrdinal: string;
	PartyPovLink: string;
	PartyRunCharacterName: string;
	PartyMainClass: string;
	PartySubClass: string;
	PartyWeapons: string;

	// Players
	PlayerName: string;
	PlayerCharacterName: string;
	PlayerPreferredNameType: string;
	PlayerServer: string;
	PlayerShip: string;
	PlayerFlag: string;
	PlayerNameEffectType: string;
	PlayerNameColor1: string;
	PlayerNameColor2: string;

	// Submitter
	SubmitterName: string;
	SubmitterCharacterName: string;
	SubmitterPreferredNameType: string;
	SubmitterServer: string;
	SubmitterShip: string;
	SubmitterFlag: string;
	SubmitterNameEffectType: string;
	SubmitterNameColor1: string;
	SubmitterNameColor2: string;
}

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
		run.${runsDbFields.DateApproved} AS ${getRunDbFields.RunDateApproved},
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
		rp.${runPartyDbFields.Weapons} AS ${getRunDbFields.PartyWeapons},

		pi.PlayerName AS ${getRunDbFields.PlayerName},
		pi.CharacterName AS ${getRunDbFields.PlayerCharacterName},
		pc.PreferredName AS ${getRunDbFields.PlayerPreferredNameType},
		pc.Server AS ${getRunDbFields.PlayerServer},
		pc.Ship AS ${getRunDbFields.PlayerShip},
		pc.Flag AS ${getRunDbFields.PlayerFlag},
		pc.NameType AS ${getRunDbFields.PlayerNameEffectType},
		pc.NameColor1 AS ${getRunDbFields.PlayerNameColor1},
		pc.NameColor2 AS ${getRunDbFields.PlayerNameColor2},

		si.PlayerName AS ${getRunDbFields.SubmitterName},
		si.CharacterName AS ${getRunDbFields.SubmitterCharacterName},
		sc.PreferredName AS ${getRunDbFields.SubmitterPreferredNameType},
		sc.Server AS ${getRunDbFields.SubmitterServer},
		sc.Ship AS ${getRunDbFields.SubmitterShip},
		sc.Flag AS ${getRunDbFields.SubmitterFlag},
		sc.NameType AS ${getRunDbFields.SubmitterNameEffectType},
		sc.NameColor1 AS ${getRunDbFields.SubmitterNameColor1},
		sc.NameColor2 AS ${getRunDbFields.SubmitterNameColor2}

	FROM dbo.Runs AS run
	INNER JOIN 
	dbo.RunParty AS rp ON rp.${runPartyDbFields.RunId} = run.${runsDbFields.Id}  

	LEFT JOIN
	Players.Information AS pi ON pi.PlayerID = rp.${runPartyDbFields.PlayerId} 
	LEFT JOIN 
	Players.Customization AS pc ON pc.PlayerID = rp.${runPartyDbFields.PlayerId} 

	INNER JOIN
	Players.Information AS si ON run.${runsDbFields.SubmitterId} = si.PlayerID
	INNER JOIN
	Players.Customization AS sc ON run.${runsDbFields.SubmitterId} = sc.PlayerID

	WHERE 1=1
`;

export const getRunById = async (
	request: Request,
	runId: number,
	approved: boolean = true
): Promise<GetRunDbModel | undefined> => {
	let query = RunQuery;

	query += ` AND run.${runsDbFields.SubmissionStatus} = @approved`;
	request = request.input('approved', sql.TinyInt, approved);

	query += ` AND run.${runsDbFields.Id} = @runId`;
	request = request.input('runId', sql.Int, runId);

	const results = await request.query(query);
	const runs = results.recordset as GetRunDbModel[];
	return runs[0];
};

export const getRuns = async (
	request: Request,
	filters: RunsSearchFilter,
	approved: boolean,
	attributeFilters?: RunAttributeFilter[]
) => {
	let query = RunQuery;

	if (approved !== undefined && approved !== null) {
		const approvedInt = approved ? 1 : 0;
		query += ` AND run.${runsDbFields.SubmissionStatus} = @approved`;
		request = request.input('approved', sql.TinyInt, approvedInt);
	}

	if (filters.class) {
		const mappedClass = mapNgsClassToDbVal(filters.class);
		query += ` AND rp.${runPartyDbFields.MainClass} = @class`;
		request = request.input('class', sql.NVarChar, mappedClass);
	}

	if (filters.quest) {
		query += ` AND run.${runsDbFields.Quest} = @quest`;
		request = request.input('quest', sql.NVarChar, filters.quest);
	}

	if (filters.category) {
		query += ` AND run.${runsDbFields.Category} = @category`;
		request = request.input('category', sql.NVarChar, filters.category);
	}

	if (filters.rank) {
		query += ` AND run.${runsDbFields.QuestRank} = @rank`;
		request = request.input('rank', sql.TinyInt, filters.rank);
	}

	if (filters.server) {
		query += ` AND run.${runsDbFields.ServerRegion} = @server`;
		request = request.input('server', sql.NVarChar, filters.server);
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

	if (filters.partySize !== undefined && filters.partySize !== null) {
		if (filters.partySize >= 3) {
			//TODO temporary support for 3 player runs
			query += ` AND run.${runsDbFields.PartySize} >= @partySize`;
			request = request.input('partySize', sql.TinyInt, filters.partySize);
		} else {
			query += ` AND run.${runsDbFields.PartySize} = @partySize`;
			request = request.input('partySize', sql.TinyInt, filters.partySize);
		}
	}

	if (filters.partySize && filters.take) {
		request = request.input('take', sql.Int, filters.take * filters.partySize);
	} else {
		request = request.input('take', sql.Int, 30000);
	}

	if (filters.partySize && filters.page && filters.take) {
		request = request.input('offset', sql.Int, filters.page * filters.take * filters.partySize);
	} else {
		request = request.input('offset', sql.Int, 0);
	}

	if (filters.sort === 'recent') {
		query += ` ORDER BY run.${runsDbFields.SubmissionDate} DESC`;
	} else {
		// Ranking sort order
		query += ` ORDER BY run.${runsDbFields.RunTime} ASC, run.${runsDbFields.SubmissionDate} ASC`;
	}

	query += ` OFFSET @offset ROWS FETCH NEXT @take ROWS ONLY`;

	const results = await request.query(query);
	return results.recordset as GetRunDbModel[];
};

export const insertRun = async (
	transaction: sql.Transaction,
	game: GameDbValue,
	run: RunSubmissionRequest,
	submitterId: number
) => {
	const request = transaction.request();

	const serverRegion = mapServerRegionToDbVal(run.serverRegion);
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
		.input('submissionStatus', sql.TinyInt, SubmissionStatusDbValue.AwaitingApproval)
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
      ${runsDbFields.DateApproved},
      ${runsDbFields.ModNotes},
      ${runsDbFields.Attributes})
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
      @attributes)
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
	partyMembers: RunSubmissionRequest['party']
) => {
	let partyInsertRequest = request;
	const insertValueRows: string[] = [];
	partyMembers.forEach((member, i) => {
		// Transform request
		const normalizedPovLink = member.povLink ? normalizeYoutubeLink(member.povLink) : null;
		const weapons = member.weapons.map((w) => mapWeaponToDbVal(w)!);
		const mainClass = mapNgsClassToDbVal(member.mainClass);
		const subClass = mapNgsClassToDbVal(member.subClass);

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
    INSERT INTO dbo.RunParty (
      ${runPartyDbFields.RunId},
      ${runPartyDbFields.PlayerId},
      ${runPartyDbFields.Ordinal},
      ${runPartyDbFields.PovLink},
      ${runPartyDbFields.RunCharacterName},
      ${runPartyDbFields.MainClass},
      ${runPartyDbFields.SubClass},
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
		submitterId: submission?.SubmitterId
	};
};

export const approveRun = async (
	request: Request,
	runId: number,
	modNotes: string | null | undefined
) => {
	const submissionResult = await request
		.input('approveStatus', sql.TinyInt, SubmissionStatusDbValue.Approved)
		.input('approvalDate', sql.DateTime2, new Date())
		.input('modNotes', sql.NVarChar(500), modNotes)
		.input('runId', sql.Int, runId).query(`
      UPDATE dbo.Runs
      SET 
				${runsDbFields.SubmissionStatus} = @approveStatus,
				${runsDbFields.DateApproved} = @approvalDate,
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
	modNotes: string | null | undefined
) => {
	const submissionResult = await request
		.input('denyStatus', sql.TinyInt, SubmissionStatusDbValue.Rejected)
		.input('modNotes', sql.NVarChar(500), modNotes)
		.input('runId', sql.Int, runId).query(`
      UPDATE dbo.Runs
			SET 
				${runsDbFields.SubmissionStatus} = @denyStatus,
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
			request = request.input(paramName, sql.NVarChar, f.value);
		} else {
			throw new Error('Unknown attribute type');
		}
	});

	return {
		request: request,
		query: queryString
	};
};
