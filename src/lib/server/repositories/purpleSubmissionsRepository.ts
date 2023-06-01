import sql, { type Request } from 'mssql';
import type { PurpleSoloDbModel } from '$lib/server/types/db/submissions/purple/purpleSolo';
import type { PurpleDuoDbModel } from '$lib/server/types/db/submissions/purple/purpleDuo';
import type { PurplePartyDbModel } from '$lib/server/types/db/submissions/purple/purpleParty';
import { fields } from '../util/nameof';
import type { ApproveRequest, DenyRequest } from '../types/validation/submissions';
import type { PurpleSubmissionRequest } from '../types/validation/purpleSubmissions';
import { CurrentSubmissionPatchCode } from '$lib/constants/patchCodes';

const purplePartyDbFields = fields<PurplePartyDbModel>();
const purpleDuoDbFields = fields<PurpleDuoDbModel>();
const purpleSoloDbFields = fields<PurpleSoloDbModel>();

export const getPurplePartySubmissions = async (request: Request) => {
	const sqlQuery = `
        
  SELECT
  submit.${purplePartyDbFields.RunID}, 
  submit.${purplePartyDbFields.P1PlayerID}, 
  submit.${purplePartyDbFields.P2PlayerID}, 
  submit.${purplePartyDbFields.P3PlayerID}, 
  submit.${purplePartyDbFields.P4PlayerID}, 
  submit.${purplePartyDbFields.P1RunCharacter}, 
  submit.${purplePartyDbFields.P2RunCharacter}, 
  submit.${purplePartyDbFields.P3RunCharacter}, 
  submit.${purplePartyDbFields.P4RunCharacter}, 
  submit.${purplePartyDbFields.Patch}, 
  submit.${purplePartyDbFields.Region}, 
  submit.${purplePartyDbFields.Rank}, 
  submit.${purplePartyDbFields.Time}, 
  submit.${purplePartyDbFields.P1MainClass}, 
  submit.${purplePartyDbFields.P2MainClass}, 
  submit.${purplePartyDbFields.P3MainClass}, 
  submit.${purplePartyDbFields.P4MainClass}, 
  submit.${purplePartyDbFields.P1SubClass}, 
  submit.${purplePartyDbFields.P2SubClass}, 
  submit.${purplePartyDbFields.P3SubClass}, 
  submit.${purplePartyDbFields.P4SubClass}, 
  submit.${purplePartyDbFields.PartySize},
  submit.${purplePartyDbFields.P1Link}, 
  submit.${purplePartyDbFields.P2Link}, 
  submit.${purplePartyDbFields.P3Link}, 
  submit.${purplePartyDbFields.P4Link}, 
  submit.${purplePartyDbFields.Notes}, 
  submit.${purplePartyDbFields.SubmissionTime}, 
  submit.${purplePartyDbFields.SubmitterID},
  submit.${purplePartyDbFields.ServerID},

  pi1.PlayerName as ${purplePartyDbFields.P1PlayerName},
  pi1.CharacterName as ${purplePartyDbFields.P1PlayerCName},
  pc1.NameType as ${purplePartyDbFields.P1PlayerNameType},
  pc1.NameColor1 as ${purplePartyDbFields.P1PlayerNameColor1},
  pc1.NameColor2 as ${purplePartyDbFields.P1PlayerNameColor2},
  pc1.Server as ${purplePartyDbFields.P1PlayerServer},
  pc1.PreferredName as ${purplePartyDbFields.P1PlayerPrefN},

  pi2.PlayerName as ${purplePartyDbFields.P2PlayerName},
  pi2.CharacterName as ${purplePartyDbFields.P2PlayerCName},
  pc2.NameType as ${purplePartyDbFields.P2PlayerNameType},
  pc2.NameColor1 as ${purplePartyDbFields.P2PlayerNameColor1},
  pc2.NameColor2 as ${purplePartyDbFields.P2PlayerNameColor2},
  pc2.Server as ${purplePartyDbFields.P2PlayerServer},
  pc2.PreferredName as ${purplePartyDbFields.P2PlayerPrefN},

  pi3.PlayerName as ${purplePartyDbFields.P3PlayerName},
  pi3.CharacterName as ${purplePartyDbFields.P3PlayerCName},
  pc3.NameType as ${purplePartyDbFields.P3PlayerNameType},
  pc3.NameColor1 as ${purplePartyDbFields.P3PlayerNameColor1},
  pc3.NameColor2 as ${purplePartyDbFields.P3PlayerNameColor2},
  pc3.Server as ${purplePartyDbFields.P3PlayerServer},
  pc3.PreferredName as ${purplePartyDbFields.P3PlayerPrefN},

  pi4.PlayerName as ${purplePartyDbFields.P4PlayerName},
  pi4.CharacterName as ${purplePartyDbFields.P4PlayerCName},
  pc4.NameType as ${purplePartyDbFields.P4PlayerNameType},
  pc4.NameColor1 as ${purplePartyDbFields.P4PlayerNameColor1},
  pc4.NameColor2 as ${purplePartyDbFields.P4PlayerNameColor2},
  pc4.Server as ${purplePartyDbFields.P4PlayerServer},
  pc4.PreferredName as ${purplePartyDbFields.P4PlayerPrefN},

  si.PlayerName as ${purplePartyDbFields.SubmitterName},
  si.CharacterName as ${purplePartyDbFields.SubmitterCName},
  sc.NameType as ${purplePartyDbFields.SubmitterNameType},
  sc.NameColor1 as ${purplePartyDbFields.SubmitterNameColor1},
  sc.NameColor2 as ${purplePartyDbFields.SubmitterNameColor2},
  sc.PreferredName as ${purplePartyDbFields.SubmitterPrefN}

  FROM Submissions.Party AS submit
      
  INNER JOIN
  Players.Information AS pi1 ON submit.${purplePartyDbFields.P1PlayerID} = pi1.PlayerID
  INNER JOIN
  Players.Information AS pi2 ON submit.${purplePartyDbFields.P2PlayerID} = pi2.PlayerID
  INNER JOIN
  Players.Information AS pi3 ON submit.${purplePartyDbFields.P3PlayerID} = pi3.PlayerID
  INNER JOIN
  Players.Information AS pi4 ON submit.${purplePartyDbFields.P4PlayerID} = pi4.PlayerID

  INNER JOIN
  Players.Customization AS pc1 ON submit.${purplePartyDbFields.P1PlayerID} = pc1.PlayerID
  INNER JOIN
  Players.Customization AS pc2 ON submit.${purplePartyDbFields.P2PlayerID} = pc2.PlayerID
  INNER JOIN
  Players.Customization AS pc3 ON submit.${purplePartyDbFields.P3PlayerID} = pc3.PlayerID
  INNER JOIN
  Players.Customization AS pc4 ON submit.${purplePartyDbFields.P4PlayerID} = pc4.PlayerID

  INNER JOIN
  Players.Information AS si ON submit.${purplePartyDbFields.SubmitterID} = si.PlayerID

  INNER JOIN
  Players.Customization AS sc ON submit.${purplePartyDbFields.SubmitterID} = sc.PlayerID

  WHERE ${purplePartyDbFields.SubmissionStatus} = 0
  AND
  ${purplePartyDbFields.PartySize} = 4

  ORDER BY SubmissionTime DESC`;

	const results = await request.query(sqlQuery);
	const ret = results.recordset as PurplePartyDbModel[];

	return ret;
};

