import type { Request } from 'mssql';
import type { IndomitableDbModel } from '$lib/types/db/duels/indomitable';

const validDuelTables: { [key: string]: string } = {
	nexaelio: 'IndomitableNexAelioRuns',
	renusretem: 'IndomitableRenusRetemRuns',
	amskvaris: 'IndomitableAmsKvarisRuns',
	nilsstia: 'IndomitableNilsStiaRuns'
};

export const getIndomitableSubmissions = async (request: Request, boss: string) => {
	const duelTable = validDuelTables[boss];
	if (!duelTable) {
		throw Error(`Unknown indomitable boss: ${boss}`);
	}

	var sqlQuery = `
			
							SELECT
							submit.SubmissionId, 
							submit.PlayerID, 
							submit.RunCharacterName, 
							submit.Patch, 
							submit.Rank, 
							submit.RunTime, 
							submit.MainClass, 
							submit.SubClass, 
							submit.WeaponInfo1,
							submit.WeaponInfo2,
							submit.WeaponInfo3,
							submit.WeaponInfo4,
							submit.WeaponInfo5,
							submit.WeaponInfo6,
							submit.Link, 
							submit.Notes, 
							submit.SubmissionTime, 
							submit.SubmitterID,
							submit.VideoTag,
							submit.ModNotes,
							submit.Augments,
			
							pi.PlayerName as PlayerName,
							pi.CharacterName as PlayerCName,
							pc.NameType as PlayerNameType,
							pc.NameColor1 as PlayerNameColor1,
							pc.NameColor2 as PlayerNameColor2,
							pc.Server as PlayerServer,
							pc.PreferredName as PlayerPrefN,
			
							si.PlayerName as SubmitterName,
							si.CharacterName as SubmitterCName,
							sc.NameType as SubmitterNameType,
							sc.NameColor1 as SubmitterNameColor1,
							sc.NameColor2 as SubmitterNameColor2,
							sc.PreferredName as SubmitterPrefN
			
							FROM Submissions.${duelTable} AS submit
									
							INNER JOIN
			
							Players.Information AS pi ON submit.PlayerID = pi.PlayerID
			
							INNER JOIN
							Players.Customization AS pc ON submit.PlayerID = pc.PlayerID
			
							INNER JOIN
							Players.Information AS si ON submit.SubmitterID = si.PlayerID
			
							INNER JOIN
							Players.Customization AS sc ON submit.SubmitterID = sc.PlayerID
			
							WHERE SubmissionStatus = 0
			
							ORDER BY SubmissionTime DESC`;

	var results = await request.query(sqlQuery);

	const ret = results.recordset as IndomitableDbModel[];
	return ret;
};
