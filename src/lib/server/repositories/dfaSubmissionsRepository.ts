import type { DfaDuoDbModel } from '$lib/server/types/db/submissions/dfa/dfaDuo';
import type { DfaPartyDbModel } from '$lib/server/types/db/submissions/dfa/dfaParty';
import type { DfaSoloDbModel } from '$lib/server/types/db/submissions/dfa/dfaSolo';
import sql, { type Request } from 'mssql';
import { fields } from '../util/nameof';
import type { ApproveRequest, DenyRequest } from '../../types/api/validation/submissions';
import type { DfaSubmissionRequest } from '../../types/api/validation/dfAegisSubmission';
import { CurrentSubmissionPatchCode } from '$lib/constants/patchCodes';

const dfaPartyDbFields = fields<DfaPartyDbModel>();
const dfaDuoDbFields = fields<DfaDuoDbModel>();
const dfaSoloDbFields = fields<DfaSoloDbModel>();

export const getDfaPartySubmissions = async (request: Request) => {
	const sqlQuery = `
        
  SELECT
  submit.${dfaPartyDbFields.RunID}, 
  submit.${dfaPartyDbFields.P1PlayerID}, 
  submit.${dfaPartyDbFields.P2PlayerID}, 
  submit.${dfaPartyDbFields.P3PlayerID}, 
  submit.${dfaPartyDbFields.P4PlayerID}, 
  submit.${dfaPartyDbFields.P5PlayerID}, 
  submit.${dfaPartyDbFields.P6PlayerID}, 
  submit.${dfaPartyDbFields.P7PlayerID}, 
  submit.${dfaPartyDbFields.P8PlayerID}, 
  submit.${dfaPartyDbFields.P1RunCharacter}, 
  submit.${dfaPartyDbFields.P2RunCharacter}, 
  submit.${dfaPartyDbFields.P3RunCharacter}, 
  submit.${dfaPartyDbFields.P4RunCharacter}, 
  submit.${dfaPartyDbFields.P5RunCharacter}, 
  submit.${dfaPartyDbFields.P6RunCharacter}, 
  submit.${dfaPartyDbFields.P7RunCharacter}, 
  submit.${dfaPartyDbFields.P8RunCharacter}, 
  submit.${dfaPartyDbFields.Patch}, 
  submit.${dfaPartyDbFields.Drill}, 
  submit.${dfaPartyDbFields.Rank},
  submit.${dfaPartyDbFields.Buff}, 
  submit.${dfaPartyDbFields.Time}, 
  submit.${dfaPartyDbFields.P1MainClass}, 
  submit.${dfaPartyDbFields.P2MainClass}, 
  submit.${dfaPartyDbFields.P3MainClass}, 
  submit.${dfaPartyDbFields.P4MainClass}, 
  submit.${dfaPartyDbFields.P5MainClass}, 
  submit.${dfaPartyDbFields.P6MainClass}, 
  submit.${dfaPartyDbFields.P7MainClass}, 
  submit.${dfaPartyDbFields.P8MainClass}, 
  submit.${dfaPartyDbFields.P1SubClass}, 
  submit.${dfaPartyDbFields.P2SubClass}, 
  submit.${dfaPartyDbFields.P3SubClass}, 
  submit.${dfaPartyDbFields.P4SubClass}, 
  submit.${dfaPartyDbFields.P5SubClass}, 
  submit.${dfaPartyDbFields.P6SubClass}, 
  submit.${dfaPartyDbFields.P7SubClass}, 
  submit.${dfaPartyDbFields.P8SubClass}, 
  submit.${dfaPartyDbFields.PartySize},
  submit.${dfaPartyDbFields.P1Link}, 
  submit.${dfaPartyDbFields.P2Link}, 
  submit.${dfaPartyDbFields.P3Link}, 
  submit.${dfaPartyDbFields.P4Link}, 
  submit.${dfaPartyDbFields.P5Link}, 
  submit.${dfaPartyDbFields.P6Link}, 
  submit.${dfaPartyDbFields.P7Link}, 
  submit.${dfaPartyDbFields.P8Link}, 
  submit.${dfaPartyDbFields.Notes}, 
  submit.${dfaPartyDbFields.SubmissionTime}, 
  submit.${dfaPartyDbFields.SubmitterID},
  submit.${dfaPartyDbFields.ServerID},

  pi1.PlayerName as ${dfaPartyDbFields.P1PlayerName},
  pi1.CharacterName as ${dfaPartyDbFields.P1PlayerCName},
  pc1.NameType as ${dfaPartyDbFields.P1PlayerNameType},
  pc1.NameColor1 as ${dfaPartyDbFields.P1PlayerNameColor1},
  pc1.NameColor2 as ${dfaPartyDbFields.P1PlayerNameColor2},
  pc1.Server as ${dfaPartyDbFields.P1PlayerServer},
  pc1.PreferredName as ${dfaPartyDbFields.P1PlayerPrefN},

  pi2.PlayerName as ${dfaPartyDbFields.P2PlayerName},
  pi2.CharacterName as ${dfaPartyDbFields.P2PlayerCName},
  pc2.NameType as ${dfaPartyDbFields.P2PlayerNameType},
  pc2.NameColor1 as ${dfaPartyDbFields.P2PlayerNameColor1},
  pc2.NameColor2 as ${dfaPartyDbFields.P2PlayerNameColor2},
  pc2.Server as ${dfaPartyDbFields.P2PlayerServer},
  pc2.PreferredName as ${dfaPartyDbFields.P2PlayerPrefN},

  pi3.PlayerName as ${dfaPartyDbFields.P3PlayerName},
  pi3.CharacterName as ${dfaPartyDbFields.P3PlayerCName},
  pc3.NameType as ${dfaPartyDbFields.P3PlayerNameType},
  pc3.NameColor1 as ${dfaPartyDbFields.P3PlayerNameColor1},
  pc3.NameColor2 as ${dfaPartyDbFields.P3PlayerNameColor2},
  pc3.Server as ${dfaPartyDbFields.P3PlayerServer},
  pc3.PreferredName as ${dfaPartyDbFields.P3PlayerPrefN},

  pi4.PlayerName as ${dfaPartyDbFields.P4PlayerName},
  pi4.CharacterName as ${dfaPartyDbFields.P4PlayerCName},
  pc4.NameType as ${dfaPartyDbFields.P4PlayerNameType},
  pc4.NameColor1 as ${dfaPartyDbFields.P4PlayerNameColor1},
  pc4.NameColor2 as ${dfaPartyDbFields.P4PlayerNameColor2},
  pc4.Server as ${dfaPartyDbFields.P4PlayerServer},
  pc4.PreferredName as ${dfaPartyDbFields.P4PlayerPrefN},

  pi5.PlayerName as ${dfaPartyDbFields.P5PlayerName},
  pi5.CharacterName as ${dfaPartyDbFields.P5PlayerCName},
  pc5.NameType as ${dfaPartyDbFields.P5PlayerNameType},
  pc5.NameColor1 as ${dfaPartyDbFields.P5PlayerNameColor1},
  pc5.NameColor2 as ${dfaPartyDbFields.P5PlayerNameColor2},
  pc5.Server as ${dfaPartyDbFields.P5PlayerServer},
  pc5.PreferredName as ${dfaPartyDbFields.P5PlayerPrefN},

  pi6.PlayerName as ${dfaPartyDbFields.P6PlayerName},
  pi6.CharacterName as ${dfaPartyDbFields.P6PlayerCName},
  pc6.NameType as ${dfaPartyDbFields.P6PlayerNameType},
  pc6.NameColor1 as ${dfaPartyDbFields.P6PlayerNameColor1},
  pc6.NameColor2 as ${dfaPartyDbFields.P6PlayerNameColor2},
  pc6.Server as ${dfaPartyDbFields.P6PlayerServer},
  pc6.PreferredName as ${dfaPartyDbFields.P6PlayerPrefN},

  pi7.PlayerName as ${dfaPartyDbFields.P7PlayerName},
  pi7.CharacterName as ${dfaPartyDbFields.P7PlayerCName},
  pc7.NameType as ${dfaPartyDbFields.P7PlayerNameType},
  pc7.NameColor1 as ${dfaPartyDbFields.P7PlayerNameColor1},
  pc7.NameColor2 as ${dfaPartyDbFields.P7PlayerNameColor2},
  pc7.Server as ${dfaPartyDbFields.P7PlayerServer},
  pc7.PreferredName as ${dfaPartyDbFields.P7PlayerPrefN},

  pi8.PlayerName as ${dfaPartyDbFields.P8PlayerName},
  pi8.CharacterName as ${dfaPartyDbFields.P8PlayerCName},
  pc8.NameType as ${dfaPartyDbFields.P8PlayerNameType},
  pc8.NameColor1 as ${dfaPartyDbFields.P8PlayerNameColor1},
  pc8.NameColor2 as ${dfaPartyDbFields.P8PlayerNameColor2},
  pc8.Server as ${dfaPartyDbFields.P8PlayerServer},
  pc8.PreferredName as ${dfaPartyDbFields.P8PlayerPrefN},

  si.PlayerName as ${dfaPartyDbFields.SubmitterName},
  si.CharacterName as ${dfaPartyDbFields.SubmitterCName},
  sc.NameType as ${dfaPartyDbFields.SubmitterNameType},
  sc.NameColor1 as ${dfaPartyDbFields.SubmitterNameColor1},
  sc.NameColor2 as ${dfaPartyDbFields.SubmitterNameColor2},
  sc.PreferredName as ${dfaPartyDbFields.SubmitterPrefN}

  FROM Submissions.DFAegisParty AS submit
      
  INNER JOIN
  Players.Information AS pi1 ON submit.${dfaPartyDbFields.P1PlayerID} = pi1.PlayerID
  INNER JOIN
  Players.Information AS pi2 ON submit.${dfaPartyDbFields.P2PlayerID} = pi2.PlayerID
  INNER JOIN
  Players.Information AS pi3 ON submit.${dfaPartyDbFields.P3PlayerID} = pi3.PlayerID
  INNER JOIN
  Players.Information AS pi4 ON submit.${dfaPartyDbFields.P4PlayerID} = pi4.PlayerID

  INNER JOIN
  Players.Information AS pi5 ON submit.${dfaPartyDbFields.P5PlayerID} = pi5.PlayerID
  INNER JOIN
  Players.Information AS pi6 ON submit.${dfaPartyDbFields.P6PlayerID} = pi6.PlayerID
  INNER JOIN
  Players.Information AS pi7 ON submit.${dfaPartyDbFields.P7PlayerID} = pi7.PlayerID
  INNER JOIN
  Players.Information AS pi8 ON submit.${dfaPartyDbFields.P8PlayerID} = pi8.PlayerID

  INNER JOIN
  Players.Customization AS pc1 ON submit.${dfaPartyDbFields.P1PlayerID} = pc1.PlayerID
  INNER JOIN
  Players.Customization AS pc2 ON submit.${dfaPartyDbFields.P2PlayerID} = pc2.PlayerID
  INNER JOIN
  Players.Customization AS pc3 ON submit.${dfaPartyDbFields.P3PlayerID} = pc3.PlayerID
  INNER JOIN
  Players.Customization AS pc4 ON submit.${dfaPartyDbFields.P4PlayerID} = pc4.PlayerID

  INNER JOIN
  Players.Customization AS pc5 ON submit.${dfaPartyDbFields.P5PlayerID} = pc5.PlayerID
  INNER JOIN
  Players.Customization AS pc6 ON submit.${dfaPartyDbFields.P6PlayerID} = pc6.PlayerID
  INNER JOIN
  Players.Customization AS pc7 ON submit.${dfaPartyDbFields.P7PlayerID} = pc7.PlayerID
  INNER JOIN
  Players.Customization AS pc8 ON submit.${dfaPartyDbFields.P8PlayerID} = pc8.PlayerID

  INNER JOIN
  Players.Information AS si ON submit.${dfaPartyDbFields.SubmitterID} = si.PlayerID

  INNER JOIN
  Players.Customization AS sc ON submit.${dfaPartyDbFields.SubmitterID} = sc.PlayerID

  WHERE ${dfaPartyDbFields.SubmissionStatus} = 0
  AND
  ${dfaPartyDbFields.PartySize} = 8

  ORDER BY SubmissionTime DESC`;

	const results = await request.query(sqlQuery);
	const ret = results.recordset as DfaPartyDbModel[];

	return ret;
};