export const getPurpleDuoSubmissions = async (request: Request) => {
	const sqlQuery = `
            
  SELECT
  submit.${purpleDuoDbFields.RunID}, 
  submit.${purpleDuoDbFields.P1PlayerID}, 
  submit.${purpleDuoDbFields.P2PlayerID}, 
  submit.${purpleDuoDbFields.P1RunCharacter}, 
  submit.${purpleDuoDbFields.P2RunCharacter}, 
  submit.${purpleDuoDbFields.Patch}, 
  submit.${purpleDuoDbFields.Region}, 
  submit.${purpleDuoDbFields.Rank}, 
  submit.${purpleDuoDbFields.Time}, 
  submit.${purpleDuoDbFields.P1MainClass}, 
  submit.${purpleDuoDbFields.P2MainClass}, 
  submit.${purpleDuoDbFields.P1SubClass}, 
  submit.${purpleDuoDbFields.P2SubClass}, 
  submit.${purpleDuoDbFields.PartySize},
  submit.${purpleDuoDbFields.P1Link}, 
  submit.${purpleDuoDbFields.P2Link}, 
  submit.${purpleDuoDbFields.Notes}, 
  submit.${purpleDuoDbFields.SubmissionTime}, 
  submit.${purpleDuoDbFields.SubmitterID},
  submit.${purpleDuoDbFields.ServerID},

  pi1.PlayerName as ${purpleDuoDbFields.P1PlayerName},
  pi1.CharacterName as ${purpleDuoDbFields.P1PlayerCName},
  pc1.NameType as ${purpleDuoDbFields.P1PlayerNameType},
  pc1.NameColor1 as ${purpleDuoDbFields.P1PlayerNameColor1},
  pc1.NameColor2 as ${purpleDuoDbFields.P1PlayerNameColor2},
  pc1.Server as ${purpleDuoDbFields.P1PlayerServer},
  pc1.PreferredName as ${purpleDuoDbFields.P1PlayerPrefN},

  pi2.PlayerName as ${purpleDuoDbFields.P2PlayerName},
  pi2.CharacterName as ${purpleDuoDbFields.P2PlayerCName},
  pc2.NameType as ${purpleDuoDbFields.P2PlayerNameType},
  pc2.NameColor1 as ${purpleDuoDbFields.P2PlayerNameColor1},
  pc2.NameColor2 as ${purpleDuoDbFields.P2PlayerNameColor2},
  pc2.Server as ${purpleDuoDbFields.P2PlayerServer},
  pc2.PreferredName as ${purpleDuoDbFields.P2PlayerPrefN},

  si.PlayerName as ${purpleDuoDbFields.SubmitterName},
  si.CharacterName as ${purpleDuoDbFields.SubmitterCName},
  sc.NameType as ${purpleDuoDbFields.SubmitterNameType},
  sc.NameColor1 as ${purpleDuoDbFields.SubmitterNameColor1},
  sc.NameColor2 as ${purpleDuoDbFields.SubmitterNameColor2},
  sc.PreferredName as ${purpleDuoDbFields.SubmitterPrefN}

  FROM Submissions.Party AS submit
      
  INNER JOIN
  Players.Information AS pi1 ON submit.${purpleDuoDbFields.P1PlayerID} = pi1.PlayerID
  INNER JOIN
  Players.Information AS pi2 ON submit.${purpleDuoDbFields.P2PlayerID} = pi2.PlayerID


  INNER JOIN
  Players.Customization AS pc1 ON submit.${purpleDuoDbFields.P1PlayerID} = pc1.PlayerID
  INNER JOIN
  Players.Customization AS pc2 ON submit.${purpleDuoDbFields.P2PlayerID} = pc2.PlayerID

  INNER JOIN
  Players.Information AS si ON submit.${purpleDuoDbFields.SubmitterID} = si.PlayerID

  INNER JOIN
  Players.Customization AS sc ON submit.${purpleDuoDbFields.SubmitterID} = sc.PlayerID

  WHERE ${purpleDuoDbFields.SubmissionStatus} = 0
  AND
  ${purpleDuoDbFields.PartySize} = 2

  ORDER BY SubmissionTime DESC`;

	const results = await request.query(sqlQuery);
	const ret = results.recordset as PurpleDuoDbModel[];

	return ret;
};

