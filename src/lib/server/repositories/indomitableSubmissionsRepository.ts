import type { IndomitableSubmission } from '$lib/types/api/submissions/submissions';
import type { Request } from 'mssql';
import { dbValToClassMap } from '../db/util/ngsClass';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import { dbValToWeaponsMap } from '../db/util/weaponType';
import { convertTimeToRunTime } from '../db/util/datetime';

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
							CONCAT_WS(' ', submit.WeaponInfo1,submit.WeaponInfo2,submit.WeaponInfo3,submit.WeaponInfo4,submit.WeaponInfo5,submit.WeaponInfo6) as WeaponInfo, 
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

	const ret: IndomitableSubmission[] = mapIndomitableDuel(boss, results.recordset);
	return ret;
};

const mapIndomitableDuel = (boss: string, recordset: any[]): IndomitableSubmission[] => {
	const mapped = recordset.map((s: { [key: string]: string }) => {
		const player1: PlayerInfo = {
			playerId: parseInt(s.PlayerID),
			playerName: s.PlayerName,
			characterName: s.PlayerCName,
			preferredName: parseInt(s.PlayerPrefN),
			runCharacterName: s.RunCharacterName,
			mainClass: dbValToClassMap[s.MainClass],
			subClass: dbValToClassMap[s.SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.Link,
			server: s.PlayerServer,
			nameType: parseInt(s.PlayerNameType),
			nameColor1: s.PlayerNameColor1,
			nameColor2: s.PlayerNameColor2,
			weapons: [
				s.WeaponInfo1,
				s.WeaponInfo2,
				s.WeaponInfo3,
				s.WeaponInfo4,
				s.WeaponInfo5,
				s.WeaponInfo6
			]
				.filter((w) => !!w)
				.map((w) => dbValToWeaponsMap[w == 'soaring blades' ? 'sb' : w]) //TODO make this weapon definition consistent
		};

		const submitter: PlayerInfo = {
			playerId: parseInt(s.SubmitterID),
			playerName: s.SubmitterName,
			characterName: s.SubmitterCName,
			preferredName: parseInt(s.SubmitterPrefN),
			runCharacterName: '',
			mainClass: dbValToClassMap[s.MainClass],
			subClass: dbValToClassMap[s.SubClass],
			linkPov: undefined,
			server: undefined,
			flag: undefined,
			ship: undefined,
			nameType: parseInt(s.SubmitterNameType),
			nameColor1: s.SubmitterNameColor1,
			nameColor2: s.SubmitterNameColor2,
			weapons: []
		};
		const players = [player1];

		const runTime = convertTimeToRunTime(new Date(s.RunTime));

		const submission: IndomitableSubmission = {
			category: `indomitable${boss.toLowerCase()}`,
			runId: parseInt(s.SubmissionId),
			patch: s.Patch,
			boss: boss,
			rank: parseInt(s.Rank),
			augments: parseInt(s.Augments) == 0 ? false : true,
			time: runTime,
			players: players,
			partySize: players.length,
			submitter: submitter,
			notes: s.Notes,
			submissionTime: s.SubmissionTime,
			server: ''
		};

		return submission;
	});
	return mapped;
};