export const getDfaDuoSubmissions = async (request: Request) => {
	const sqlQuery = `
        
                SELECT
                submit.${dfaDuoDbFields.RunID}, 
                submit.${dfaDuoDbFields.P1PlayerID}, 
                submit.${dfaDuoDbFields.P2PlayerID}, 

                submit.${dfaDuoDbFields.P1RunCharacter}, 
                submit.${dfaDuoDbFields.P2RunCharacter}, 

                submit.${dfaDuoDbFields.Patch}, 
                submit.${dfaDuoDbFields.Drill}, 
                submit.${dfaDuoDbFields.Rank}, 
                submit.${dfaDuoDbFields.Buff}, 
                submit.${dfaDuoDbFields.Time}, 
                submit.${dfaDuoDbFields.P1MainClass}, 
                submit.${dfaDuoDbFields.P2MainClass}, 

                submit.${dfaDuoDbFields.P1SubClass}, 
                submit.${dfaDuoDbFields.P2SubClass}, 

                submit.${dfaDuoDbFields.PartySize},
                submit.${dfaDuoDbFields.P1Link}, 
                submit.${dfaDuoDbFields.P2Link}, 
 
                submit.${dfaDuoDbFields.Notes}, 
                submit.${dfaDuoDbFields.SubmissionTime}, 
                submit.${dfaDuoDbFields.SubmitterID},
                submit.${dfaDuoDbFields.ServerID},
        
                pi1.PlayerName as ${dfaDuoDbFields.P1PlayerName},
                pi1.CharacterName as ${dfaDuoDbFields.P1PlayerCName},
                pc1.NameType as ${dfaDuoDbFields.P1PlayerNameType},
                pc1.NameColor1 as ${dfaDuoDbFields.P1PlayerNameColor1},
                pc1.NameColor2 as ${dfaDuoDbFields.P1PlayerNameColor2},
                pc1.Server as ${dfaDuoDbFields.P1PlayerServer},
                pc1.PreferredName as ${dfaDuoDbFields.P1PlayerPrefN},

                pi2.PlayerName as ${dfaDuoDbFields.P2PlayerName},
                pi2.CharacterName as ${dfaDuoDbFields.P2PlayerCName},
                pc2.NameType as ${dfaDuoDbFields.P2PlayerNameType},
                pc2.NameColor1 as ${dfaDuoDbFields.P2PlayerNameColor1},
                pc2.NameColor2 as ${dfaDuoDbFields.P2PlayerNameColor2},
                pc2.Server as ${dfaDuoDbFields.P2PlayerServer},
                pc2.PreferredName as ${dfaDuoDbFields.P2PlayerPrefN},
        
                si.PlayerName as ${dfaDuoDbFields.SubmitterName},
                si.CharacterName as ${dfaDuoDbFields.SubmitterCName},
                sc.NameType as ${dfaDuoDbFields.SubmitterNameType},
                sc.NameColor1 as ${dfaDuoDbFields.SubmitterNameColor1},
                sc.NameColor2 as ${dfaDuoDbFields.SubmitterNameColor2},
                sc.PreferredName as ${dfaDuoDbFields.SubmitterPrefN}
        
                FROM Submissions.DFAegisParty AS submit
                    
                INNER JOIN
                Players.Information AS pi1 ON submit.${dfaDuoDbFields.P1PlayerID} = pi1.PlayerID
                INNER JOIN
                Players.Information AS pi2 ON submit.${dfaDuoDbFields.P2PlayerID} = pi2.PlayerID

        
                INNER JOIN
                Players.Customization AS pc1 ON submit.${dfaDuoDbFields.P1PlayerID} = pc1.PlayerID
                INNER JOIN
                Players.Customization AS pc2 ON submit.${dfaDuoDbFields.P2PlayerID} = pc2.PlayerID

        
                INNER JOIN
                Players.Information AS si ON submit.${dfaDuoDbFields.SubmitterID} = si.PlayerID
        
                INNER JOIN
                Players.Customization AS sc ON submit.${dfaDuoDbFields.SubmitterID} = sc.PlayerID
        
                WHERE ${dfaDuoDbFields.SubmissionStatus} = 0
                AND
                ${dfaDuoDbFields.PartySize} = 2
        
                ORDER BY SubmissionTime DESC`;

	const results = await request.query(sqlQuery);
	const ret = results.recordset as DfaDuoDbModel[];

	return ret;
};