export const getPurpleSoloSubmissions = async (request: Request) => {
	const sqlQuery = `
        
  SELECT
  submit.${purpleSoloDbFields.RunID}, 
  submit.${purpleSoloDbFields.PlayerID}, 
  submit.${purpleSoloDbFields.RunCharacter}, 
  submit.${purpleSoloDbFields.Patch}, 
  submit.${purpleSoloDbFields.Region}, 
  submit.${purpleSoloDbFields.Rank}, 
  submit.${purpleSoloDbFields.Time}, 
  submit.${purpleSoloDbFields.MainClass}, 
  submit.${purpleSoloDbFields.SubClass}, 
  submit.${purpleSoloDbFields.W1},
  submit.${purpleSoloDbFields.W2},
  submit.${purpleSoloDbFields.W3},
  submit.${purpleSoloDbFields.W4},
  submit.${purpleSoloDbFields.W5},
  submit.${purpleSoloDbFields.W6},
  submit.${purpleSoloDbFields.Link}, 
  submit.${purpleSoloDbFields.Notes}, 
  submit.${purpleSoloDbFields.SubmissionTime}, 
  submit.${purpleSoloDbFields.SubmitterID},

  pi.PlayerName as ${purpleSoloDbFields.PlayerName},
  pi.CharacterName as ${purpleSoloDbFields.PlayerCName},
  pc.NameType as ${purpleSoloDbFields.PlayerNameType},
  pc.NameColor1 as ${purpleSoloDbFields.PlayerNameColor1},
  pc.NameColor2 as ${purpleSoloDbFields.PlayerNameColor2},
  pc.Server as ${purpleSoloDbFields.PlayerServer},
  pc.PreferredName as ${purpleSoloDbFields.PlayerPrefN},

  si.PlayerName as ${purpleSoloDbFields.SubmitterName},
  si.CharacterName as ${purpleSoloDbFields.SubmitterCName},
  sc.NameType as ${purpleSoloDbFields.SubmitterNameType},
  sc.NameColor1 as ${purpleSoloDbFields.SubmitterNameColor1},
  sc.NameColor2 as ${purpleSoloDbFields.SubmitterNameColor2},
  sc.PreferredName as ${purpleSoloDbFields.SubmitterPrefN}

  FROM Submissions.Pending AS submit
      
  INNER JOIN

  Players.Information AS pi ON submit.${purpleSoloDbFields.PlayerID} = pi.PlayerID

  INNER JOIN
  Players.Customization AS pc ON submit.${purpleSoloDbFields.PlayerID} = pc.PlayerID

  INNER JOIN
  Players.Information AS si ON submit.${purpleSoloDbFields.SubmitterID} = si.PlayerID

  INNER JOIN
  Players.Customization AS sc ON submit.${purpleSoloDbFields.SubmitterID} = sc.PlayerID

  WHERE ${purpleSoloDbFields.SubmissionStatus} = 0

  ORDER BY SubmissionTime DESC`;

	const results = await request.query(sqlQuery);
	const ret = results.recordset as PurpleSoloDbModel[];

	return ret;
};

