import sql, { type Request } from 'mssql';
import type { IndomitableDbModel } from '$lib/server/types/db/duels/indomitable';
import { fields } from '../util/nameof';
import type { ApproveRequest, DenyRequest } from '../types/validation/submissions';
import { RunCategories } from '$lib/types/api/categories';

const indomitableDbFields = fields<IndomitableDbModel>();

const validDuelTables: { [key: string]: string } = {
	[RunCategories.IndomitableNexAelio]: 'IndomitableNexAelioRuns',
	[RunCategories.IndomitableRenusRetem]: 'IndomitableRenusRetemRuns',
	[RunCategories.IndomitableAmsKvaris]: 'IndomitableAmsKvarisRuns',
	[RunCategories.IndomitableNilsStia]: 'IndomitableNilsStiaRuns'
};

export const getIndomitableSubmissions = async (request: Request, category: RunCategories) => {
	const duelTable = validDuelTables[category];
	if (!duelTable) {
		throw Error(`Unknown indomitable boss: ${category}`);
	}

	const sqlQuery = `
			
							SELECT
							submit.${indomitableDbFields.SubmissionId}, 
							submit.${indomitableDbFields.PlayerID}, 
							submit.${indomitableDbFields.RunCharacterName}, 
							submit.${indomitableDbFields.Patch}, 
							submit.${indomitableDbFields.Rank}, 
							submit.${indomitableDbFields.RunTime}, 
							submit.${indomitableDbFields.MainClass}, 
							submit.${indomitableDbFields.SubClass}, 
							submit.${indomitableDbFields.WeaponInfo1},
							submit.${indomitableDbFields.WeaponInfo2},
							submit.${indomitableDbFields.WeaponInfo3},
							submit.${indomitableDbFields.WeaponInfo4},
							submit.${indomitableDbFields.WeaponInfo5},
							submit.${indomitableDbFields.WeaponInfo6},
							submit.${indomitableDbFields.Link}, 
							submit.${indomitableDbFields.Notes}, 
							submit.${indomitableDbFields.SubmissionTime}, 
							submit.${indomitableDbFields.SubmitterID},
							submit.${indomitableDbFields.VideoTag},
							submit.${indomitableDbFields.ModNotes},
							submit.${indomitableDbFields.Augments},
			
							pi.PlayerName as ${indomitableDbFields.PlayerName},
							pi.CharacterName as ${indomitableDbFields.PlayerCName},
							pc.NameType as ${indomitableDbFields.PlayerNameType},
							pc.NameColor1 as ${indomitableDbFields.PlayerNameColor1},
							pc.NameColor2 as ${indomitableDbFields.PlayerNameColor2},
							pc.Server as ${indomitableDbFields.PlayerServer},
							pc.PreferredName as ${indomitableDbFields.PlayerPrefN},
			
							si.PlayerName as ${indomitableDbFields.SubmitterName},
							si.CharacterName as ${indomitableDbFields.SubmitterCName},
							sc.NameType as ${indomitableDbFields.SubmitterNameType},
							sc.NameColor1 as ${indomitableDbFields.SubmitterNameColor1},
							sc.NameColor2 as ${indomitableDbFields.SubmitterNameColor2},
							sc.PreferredName as ${indomitableDbFields.SubmitterPrefN}
			
							FROM Submissions.${duelTable} AS submit
									
							INNER JOIN
			
							Players.Information AS pi ON submit.${indomitableDbFields.PlayerID} = pi.PlayerID
			
							INNER JOIN
							Players.Customization AS pc ON submit.${indomitableDbFields.PlayerID} = pc.PlayerID
			
							INNER JOIN
							Players.Information AS si ON submit.${indomitableDbFields.SubmitterID} = si.PlayerID
			
							INNER JOIN
							Players.Customization AS sc ON submit.${indomitableDbFields.SubmitterID} = sc.PlayerID
			
							WHERE SubmissionStatus = 0
			
							ORDER BY SubmissionTime DESC`;

	const results = await request.query(sqlQuery);

	const ret = results.recordset as IndomitableDbModel[];
	return ret;
};

export const getIndomitableExists = async (
	request: Request,
	category: RunCategories,
	runId: number
) => {
	const table = validDuelTables[category];

	// Run exists
	const submissionResults = await request.input('submissionId', sql.Int, runId).query(`
    SELECT 
			${indomitableDbFields.SubmissionId},
			${indomitableDbFields.SubmissionStatus},
			${indomitableDbFields.PlayerID}
    FROM Submissions.${table}
    WHERE SubmissionId = @submissionId;
		`);

	if (Array.from(submissionResults.recordset).length == 0) {
		return undefined;
	}
	const submission = submissionResults.recordset[0] as IndomitableDbModel;
	return {
		SubmissionId: submission.SubmissionId,
		SubmissionStatus: submission.SubmissionStatus,
		PlayerId: submission.PlayerID
	};
};

export const approveIndomitableSubmission = async (
	transaction: sql.Transaction,
	category: RunCategories,
	run: ApproveRequest
) => {
	const table = validDuelTables[category];

	const request = transaction.request();
	request.input('modNotes', sql.NVarChar, run.modNotes).input('submissionId', sql.Int, run.runId);

	// Add run data to runs table
	const runInsertResult = await request.query(`
    INSERT INTO ${table} (PlayerID,RunCharacterName,ShipOverride,Patch,Region,Rank,RunTime,MainClass,SubClass,WeaponInfo1,WeaponInfo2,WeaponInfo3,WeaponInfo4,WeaponInfo5,WeaponInfo6,Link,Notes,SubmissionTime,SubmitterID,VideoTag,ModNotes,Augments)
    SELECT PlayerID,RunCharacterName,NULL,Patch,NULL,Rank,RunTime,MainClass,SubClass,WeaponInfo1,WeaponInfo2,WeaponInfo3,WeaponInfo4,WeaponInfo5,WeaponInfo6,Link,Notes,SubmissionTime,SubmitterID,VideoTag,@modNotes,Augments
    FROM Submissions.${table}
		WHERE ${indomitableDbFields.SubmissionId} = @submissionId;
  `);
	if (runInsertResult.rowsAffected[0] == 0) {
		throw Error(`Indomitable Run insertion failed.`);
	}

	// Update Submission
	const submissionResult = await request.query(`
      UPDATE Submissions.${table}
      SET ${indomitableDbFields.SubmissionStatus} = 1, ${indomitableDbFields.ModNotes} = @modNotes
      WHERE ${indomitableDbFields.SubmissionId} = @submissionId;
    `);

	if (submissionResult.rowsAffected[0] == 0) {
		throw Error(`Indomitable Run approval failed.`);
	}
};

export const denyIndomitableSubmission = async (
	request: Request,
	category: RunCategories,
	run: DenyRequest
) => {
	const table = validDuelTables[category];
	const result = await request
		.input('submissionId', sql.Int, run.runId)
		.input('modNotes', sql.NVarChar, run.modNotes).query(`
      UPDATE Submissions.${table}
      SET ${indomitableDbFields.SubmissionStatus} = 1, ${indomitableDbFields.ModNotes} = @modNotes
      WHERE ${indomitableDbFields.SubmissionId} = @submissionId;
    `);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Indomitable Run denial failed.`);
	}
};