export const getDfaSoloSubmissions = async (request: Request) => {
	const sqlQuery = `
        
  SELECT
  submit.${dfaSoloDbFields.RunID}, 
  submit.${dfaSoloDbFields.PlayerID}, 
  submit.${dfaSoloDbFields.RunCharacter}, 
  submit.${dfaSoloDbFields.Patch}, 
  submit.${dfaSoloDbFields.Drill}, 
  submit.${dfaSoloDbFields.Rank}, 
  submit.${dfaSoloDbFields.Support}, 
  submit.${dfaSoloDbFields.Time}, 
  submit.${dfaSoloDbFields.MainClass}, 
  submit.${dfaSoloDbFields.SubClass}, 
  submit.${dfaSoloDbFields.W1},
  submit.${dfaSoloDbFields.W2},
  submit.${dfaSoloDbFields.W3},
  submit.${dfaSoloDbFields.W4},
  submit.${dfaSoloDbFields.W5},
  submit.${dfaSoloDbFields.W6},
  submit.${dfaSoloDbFields.Link}, 
  submit.${dfaSoloDbFields.Notes}, 
  submit.${dfaSoloDbFields.SubmissionTime}, 
  submit.${dfaSoloDbFields.SubmitterID},

  pi.PlayerName as ${dfaSoloDbFields.PlayerName},
  pi.CharacterName as ${dfaSoloDbFields.PlayerCName},
  pc.NameType as ${dfaSoloDbFields.PlayerNameType},
  pc.NameColor1 as ${dfaSoloDbFields.PlayerNameColor1},
  pc.NameColor2 as ${dfaSoloDbFields.PlayerNameColor2},
  pc.Server as ${dfaSoloDbFields.PlayerServer},
  pc.PreferredName as ${dfaSoloDbFields.PlayerPrefN},

  si.PlayerName as ${dfaSoloDbFields.SubmitterName},
  si.CharacterName as ${dfaSoloDbFields.SubmitterCName},
  sc.NameType as ${dfaSoloDbFields.SubmitterNameType},
  sc.NameColor1 as ${dfaSoloDbFields.SubmitterNameColor1},
  sc.NameColor2 as ${dfaSoloDbFields.SubmitterNameColor2},
  sc.PreferredName as ${dfaSoloDbFields.SubmitterPrefN}

  FROM Submissions.DFAegisSolo AS submit
      
  INNER JOIN

  Players.Information AS pi ON submit.${dfaSoloDbFields.PlayerID} = pi.PlayerID

  INNER JOIN
  Players.Customization AS pc ON submit.${dfaSoloDbFields.PlayerID} = pc.PlayerID

  INNER JOIN
  Players.Information AS si ON submit.${dfaSoloDbFields.SubmitterID} = si.PlayerID

  INNER JOIN
  Players.Customization AS sc ON submit.${dfaSoloDbFields.SubmitterID} = sc.PlayerID

  WHERE ${dfaSoloDbFields.SubmissionStatus} = 0

  ORDER BY SubmissionTime DESC`;

	const results = await request.query(sqlQuery);
	const ret = results.recordset as DfaSoloDbModel[];

	return ret;
};