export const approvePurpleSolo = async (transaction: sql.Transaction, run: ApproveRequest) => {
	const request = transaction.request();
	request.input('modNotes', sql.NVarChar, run.modNotes).input('submissionId', sql.Int, run.runId);

	// Add run data to runs table
	const runInsertResult = await request.query(`
    INSERT INTO Purples.Solo (PlayerID,RunCharacterName,Patch,Region,Rank,Time,MainClass,SubClass,WeaponInfo1,WeaponInfo2,WeaponInfo3,WeaponInfo4,WeaponInfo5,WeaponInfo6,Link,Notes,SubmissionTime,SubmitterID,ModNotes)
    SELECT PlayerID,RunCharacter,Patch,Region,Rank,Time,MainClass,SubClass,W1,W2,W3,W4,W5,W6,Link,Notes,SubmissionTime,SubmitterID,@modNotes
    FROM Submissions.Pending
		WHERE Submissions.Pending.${purpleSoloDbFields.RunID}= @submissionId;
  `);
	if (runInsertResult.rowsAffected[0] == 0) {
		throw Error(`Purple Solo insertion failed.`);
	}

	// Update Submission
	const submissionResult = await request.query(`
    UPDATE Submissions.Pending
    SET ${purpleSoloDbFields.SubmissionStatus} = 1
    WHERE ${purpleSoloDbFields.RunID} = @submissionId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Purple solo approval failed.`);
	}
};

