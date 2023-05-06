import type { Request } from 'mssql';
import type { IndomitableDbModel } from '$lib/server/types/db/duels/indomitable';
import { fields } from '../util/nameof';

const indomitableDbFields = fields<IndomitableDbModel>();

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

	var results = await request.query(sqlQuery);

	const ret = results.recordset as IndomitableDbModel[];
	return ret;
};