export const approveDfaSolo = async (transaction: sql.Transaction, run: ApproveRequest) => {
	const request = transaction.request();
	request.input('modNotes', sql.NVarChar, run.modNotes).input('submissionId', sql.Int, run.runId);

	// Add run data to runs table
	const runInsertResult = await request.query(`
    INSERT INTO DFAegis.Solo (PlayerID,RunCharacterName,Patch,Buff,Rank,Time,MainClass,SubClass,WeaponInfo1,WeaponInfo2,WeaponInfo3,WeaponInfo4,WeaponInfo5,WeaponInfo6,Link,Notes,SubmissionTime,SubmitterID,ModNotes,Drill)
    SELECT PlayerID,RunCharacter,Patch,Support,Rank,Time,MainClass,SubClass,W1,W2,W3,W4,W5,W6,Link,Notes,SubmissionTime,SubmitterID,@modNotes,Drill
    FROM Submissions.DFAegisSolo
		WHERE Submissions.DFAegisSolo.${dfaSoloDbFields.RunID}= @submissionId;
  `);
	if (runInsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Solo insertion failed.`);
	}

	// Update Submission
	const submissionResult = await request.query(`
    UPDATE Submissions.DFAegisSolo
    SET ${dfaSoloDbFields.SubmissionStatus} = 1
    WHERE ${dfaSoloDbFields.RunID} = @submissionId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Dfa solo approval failed.`);
	}
};

export const getDfaSoloExists = async (request: Request, runId: number) => {
	// Run exists
	const submissionResults = await request.input('submissionId', sql.Int, runId).query(`
    SELECT 
      ${dfaSoloDbFields.RunID}, 
      ${dfaSoloDbFields.SubmissionStatus}, 
      ${dfaSoloDbFields.PlayerID}
    FROM Submissions.DFAegisSolo
    WHERE ${dfaSoloDbFields.RunID} = @submissionId;
		`);

	if (Array.from(submissionResults.recordset).length == 0) {
		return undefined;
	}
	const submission = submissionResults.recordset[0] as DfaSoloDbModel;
	return {
		SubmissionId: submission.RunID,
		SubmissionStatus: submission.SubmissionStatus,
		PlayerId: submission.PlayerID
	};
};

export const approveDfaDuo = async (transaction: sql.Transaction, run: ApproveRequest) => {
	const request = transaction.request();
	request.input('modNotes', sql.NVarChar, run.modNotes).input('submissionId', sql.Int, run.runId);

	// Add run data to runs table
	const runInsertResult = await request.query(`
    INSERT INTO DFAegis.Party (PartySize,Patch,Rank,Time,Notes,RunServer,SubmissionTime,SubmitterID,ModNotes,Buff,Drill)
    SELECT PartySize,Patch,Rank,Time,Notes,ServerId,SubmissionTime,SubmitterID,@modNotes,Buff,Drill
    FROM Submissions.DFAegisParty
		WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
    SELECT SCOPE_IDENTITY() AS LastID;
  `);
	if (runInsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Duo insertion failed.`);
	}

	// Add player info
	const insertedRunId = parseInt(runInsertResult.recordset[0].LastID);
	request.input('insertedRunId', sql.Int, insertedRunId);

	const player1InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P1PlayerID,P1RunCharacter,P1MainClass,P1SubClass,P1Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player1InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Duo player 1 insertion failed.`);
	}
	const player2InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P2PlayerID,P2RunCharacter,P2MainClass,P2SubClass,P2Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player2InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Duo player 2 insertion failed.`);
	}

	// Update Submission
	const submissionResult = await request.query(`
    UPDATE Submissions.DFAegisParty
    SET ${dfaPartyDbFields.SubmissionStatus} = 1
    WHERE ${dfaPartyDbFields.RunID} = @submissionId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Duo approval failed.`);
	}
};