export const getPurpleSoloExists = async (request: Request, runId: number) => {
	// Run exists
	const submissionResults = await request.input('submissionId', sql.Int, runId).query(`
    SELECT 
      ${purpleSoloDbFields.RunID}, 
      ${purpleSoloDbFields.SubmissionStatus}, 
      ${purpleSoloDbFields.PlayerID}
    FROM Submissions.Pending
    WHERE ${purpleSoloDbFields.RunID} = @submissionId;
		`);

	if (Array.from(submissionResults.recordset).length == 0) {
		return undefined;
	}
	const submission = submissionResults.recordset[0] as PurpleSoloDbModel;
	return {
		SubmissionId: submission.RunID,
		SubmissionStatus: submission.SubmissionStatus,
		PlayerId: submission.PlayerID
	};
};

export const approvePurpleDuo = async (transaction: sql.Transaction, run: ApproveRequest) => {
	const request = transaction.request();
	request.input('modNotes', sql.NVarChar, run.modNotes).input('submissionId', sql.Int, run.runId);

	// Add run data to runs table
	const runInsertResult = await request.query(`
    INSERT INTO Purples.Party (PartySize,Patch,Region,Rank,Time,Notes,RunServer,SubmissionTime,SubmitterID,ModNotes)
    SELECT PartySize,Patch,Region,Rank,Time,Notes,ServerID,SubmissionTime,SubmitterID,@modNotes
    FROM Submissions.Party
		WHERE Submissions.Party.${purplePartyDbFields.RunID} = @submissionId;
    SELECT SCOPE_IDENTITY() AS LastID;
  `);
	if (runInsertResult.rowsAffected[0] == 0) {
		throw Error(`Purple Duo insertion failed.`);
	}

	// Add player info
	const insertedRunId = parseInt(runInsertResult.recordset[0].LastID);
	request.input('insertedRunId', sql.Int, insertedRunId);

	const player1InsertResult = await request.query(`
    INSERT INTO Purples.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P1PlayerID,P1RunCharacter,P1MainClass,P1SubClass,P1Link
    FROM Submissions.Party
    WHERE Submissions.Party.${purplePartyDbFields.RunID} = @submissionId;
  `);
	if (player1InsertResult.rowsAffected[0] == 0) {
		throw Error(`Purple Duo player 1 insertion failed.`);
	}
	const player2InsertResult = await request.query(`
    INSERT INTO Purples.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P2PlayerID,P2RunCharacter,P2MainClass,P2SubClass,P2Link
    FROM Submissions.Party
    WHERE Submissions.Party.${purplePartyDbFields.RunID} = @submissionId;
  `);
	if (player2InsertResult.rowsAffected[0] == 0) {
		throw Error(`Purple Duo player 2 insertion failed.`);
	}

	// Update Submission
	const submissionResult = await request.query(`
    UPDATE Submissions.Party
    SET ${purplePartyDbFields.SubmissionStatus} = 1
    WHERE ${purplePartyDbFields.RunID} = @submissionId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Purple Duo approval failed.`);
	}
};

export const getPurpleDuoExists = async (request: Request, runId: number) =>
	getPurplePartyExists(request, runId);

