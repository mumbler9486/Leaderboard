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
import { ServerRegion } from '$lib/types/api/serverRegions';

const runsDbFields = fields<RunDbModel>();
const runPartyDbFields = fields<RunPartyDbModel>();
const getRunDbFields = fields<GetRunDbModel>();

export interface RunSearchOptions {
	quest?: string;
	rank?: number;
	partySize?: number;
	mainClass?: string;
	attributes?: Record<string, string>;
}

export interface GetRunDbModel {
	// Run
	RunId: string;
	RunSubmitterId: string;
	RunQuest: string;
	RunCategory: string;
	RunServerRegion: string;
	RunPatch: string;
	RunRank: string;
	RunRunTime: string;
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
	PlayerNameType: string;
	PlayerNameColor1: string;
	PlayerNameColor2: string;

	// Submitter
	SubmitterName: string;
	SubmitterCharacterName: string;
	SubmitterPreferredNameType: string;
	SubmitterServer: string;
	SubmitterShip: string;
	SubmitterFlag: string;
	SubmitterNameType: string;
	SubmitterNameColor1: string;
	SubmitterNameColor2: string;
}

export const getRun = async (request: Request, filters: RunSearchOptions) => {
	let query = `
    SELECT 
      run.${runsDbFields.Id} AS ${getRunDbFields.RunId},
      run.${runsDbFields.SubmitterId} AS ${getRunDbFields.RunSubmitterId},
      run.${runsDbFields.Quest} AS ${getRunDbFields.RunQuest},
      run.${runsDbFields.Category} AS ${getRunDbFields.RunCategory},
      run.${runsDbFields.ServerRegion} AS ${getRunDbFields.RunServerRegion},
      run.${runsDbFields.Patch} AS ${getRunDbFields.RunPatch},
      run.${runsDbFields.Rank} AS ${getRunDbFields.RunRank},
      run.${runsDbFields.RunTime} AS ${getRunDbFields.RunRunTime},
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
      pc.NameType AS ${getRunDbFields.PlayerNameType},
      pc.NameColor1 AS ${getRunDbFields.PlayerNameColor1},
      pc.NameColor2 AS ${getRunDbFields.PlayerNameColor2},

      si.PlayerName AS ${getRunDbFields.SubmitterName},
      si.CharacterName AS ${getRunDbFields.SubmitterCharacterName},
      sc.PreferredName AS ${getRunDbFields.SubmitterPreferredNameType},
      sc.Server AS ${getRunDbFields.SubmitterServer},
      sc.Ship AS ${getRunDbFields.SubmitterShip},
      sc.Flag AS ${getRunDbFields.SubmitterFlag},
      sc.NameType AS ${getRunDbFields.SubmitterNameType},
      sc.NameColor1 AS ${getRunDbFields.SubmitterNameColor1},
      sc.NameColor2 AS ${getRunDbFields.SubmitterNameColor2}

    FROM dbo.Runs AS run
    INNER JOIN 
    dbo.RunParty AS rp ON rp.${runPartyDbFields.RunId} = run.${runsDbFields.Id}  

    INNER JOIN
    Players.Information AS pi ON pi.PlayerID = rp.${runPartyDbFields.PlayerId} 
    INNER JOIN 
    Players.Customization AS pc ON pc.PlayerID = rp.${runPartyDbFields.PlayerId} 

    INNER JOIN
    Players.Information AS si ON run.${runsDbFields.SubmitterId} = si.PlayerID
    INNER JOIN
    Players.Customization AS sc ON run.${runsDbFields.SubmitterId} = sc.PlayerID

    WHERE 1=1
  `;

	if (filters.quest) {
		query += ` AND ${getRunDbFields.RunQuest} = @quest`;
		request = request.input('quest', sql.NVarChar, filters.quest);
	}

	if (filters.rank) {
		query += ` AND ${getRunDbFields.RunRank} = @rank`;
		request = request.input('rank', sql.NVarChar, filters.rank);
	}

	if (filters.quest) {
		query += ` AND run.${runsDbFields.Quest} = @quest`;
		request = request.input('quest', sql.NVarChar, filters.quest);
	}

	const results = await request.query(query);
	return results.recordset as GetRunDbModel[];
};

export const insertRun = async (
	transaction: sql.Transaction,
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
		.input('quest', sql.NVarChar(50), run.quest)
		.input('category', sql.NVarChar(30), run.category)
		.input('serverRegion', sql.NVarChar(10), serverRegion)
		.input('patch', sql.NVarChar(30), run.patch)
		.input('rank', sql.TinyInt, run.rank)
		.input('runTime', sql.NVarChar, serializedRunTime)
		.input('notes', sql.NVarChar(500), run.notes)
		.input('submissionDate', sql.DateTime2, new Date())
		.input('submissionStatus', sql.TinyInt, SubmissionStatusDbValue.AwaitingApproval)
		.input('dateApproved', sql.DateTime2, null)
		.input('modNotes', sql.NVarChar(500), '')
		.input('attributes', sql.NVarChar(4000), runDetails);

	const runInsertResult = await insertRequest.query(`
    INSERT INTO dbo.Runs (
      ${runsDbFields.SubmitterId},
      ${runsDbFields.Quest},
      ${runsDbFields.Category},
      ${runsDbFields.ServerRegion},
      ${runsDbFields.Patch},
      ${runsDbFields.Rank},
      ${runsDbFields.RunTime},
      ${runsDbFields.Notes},
      ${runsDbFields.SubmissionDate},
      ${runsDbFields.SubmissionStatus},
      ${runsDbFields.DateApproved},
      ${runsDbFields.ModNotes},
      ${runsDbFields.Attributes})
    VALUES (
      @submitterId,
      @quest,
      @category,
      @serverRegion,
      @patch,
      @rank,
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

export const checkRunExists = async (request: sql.Request, videoLinks: string[]) => {
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

export const approveRun = async (request: Request, runId: number, modNotes: string) => {
	const submissionResult = await request
		.input('modNotes', sql.NVarChar(500), modNotes)
		.input('runId', sql.Int, runId).query(`
      UPDATE dbo.Runs
      SET ${runsDbFields.SubmissionStatus} = ${SubmissionStatusDbValue.Approved}, ${runsDbFields.ModNotes} = @modNotes
      WHERE ${runsDbFields.Id} = @runId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Run approval failed.`);
	}
};

export const denyRun = async (request: Request, runId: number, modNotes: string) => {
	const submissionResult = await request
		.input('modNotes', sql.NVarChar(500), modNotes)
		.input('runId', sql.Int, runId).query(`
      UPDATE dbo.Runs
      SET ${runsDbFields.SubmissionStatus} = ${SubmissionStatusDbValue.Rejected}, ${runsDbFields.ModNotes} = @modNotes
      WHERE ${runsDbFields.Id} = @runId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Run approval failed.`);
	}
};

const serializeTimeToSqlTime = (runTime: RunSubmissionRequest['time']) =>
	`${runTime.hours.toString().padStart(2)}:${runTime.minutes
		.toString()
		.padStart(2)}:${runTime.seconds.toString().padStart(2)}`;