export const getDfaDuoExists = async (request: Request, runId: number) =>
	getDfaPartyExists(request, runId);

export const approveDfaParty = async (transaction: sql.Transaction, run: ApproveRequest) => {
	const request = transaction.request();
	request.input('modNotes', sql.NVarChar, run.modNotes).input('submissionId', sql.Int, run.runId);

	// Add run data to runs table
	const runInsertResult = await request.query(`
    INSERT INTO DFAegis.Party (PartySize,Patch,Rank,Time,Notes,RunServer,SubmissionTime,SubmitterID,ModNotes,Buff,Drill)
    SELECT PartySize,Patch,Rank,Time,Notes,ServerId,SubmissionTime,SubmitterID,@modNotes,Buff,Drill
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
    SELECT SCOPE_IDENTITY() AS LastID;
  `);
	if (runInsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party insertion failed.`);
	}

	// Add player info
	const insertedRunId = parseInt(runInsertResult.recordset[0].LastID);
	request.input('insertedRunId', sql.Int, insertedRunId);

	const player1InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P1PlayerID,P1RunCharacter,P1MainClass,P1SubClass,P1Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player1InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party player 1 insertion failed.`);
	}
	const player2InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P2PlayerID,P2RunCharacter,P2MainClass,P2SubClass,P2Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player2InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party player 2 insertion failed.`);
	}
	const player3InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P3PlayerID,P3RunCharacter,P3MainClass,P3SubClass,P3Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player3InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party player 3 insertion failed.`);
	}
	const player4InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P4PlayerID,P4RunCharacter,P4MainClass,P4SubClass,P4Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player4InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party player 4 insertion failed.`);
	}

	const player5InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P5PlayerID,P5RunCharacter,P5MainClass,P5SubClass,P5Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player5InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party player 5 insertion failed.`);
	}

	const player6InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P6PlayerID,P6RunCharacter,P6MainClass,P6SubClass,P6Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player6InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party player 6 insertion failed.`);
	}

	const player7InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P7PlayerID,P7RunCharacter,P7MainClass,P7SubClass,P7Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player7InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party player 7 insertion failed.`);
	}

	const player8InsertResult = await request.query(`
    INSERT INTO DFAegis.PartyRunners (RunID,PlayerID,RunCharacterName,MainClass,SubClass,LinkPOV)
    SELECT @insertedRunId,P8PlayerID,P8RunCharacter,P8MainClass,P8SubClass,P8Link
    FROM Submissions.DFAegisParty
    WHERE Submissions.DFAegisParty.${dfaPartyDbFields.RunID} = @submissionId;
  `);
	if (player8InsertResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party player 8 insertion failed.`);
	}

	// Update Submission
	const submissionResult = await request.query(`
    UPDATE Submissions.DFAegisParty
    SET ${dfaPartyDbFields.SubmissionStatus} = 1
    WHERE ${dfaPartyDbFields.RunID} = @submissionId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Dfa Party approval failed.`);
	}
};

export const getDfaPartyExists = async (request: Request, runId: number) => {
	// Run exists
	const submissionResults = await request.input('submissionId', sql.Int, runId).query(`
    SELECT
      ${dfaPartyDbFields.RunID},
      ${dfaPartyDbFields.SubmissionStatus},
      ${dfaPartyDbFields.P1PlayerID}
    FROM Submissions.DFAegisParty
    WHERE ${dfaPartyDbFields.RunID} = @submissionId;
		`);

	if (Array.from(submissionResults.recordset).length == 0) {
		return undefined;
	}
	const submission = submissionResults.recordset[0] as DfaPartyDbModel;
	return {
		SubmissionId: submission.RunID,
		SubmissionStatus: submission.SubmissionStatus,
		PlayerId: submission.P1PlayerID
	};
};

export const denyDfaSolo = async (request: sql.Request, run: DenyRequest) => {
	const result = await request
		.input('submissionId', sql.Int, run.runId)
		.input('modNotes', sql.NVarChar, run.modNotes).query(`
      UPDATE Submissions.DFAegisSolo
      SET ${dfaSoloDbFields.SubmissionStatus} = 1
      WHERE ${dfaSoloDbFields.RunID} = @submissionId;
  `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Dfa Solo Run denial failed.`);
	}
};