export const approvePurpleParty = async (transaction: sql.Transaction, run: ApproveRequest) => {
	const request = transaction.request();
	request.input('modNotes', sql.NVarChar, run.modNotes).input('submissionId', sql.Int, run.runId);

	// Add run data to runs table
	const runInsertResult = await request.query(`
    INSERT INTO Purples.Party (PartySize,Patch,Region,Rank,Time,Notes,RunServer,SubmissionTime,SubmitterID,ModNotes)
    SELECT PartySize,Patch,Region,Rank,Time,Notes,ServerID,SubmissionTime,SubmitterID,@modNotes
    FROM Submissions.Party
		WHERE Submissions.Party.${purplePartyDbFields.RunID} = @submissionId;
    SELECT SCOPE_IDENTITY() AS LastID;
  `);
	if (runInsertResult.rowsAffected[0] == 0) {
		throw Error(`Purple Party insertion failed.`);
	}

	// Add player info
	const insertedRunId = parseInt(runInsertResult.recordset[0].LastID);
	request.input('insertedRunId', sql.Int, insertedRunId);

	const player1InsertResult = await request.query(`
    INSERT INTO Purples.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P1PlayerID,P1RunCharacter,P1MainClass,P1SubClass,P1Link
    FROM Submissions.Party
    WHERE Submissions.Party.${purplePartyDbFields.RunID} = @submissionId;
  `);
	if (player1InsertResult.rowsAffected[0] == 0) {
		throw Error(`Purple Party player 1 insertion failed.`);
	}
	const player2InsertResult = await request.query(`
    INSERT INTO Purples.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P2PlayerID,P2RunCharacter,P2MainClass,P2SubClass,P2Link
    FROM Submissions.Party
    WHERE Submissions.Party.${purplePartyDbFields.RunID} = @submissionId;
  `);
	if (player2InsertResult.rowsAffected[0] == 0) {
		throw Error(`Purple Party player 2 insertion failed.`);
	}
	const player3InsertResult = await request.query(`
    INSERT INTO Purples.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P3PlayerID,P3RunCharacter,P3MainClass,P3SubClass,P3Link
    FROM Submissions.Party
    WHERE Submissions.Party.${purplePartyDbFields.RunID} = @submissionId;
  `);
	if (player3InsertResult.rowsAffected[0] == 0) {
		throw Error(`Purple Party player 3 insertion failed.`);
	}
	const player4InsertResult = await request.query(`
    INSERT INTO Purples.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P4PlayerID,P4RunCharacter,P4MainClass,P4SubClass,P4Link
    FROM Submissions.Party
    WHERE Submissions.Party.${purplePartyDbFields.RunID} = @submissionId;
  `);
	if (player4InsertResult.rowsAffected[0] == 0) {
		throw Error(`Purple Party player 4 insertion failed.`);
	}

	// Update Submission
	const submissionResult = await request.query(`
    UPDATE Submissions.Party
    SET ${purplePartyDbFields.SubmissionStatus} = 1
    WHERE ${purplePartyDbFields.RunID} = @submissionId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Purple party approval failed.`);
	}
};

export const getPurplePartyExists = async (request: Request, runId: number) => {
	// Run exists
	const submissionResults = await request.input('submissionId', sql.Int, runId).query(`
    SELECT
      ${purplePartyDbFields.RunID},
      ${purplePartyDbFields.SubmissionStatus},
      ${purplePartyDbFields.P1PlayerID}
    FROM Submissions.Party
    WHERE ${purplePartyDbFields.RunID} = @submissionId;
		`);

	if (Array.from(submissionResults.recordset).length == 0) {
		return undefined;
	}
	const submission = submissionResults.recordset[0] as PurplePartyDbModel;
	return {
		SubmissionId: submission.RunID,
		SubmissionStatus: submission.SubmissionStatus,
		PlayerId: submission.P1PlayerID
	};
};

export const denyPurpleSolo = async (request: sql.Request, run: DenyRequest) => {
	const result = await request
		.input('submissionId', sql.Int, run.runId)
		.input('modNotes', sql.NVarChar, run.modNotes).query(`
      UPDATE Submissions.Pending
      SET ${purpleSoloDbFields.SubmissionStatus} = 1
      WHERE ${purpleSoloDbFields.RunID} = @submissionId;
  `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Purple Solo Run denial failed.`);
	}
};

export const denyPurpleDuo = async (request: sql.Request, run: DenyRequest) => {
	const result = await request
		.input('submissionId', sql.Int, run.runId)
		.input('modNotes', sql.NVarChar, run.modNotes).query(`
      UPDATE Submissions.Party
      SET ${purplePartyDbFields.SubmissionStatus} = 1
      WHERE ${purplePartyDbFields.RunID} = @submissionId AND ${purplePartyDbFields.PartySize} = 2;
  `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Purple Duo Run denial failed.`);
	}
};

export const denyPurpleParty = async (request: sql.Request, run: DenyRequest) => {
	const result = await request
		.input('submissionId', sql.Int, run.runId)
		.input('modNotes', sql.NVarChar, run.modNotes).query(`
      UPDATE Submissions.Party
      SET ${purplePartyDbFields.SubmissionStatus} = 1
      WHERE ${purplePartyDbFields.RunID} = @submissionId AND ${purplePartyDbFields.PartySize} = 4;
  `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Purple Party Run denial failed.`);
	}
};

export const checkPurpleVideoExists = async (request: sql.Request, videoLinks: string[]) => {
	let videoLinkRequest = request;

	const paramNames: string[] = [];
	videoLinks.forEach((l, i) => {
		const paramName = `link${i}`;
		paramNames.push(paramName);
		videoLinkRequest = videoLinkRequest.input(paramName, l);
	});

	const paramList = paramNames.map((p) => `@${p}`);
	const videoLinksResults = await videoLinkRequest.query(`
    SELECT ${purpleSoloDbFields.Link} 
			FROM Submissions.Pending 
			WHERE ${purpleSoloDbFields.Link} IN (${paramList.join(',')})
		UNION
		SELECT ${purplePartyDbFields.P1Link}
			FROM Submissions.Party
			WHERE ${purplePartyDbFields.P1Link} IN (${paramList.join(',')})
		UNION
		SELECT ${purplePartyDbFields.P2Link}
			FROM Submissions.Party
			WHERE ${purplePartyDbFields.P2Link} IN (${paramList.join(',')})
		UNION
		SELECT ${purplePartyDbFields.P3Link}
			FROM Submissions.Party
			WHERE ${purplePartyDbFields.P3Link} IN (${paramList.join(',')})
		UNION
		SELECT ${purplePartyDbFields.P4Link}
			FROM Submissions.Party
			WHERE ${purplePartyDbFields.P4Link} IN (${paramList.join(',')});`);

	return videoLinksResults.recordset.length > 0
		? videoLinksResults.recordset.map((r) => r.Link as string)
		: [];
};

export const insertPurpleSoloSubmission = async (
	request: sql.Request,
	run: PurpleSubmissionRequest
) => {
	const player1 = run.players[0];

	const runTime = serializeTimeToSqlTime(run.time);

	const submissionTime = new Date();

	let insertRequest = request
		.input('playerID', sql.Int, player1.playerId)
		.input('runCharacter', sql.NVarChar, player1.inVideoName)
		.input('patch', sql.NVarChar, CurrentSubmissionPatchCode)
		.input('region', sql.NVarChar, run.region)
		.input('rank', sql.Int, run.rank)
		.input('time', sql.NVarChar, runTime)
		.input('mainClass', sql.NVarChar, player1.mainClass)
		.input('subClass', sql.NVarChar, player1.subClass)
		.input('link', sql.NVarChar, player1.povVideoLink)
		.input('notes', sql.NVarChar, run.notes)
		.input('submissionTime', sql.DateTime, submissionTime)
		.input('submitterID', sql.Int, player1.playerId)
		.input('w1', sql.NVarChar, player1.weapons[0])
		.input('w2', sql.NVarChar, player1.weapons[1])
		.input('w3', sql.NVarChar, player1.weapons[2])
		.input('w4', sql.NVarChar, player1.weapons[3])
		.input('w5', sql.NVarChar, player1.weapons[4])
		.input('w6', sql.NVarChar, player1.weapons[5]);

	const dbFields = purpleSoloDbFields;
	const result = await insertRequest.query(
		`INSERT INTO 
		 Submissions.Pending (${dbFields.PlayerID},${dbFields.RunCharacter},${dbFields.Patch},${dbFields.Region},${dbFields.Rank},${dbFields.Time},${dbFields.MainClass},${dbFields.SubClass},${dbFields.W1},${dbFields.W2},${dbFields.W3},${dbFields.W4},${dbFields.W5},${dbFields.W6},${dbFields.Link},${dbFields.Notes},${dbFields.SubmissionTime},${dbFields.SubmitterID})
		 VALUES (@playerID,@runCharacter,@patch,@region,@rank,@time,@mainClass,@subClass,@w1,@w2,@w3,@w4,@w5,@w6,@link,@notes,@submissionTime,@submitterID);
		`
	);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Purple Solo Run insertion failed. Submission from ${run.username}`);
	}
};