export const denyDfaDuo = async (request: sql.Request, run: DenyRequest) => {
	const result = await request
		.input('submissionId', sql.Int, run.runId)
		.input('modNotes', sql.NVarChar, run.modNotes).query(`
      UPDATE Submissions.DFAegisParty
      SET ${dfaPartyDbFields.SubmissionStatus} = 1
      WHERE ${dfaPartyDbFields.RunID} = @submissionId AND ${dfaPartyDbFields.PartySize} = 2;
  `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Dfa Duo Run denial failed.`);
	}
};

export const denyDfaParty = async (request: sql.Request, run: DenyRequest) => {
	const result = await request
		.input('submissionId', sql.Int, run.runId)
		.input('modNotes', sql.NVarChar, run.modNotes).query(`
      UPDATE Submissions.DFAegisParty
      SET ${dfaPartyDbFields.SubmissionStatus} = 1
      WHERE ${dfaPartyDbFields.RunID} = @submissionId AND ${dfaPartyDbFields.PartySize} = 8;
  `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Dfa Party Run denial failed.`);
	}
};

export const checkDfaVideoExists = async (request: sql.Request, videoLinks: string[]) => {
	let videoLinkRequest = request;

	const paramNames: string[] = [];
	videoLinks.forEach((l, i) => {
		const paramName = `link${i}`;
		paramNames.push(paramName);
		videoLinkRequest = videoLinkRequest.input(paramName, l);
	});

	const paramList = paramNames.map((p) => `@${p}`);
	const videoLinksResults = await videoLinkRequest.query(`
    SELECT Link 
      FROM Submissions.DFAegisSolo 
      WHERE Link IN (${paramList.join(',')})
    UNION
    SELECT P1Link
      FROM Submissions.DFAegisParty
      WHERE P1Link IN (${paramList.join(',')})
    UNION
    SELECT P2Link
      FROM Submissions.DFAegisParty
      WHERE P2Link IN (${paramList.join(',')})
    UNION
    SELECT P3Link
      FROM Submissions.DFAegisParty
      WHERE P3Link IN (${paramList.join(',')})
    UNION
    SELECT P4Link
      FROM Submissions.DFAegisParty
      WHERE P4Link IN (${paramList.join(',')})
    UNION
    SELECT P5Link
      FROM Submissions.DFAegisParty
      WHERE P5Link IN (${paramList.join(',')})
    UNION
    SELECT P6Link
      FROM Submissions.DFAegisParty
      WHERE P6Link IN (${paramList.join(',')})
    UNION
    SELECT P7Link
      FROM Submissions.DFAegisParty
      WHERE P7Link IN (${paramList.join(',')})
    UNION
    SELECT P8Link
      FROM Submissions.DFAegisParty
      WHERE P8Link IN (${paramList.join(',')});`);

	return videoLinksResults.recordset.length > 0
		? videoLinksResults.recordset.map((r) => r.Link as string)
		: [];
};

export const insertDfaSoloSubmission = async (request: sql.Request, run: DfaSubmissionRequest) => {
	const player1 = run.players[0];
	const runTime = serializeTimeToSqlTime(run.time);
	const submissionTime = new Date();

	const insertRequest = request
		.input('playerId', sql.Int, player1.playerId)
		.input('runCharacter', sql.NVarChar, player1.inVideoName)
		.input('patch', sql.NVarChar, CurrentSubmissionPatchCode)
		.input('drill', sql.Int, triggerDbMap[run.type])
		.input('rank', sql.Int, run.rank)
		.input('support', sql.NVarChar, run.support)
		.input('time', sql.NVarChar, runTime)
		.input('mainClass', sql.NVarChar, player1.mainClass)
		.input('subClass', sql.NVarChar, player1.subClass)
		.input('w1', sql.NVarChar, player1.weapons[0])
		.input('w2', sql.NVarChar, player1.weapons[1])
		.input('w3', sql.NVarChar, player1.weapons[2])
		.input('w4', sql.NVarChar, player1.weapons[3])
		.input('w5', sql.NVarChar, player1.weapons[4])
		.input('w6', sql.NVarChar, player1.weapons[5])
		.input('link', sql.NVarChar, player1.povVideoLink)
		.input('notes', sql.NVarChar, run.notes)
		.input('submissionTime', sql.DateTime, submissionTime)
		.input('submitterId', sql.Int, player1.playerId);

	const dbFields = dfaSoloDbFields;
	const result = await insertRequest.query(
		`INSERT INTO 
     Submissions.DFAegisSolo (${dbFields.PlayerID},${dbFields.RunCharacter},${dbFields.Patch},${dbFields.Drill},${dbFields.Rank},${dbFields.Support},${dbFields.Time},${dbFields.MainClass},${dbFields.SubClass},${dbFields.W1},${dbFields.W2},${dbFields.W3},${dbFields.W4},${dbFields.W5},${dbFields.W6},${dbFields.Link},${dbFields.Notes},${dbFields.SubmissionTime},${dbFields.SubmitterID})
     VALUES (@playerId,@runCharacter,@patch,@drill,@rank,@support,@time,@mainClass,@subClass,@w1,@w2,@w3,@w4,@w5,@w6,@link,@notes,@submissionTime,@submitterId);
		`
	);

	if (result.rowsAffected[0] == 0) {
		throw Error(`DFA Solo Run insertion failed. Submission from: ${run.username}`);
	}
};