export const insertPurplePartySubmission = async (
	request: sql.Request,
	run: PurpleSubmissionRequest
) => {
	const player1 = run.players[0];
	const player2 = run.players[1];
	const player3 = run.players[2];
	const player4 = run.players[3];

	const runTime = serializeTimeToSqlTime(run.time);

	const submissionTime = new Date();

	let insertRequest = request
		.input('patch', sql.NVarChar, CurrentSubmissionPatchCode)
		.input('region', sql.NVarChar, run.region)
		.input('rank', sql.Int, run.rank)
		.input('time', sql.NVarChar, runTime)
		.input('subtime', sql.DateTime, submissionTime)
		.input('subpid', sql.Int, player1.playerId)
		.input('serverid', sql.NVarChar, run.serverRegion)
		.input('notes', sql.NVarChar, run.notes)
		.input('partysize', sql.Int, run.players.length);

	insertRequest = insertRequest
		.input('p1pid', sql.Int, player1.playerId)
		.input('p1rc', sql.NVarChar, player1.inVideoName)
		.input('p1mc', sql.NVarChar, player1.mainClass)
		.input('p1sc', sql.NVarChar, player1.subClass)
		.input('p1link', sql.NVarChar, player1.povVideoLink);

	insertRequest = insertRequest
		.input('p2pid', sql.Int, player2.playerId)
		.input('p2rc', sql.NVarChar, player2.inVideoName)
		.input('p2mc', sql.NVarChar, player2.mainClass)
		.input('p2sc', sql.NVarChar, player2.subClass)
		.input('p2link', sql.NVarChar, player2.povVideoLink);

	insertRequest = insertRequest
		.input('p3pid', sql.Int, player3?.playerId)
		.input('p3rc', sql.NVarChar, player3?.inVideoName)
		.input('p3mc', sql.NVarChar, player3?.mainClass)
		.input('p3sc', sql.NVarChar, player3?.subClass)
		.input('p3link', sql.NVarChar, player3?.povVideoLink);

	insertRequest = insertRequest
		.input('p4pid', sql.Int, player4?.playerId)
		.input('p4rc', sql.NVarChar, player4?.inVideoName)
		.input('p4mc', sql.NVarChar, player4?.mainClass)
		.input('p4sc', sql.NVarChar, player4?.subClass)
		.input('p4link', sql.NVarChar, player4?.povVideoLink);

	const dbFields = purplePartyDbFields;
	const result = await insertRequest.query(
		`INSERT INTO 
     Submissions.Party (${dbFields.P1PlayerID},${dbFields.P2PlayerID},${dbFields.P3PlayerID},${dbFields.P4PlayerID},${dbFields.P1RunCharacter},${dbFields.P2RunCharacter},${dbFields.P3RunCharacter},${dbFields.P4RunCharacter},${dbFields.Patch},${dbFields.Region},${dbFields.Rank},${dbFields.Time},${dbFields.P1MainClass},${dbFields.P2MainClass},${dbFields.P3MainClass},${dbFields.P4MainClass},${dbFields.P1SubClass},${dbFields.P2SubClass},${dbFields.P3SubClass},${dbFields.P4SubClass},${dbFields.PartySize},${dbFields.P1Link},${dbFields.P2Link},${dbFields.P3Link},${dbFields.P4Link},${dbFields.Notes},${dbFields.SubmissionTime},${dbFields.SubmitterID},ServerID)
     VALUES (@p1pid,@p2pid,@p3pid,@p4pid,@p1rc,@p2rc,@p3rc,@p4rc,@patch,@region,@rank,@time,@p1mc,@p2mc,@p3mc,@p4mc,@p1sc,@p2sc,@p3sc,@p4sc,@partysize,@p1link,@p2link,@p3link,@p4link,@notes,@subtime,@subpid,@serverid);`
	);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Purple Party Run insertion failed. Submission from ${run.username}`);
	}
};

const serializeTimeToSqlTime = (runTime: PurpleSubmissionRequest['time']) =>
	`${runTime.minutes.toString().padStart(2)}:${runTime.seconds.toString().padStart(2)}:00`;