export const insertDfaPartySubmission = async (request: sql.Request, run: DfaSubmissionRequest) => {
	const player1 = run.players[0];
	const player2 = run.players[1];
	const player3 = run.players[2];
	const player4 = run.players[3];
	const player5 = run.players[4];
	const player6 = run.players[5];
	const player7 = run.players[6];
	const player8 = run.players[7];

	const runTime = serializeTimeToSqlTime(run.time);

	const submissionTime = new Date();

	let insertRequest = request
		.input('partysize', sql.Int, run.players.length)
		.input('subtime', sql.DateTime, submissionTime)
		.input('subpid', sql.Int, player1.playerId)
		.input('serverid', sql.NVarChar, run.serverRegion)
		.input('questrank', sql.Int, run.rank)
		.input('patch', sql.NVarChar, CurrentSubmissionPatchCode)
		.input('buff', sql.NVarChar, run.support)
		.input('rank', sql.Int, triggerDbMap[run.type])
		.input('time', sql.NVarChar, runTime)
		.input('notes', sql.NVarChar, run.notes);

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

	insertRequest = insertRequest
		.input('p5pid', sql.Int, player5?.playerId)
		.input('p5rc', sql.NVarChar, player5?.inVideoName)
		.input('p5mc', sql.NVarChar, player5?.mainClass)
		.input('p5sc', sql.NVarChar, player5?.subClass)
		.input('p5link', sql.NVarChar, player5?.povVideoLink);

	insertRequest = insertRequest
		.input('p6pid', sql.Int, player6?.playerId)
		.input('p6rc', sql.NVarChar, player6?.inVideoName)
		.input('p6mc', sql.NVarChar, player6?.mainClass)
		.input('p6sc', sql.NVarChar, player6?.subClass)
		.input('p6link', sql.NVarChar, player6?.povVideoLink);

	insertRequest = insertRequest
		.input('p7pid', sql.Int, player7?.playerId)
		.input('p7rc', sql.NVarChar, player7?.inVideoName)
		.input('p7mc', sql.NVarChar, player7?.mainClass)
		.input('p7sc', sql.NVarChar, player7?.subClass)
		.input('p7link', sql.NVarChar, player7?.povVideoLink);

	insertRequest = insertRequest
		.input('p8pid', sql.Int, player8?.playerId)
		.input('p8rc', sql.NVarChar, player8?.inVideoName)
		.input('p8mc', sql.NVarChar, player8?.mainClass)
		.input('p8sc', sql.NVarChar, player8?.subClass)
		.input('p8link', sql.NVarChar, player8?.povVideoLink);

	const dbFields = dfaPartyDbFields;
	const result = await insertRequest.query(
		`INSERT INTO 
     Submissions.DFAegisParty (${dbFields.P1PlayerID},${dbFields.P2PlayerID},${dbFields.P3PlayerID},${dbFields.P4PlayerID},${dbFields.P5PlayerID},${dbFields.P6PlayerID},${dbFields.P7PlayerID},${dbFields.P8PlayerID},${dbFields.P1RunCharacter},${dbFields.P2RunCharacter},${dbFields.P3RunCharacter},${dbFields.P4RunCharacter},${dbFields.P5RunCharacter},${dbFields.P6RunCharacter},${dbFields.P7RunCharacter},${dbFields.P8RunCharacter},${dbFields.Patch},${dbFields.Buff},${dbFields.Drill},${dbFields.Time},${dbFields.P1MainClass},${dbFields.P2MainClass},${dbFields.P3MainClass},${dbFields.P4MainClass},${dbFields.P5MainClass},${dbFields.P6MainClass},${dbFields.P7MainClass},${dbFields.P8MainClass},${dbFields.P1SubClass},${dbFields.P2SubClass},${dbFields.P3SubClass},${dbFields.P4SubClass},${dbFields.P5SubClass},${dbFields.P6SubClass},${dbFields.P7SubClass},${dbFields.P8SubClass},${dbFields.PartySize},${dbFields.P1Link},${dbFields.P2Link},${dbFields.P3Link},${dbFields.P4Link},${dbFields.P5Link},${dbFields.P6Link},${dbFields.P7Link},${dbFields.P8Link},${dbFields.Notes},${dbFields.SubmissionTime},${dbFields.SubmitterID},${dbFields.ServerID},${dbFields.Rank})
     VALUES (@p1pid,@p2pid,@p3pid,@p4pid,@p5pid,@p6pid,@p7pid,@p8pid,@p1rc,@p2rc,@p3rc,@p4rc,@p5rc,@p6rc,@p7rc,@p8rc,@patch,@buff,@rank,@time,@p1mc,@p2mc,@p3mc,@p4mc,@p5mc,@p6mc,@p7mc,@p8mc,@p1sc,@p2sc,@p3sc,@p4sc,@p5sc,@p6sc,@p7sc,@p8sc,@partysize,@p1link,@p2link,@p3link,@p4link,@p5link,@p6link,@p7link,@p8link,@notes,@subtime,@subpid,@serverid,@questrank);
     `
	);

	if (result.rowsAffected[0] == 0) {
		throw Error(`DFA Party Run insertion failed. Submission from: ${run.username}`);
	}
};

const triggerDbMap: { [key: string]: number } = {
	trigger: 1,
	urgent: 0
};

const serializeTimeToSqlTime = (runTime: DfaSubmissionRequest['time']) =>
	`${runTime.hours.toString().padStart(2)}:${runTime.minutes
		.toString()
		.padStart(2)}:${runTime.seconds.toString().padStart(2)}`;
