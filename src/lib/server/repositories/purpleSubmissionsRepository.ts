import type { PurpleSubmission } from '$lib/types/api/submissions/submissions';
import type { Request } from 'mssql';
import { dbValToClassMap } from '../db/util/ngsClass';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import { dbValToWeaponsMap } from '../db/util/weaponType';
import { convertTimeToRunTime } from '../db/util/datetime';

export const getPurplePartySubmissions = async (request: Request) => {
	var sqlQuery = `
        
  SELECT
  submit.RunID, 
  submit.P1PlayerID, 
  submit.P2PlayerID, 
  submit.P3PlayerID, 
  submit.P4PlayerID, 
  submit.P1RunCharacter, 
  submit.P2RunCharacter, 
  submit.P3RunCharacter, 
  submit.P4RunCharacter, 
  submit.Patch, 
  submit.Region, 
  submit.Rank, 
  CONVERT(VARCHAR(8), submit.Time, 108) as Time, 
  submit.P1MainClass, 
  submit.P2MainClass, 
  submit.P3MainClass, 
  submit.P4MainClass, 
  submit.P1SubClass, 
  submit.P2SubClass, 
  submit.P3SubClass, 
  submit.P4SubClass, 
  submit.PartySize,
  submit.P1Link, 
  submit.P2Link, 
  submit.P3Link, 
  submit.P4Link, 
  submit.Notes, 
  submit.SubmissionTime, 
  submit.SubmitterID,
  submit.ServerID,

  pi1.PlayerName as P1PlayerName,
  pi1.CharacterName as P1PlayerCName,
  pc1.NameType as P1PlayerNameType,
  pc1.NameColor1 as P1PlayerNameColor1,
  pc1.NameColor2 as P1PlayerNameColor2,
  pc1.Server as P1PlayerServer,
  pc1.PreferredName as P1PlayerPrefN,

  pi2.PlayerName as P2PlayerName,
  pi2.CharacterName as P2PlayerCName,
  pc2.NameType as P2PlayerNameType,
  pc2.NameColor1 as P2PlayerNameColor1,
  pc2.NameColor2 as P2PlayerNameColor2,
  pc2.Server as P2PlayerServer,
  pc2.PreferredName as P2PlayerPrefN,

  pi3.PlayerName as P3PlayerName,
  pi3.CharacterName as P3PlayerCName,
  pc3.NameType as P3PlayerNameType,
  pc3.NameColor1 as P3PlayerNameColor1,
  pc3.NameColor2 as P3PlayerNameColor2,
  pc3.Server as P3PlayerServer,
  pc3.PreferredName as P3PlayerPrefN,

  pi4.PlayerName as P4PlayerName,
  pi4.CharacterName as P4PlayerCName,
  pc4.NameType as P4PlayerNameType,
  pc4.NameColor1 as P4PlayerNameColor1,
  pc4.NameColor2 as P4PlayerNameColor2,
  pc4.Server as P4PlayerServer,
  pc4.PreferredName as P4PlayerPrefN,

  si.PlayerName as SubmitterName,
  si.CharacterName as SubmitterCName,
  sc.NameType as SubmitterNameType,
  sc.NameColor1 as SubmitterNameColor1,
  sc.NameColor2 as SubmitterNameColor2,
  sc.PreferredName as SubmitterPrefN

  FROM Submissions.Party AS submit
      
  INNER JOIN
  Players.Information AS pi1 ON submit.P1PlayerID = pi1.PlayerID
  INNER JOIN
  Players.Information AS pi2 ON submit.P2PlayerID = pi2.PlayerID
  INNER JOIN
  Players.Information AS pi3 ON submit.P3PlayerID = pi3.PlayerID
  INNER JOIN
  Players.Information AS pi4 ON submit.P4PlayerID = pi4.PlayerID

  INNER JOIN
  Players.Customization AS pc1 ON submit.P1PlayerID = pc1.PlayerID
  INNER JOIN
  Players.Customization AS pc2 ON submit.P2PlayerID = pc2.PlayerID
  INNER JOIN
  Players.Customization AS pc3 ON submit.P3PlayerID = pc3.PlayerID
  INNER JOIN
  Players.Customization AS pc4 ON submit.P4PlayerID = pc4.PlayerID

  INNER JOIN
  Players.Information AS si ON submit.SubmitterID = si.PlayerID

  INNER JOIN
  Players.Customization AS sc ON submit.SubmitterID = sc.PlayerID

  WHERE SubmissionStatus = 0
  AND
  PartySize = 4

  ORDER BY SubmissionTime DESC`;

	var results = await request.query(sqlQuery);

	var returner = results.recordset;
	var returnArray: any[] = [];
	returner.forEach((data) => {
		var dataReturn = {
			p1: {
				PlayerID: data.P1PlayerID,
				PlayerName: data.P1PlayerName,
				CharacterName: data.P1PlayerCName,
				PreferredName: data.P1PlayerPrefN,
				RunCharacterName: data.P1RunCharacter,
				MainClass: data.P1MainClass,
				SubClass: data.P1SubClass,
				LinkPOV: data.P1Link,
				Server: data.P1PlayerServer,
				NameType: data.P1PlayerNameType,
				NameColor1: data.P1PlayerNameColor1,
				NameColor2: data.P1PlayerNameColor2
			},
			p2: {
				PlayerID: data.P2PlayerID,
				PlayerName: data.P2PlayerName,
				CharacterName: data.P2PlayerCName,
				PreferredName: data.P2PlayerPrefN,
				RunCharacterName: data.P2RunCharacter,
				MainClass: data.P2MainClass,
				SubClass: data.P2SubClass,
				LinkPOV: data.P2Link,
				Server: data.P2PlayerServer,
				NameType: data.P2PlayerNameType,
				NameColor1: data.P2PlayerNameColor1,
				NameColor2: data.P2PlayerNameColor2
			},
			p3: {
				PlayerID: data.P3PlayerID,
				PlayerName: data.P3PlayerName,
				CharacterName: data.P3PlayerCName,
				PreferredName: data.P3PlayerPrefN,
				RunCharacterName: data.P3RunCharacter,
				MainClass: data.P3MainClass,
				SubClass: data.P3SubClass,
				LinkPOV: data.P3Link,
				Server: data.P3PlayerServer,
				NameType: data.P3PlayerNameType,
				NameColor1: data.P3PlayerNameColor1,
				NameColor2: data.P3PlayerNameColor2
			},
			p4: {
				PlayerID: data.P4PlayerID,
				PlayerName: data.P4PlayerName,
				CharacterName: data.P4PlayerCName,
				PreferredName: data.P4PlayerPrefN,
				RunCharacterName: data.P4RunCharacter,
				MainClass: data.P4MainClass,
				SubClass: data.P4SubClass,
				LinkPOV: data.P4Link,
				Server: data.P4PlayerServer,
				NameType: data.P4PlayerNameType,
				NameColor1: data.P4PlayerNameColor1,
				NameColor2: data.P4PlayerNameColor2
			},
			sub: {
				PlayerID: data.SubmitterID,
				PlayerName: data.SubmitterName,
				CharacterName: data.SubmitterCName,
				RunCharacterName: data.SubmitterCName,
				PreferredName: data.SubmitterPrefN,
				NameType: data.SubmitterNameType,
				NameColor1: data.SubmitterNameColor1,
				NameColor2: data.SubmitterNameColor2
			},
			shared: {
				RunID: data.RunID,
				Time: data.Time,
				Notes: data.Notes,
				Patch: data.Patch,
				Region: data.Region,
				Rank: data.Rank,
				SubmissionTime: data.SubmissionTime,
				SubmitterID: data.SubmitterID,
				PartySize: data.PartySize,
				ServerID: data.ServerID
			}
		};
		returnArray.push(dataReturn);
	});

	////console.log(returner);

	//returner = context.req.body;
	//console.log(returnArray)
	return returner;
};
export const getPurpleDuoSubmissions = async (request: Request) => {
	var sqlQuery = `
            
  SELECT
  submit.RunID, 
  submit.P1PlayerID, 
  submit.P2PlayerID, 
  submit.P1RunCharacter, 
  submit.P2RunCharacter, 
  submit.Patch, 
  submit.Region, 
  submit.Rank, 
  CONVERT(VARCHAR(8), submit.Time, 108) as Time, 
  submit.P1MainClass, 
  submit.P2MainClass, 
  submit.P1SubClass, 
  submit.P2SubClass, 
  submit.PartySize,
  submit.P1Link, 
  submit.P2Link, 
  submit.Notes, 
  submit.SubmissionTime, 
  submit.SubmitterID,
  submit.ServerID,

  pi1.PlayerName as P1PlayerName,
  pi1.CharacterName as P1PlayerCName,
  pc1.NameType as P1PlayerNameType,
  pc1.NameColor1 as P1PlayerNameColor1,
  pc1.NameColor2 as P1PlayerNameColor2,
  pc1.Server as P1PlayerServer,
  pc1.PreferredName as P1PlayerPrefN,

  pi2.PlayerName as P2PlayerName,
  pi2.CharacterName as P2PlayerCName,
  pc2.NameType as P2PlayerNameType,
  pc2.NameColor1 as P2PlayerNameColor1,
  pc2.NameColor2 as P2PlayerNameColor2,
  pc2.Server as P2PlayerServer,
  pc2.PreferredName as P2PlayerPrefN,

  si.PlayerName as SubmitterName,
  si.CharacterName as SubmitterCName,
  sc.NameType as SubmitterNameType,
  sc.NameColor1 as SubmitterNameColor1,
  sc.NameColor2 as SubmitterNameColor2,
  sc.PreferredName as SubmitterPrefN

  FROM Submissions.Party AS submit
      
  INNER JOIN
  Players.Information AS pi1 ON submit.P1PlayerID = pi1.PlayerID
  INNER JOIN
  Players.Information AS pi2 ON submit.P2PlayerID = pi2.PlayerID


  INNER JOIN
  Players.Customization AS pc1 ON submit.P1PlayerID = pc1.PlayerID
  INNER JOIN
  Players.Customization AS pc2 ON submit.P2PlayerID = pc2.PlayerID

  INNER JOIN
  Players.Information AS si ON submit.SubmitterID = si.PlayerID

  INNER JOIN
  Players.Customization AS sc ON submit.SubmitterID = sc.PlayerID

  WHERE SubmissionStatus = 0
  AND
  PartySize = 2

  ORDER BY SubmissionTime DESC`;

	var results = await request.query(sqlQuery);

	var returner = results.recordset;
	var returnArray: any[] = [];
	returner.forEach((data) => {
		var dataReturn = {
			p1: {
				PlayerID: data.P1PlayerID,
				PlayerName: data.P1PlayerName,
				CharacterName: data.P1PlayerCName,
				PreferredName: data.P1PlayerPrefN,
				RunCharacterName: data.P1RunCharacter,
				MainClass: data.P1MainClass,
				SubClass: data.P1SubClass,
				LinkPOV: data.P1Link,
				Server: data.P1PlayerServer,
				NameType: data.P1PlayerNameType,
				NameColor1: data.P1PlayerNameColor1,
				NameColor2: data.P1PlayerNameColor2
			},
			p2: {
				PlayerID: data.P2PlayerID,
				PlayerName: data.P2PlayerName,
				CharacterName: data.P2PlayerCName,
				PreferredName: data.P2PlayerPrefN,
				RunCharacterName: data.P2RunCharacter,
				MainClass: data.P2MainClass,
				SubClass: data.P2SubClass,
				LinkPOV: data.P2Link,
				Server: data.P2PlayerServer,
				NameType: data.P2PlayerNameType,
				NameColor1: data.P2PlayerNameColor1,
				NameColor2: data.P2PlayerNameColor2
			},
			p3: {
				PlayerID: data.P3PlayerID,
				PlayerName: data.P3PlayerName,
				CharacterName: data.P3PlayerCName,
				PreferredName: data.P3PlayerPrefN,
				RunCharacterName: data.P3RunCharacter,
				MainClass: data.P3MainClass,
				SubClass: data.P3SubClass,
				LinkPOV: data.P3Link,
				Server: data.P3PlayerServer,
				NameType: data.P3PlayerNameType,
				NameColor1: data.P3PlayerNameColor1,
				NameColor2: data.P3PlayerNameColor2
			},
			p4: {
				PlayerID: data.P4PlayerID,
				PlayerName: data.P4PlayerName,
				CharacterName: data.P4PlayerCName,
				PreferredName: data.P4PlayerPrefN,
				RunCharacterName: data.P4RunCharacter,
				MainClass: data.P4MainClass,
				SubClass: data.P4SubClass,
				LinkPOV: data.P4Link,
				Server: data.P4PlayerServer,
				NameType: data.P4PlayerNameType,
				NameColor1: data.P4PlayerNameColor1,
				NameColor2: data.P4PlayerNameColor2
			},
			sub: {
				PlayerID: data.SubmitterID,
				PlayerName: data.SubmitterName,
				CharacterName: data.SubmitterCName,
				RunCharacterName: data.SubmitterCName,
				PreferredName: data.SubmitterPrefN,
				NameType: data.SubmitterNameType,
				NameColor1: data.SubmitterNameColor1,
				NameColor2: data.SubmitterNameColor2
			},
			shared: {
				RunID: data.RunID,
				Time: data.Time,
				Notes: data.Notes,
				Patch: data.Patch,
				Region: data.Region,
				Rank: data.Rank,
				SubmissionTime: data.SubmissionTime,
				SubmitterID: data.SubmitterID,
				PartySize: data.PartySize,
				ServerID: data.ServerID
			}
		};
		returnArray.push(dataReturn);
	});

	return returnArray;
};
export const getPurpleSoloSubmissions = async (request: Request) => {
	var sqlQuery = `
        
  SELECT
  submit.RunID, 
  submit.PlayerID, 
  submit.RunCharacter, 
  submit.Patch, 
  submit.Region, 
  submit.Rank, 
  submit.Time, 
  submit.MainClass, 
  submit.SubClass, 
  submit.W1,
  submit.W2,
  submit.W3,
  submit.W4,
  submit.W5,
  submit.W6,
  CONCAT_WS(' ', submit.W1,submit.W2,submit.W3,submit.W4,submit.W5,submit.W6) as WeaponInfo, 
  submit.Link, 
  submit.Notes, 
  submit.SubmissionTime, 
  submit.SubmitterID,

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

  FROM Submissions.Pending AS submit
      
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

	var returner = results.recordset;

	const ret: PurpleSubmission[] = mapPurpleSolo(results.recordset);
	return ret;
};

const mapPurpleSolo = (recordset: any[]): PurpleSubmission[] => {
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

		const runTime = convertTimeToRunTime(new Date(s.Time));

		const submission: PurpleSubmission = {
			category: `purple${player1.nameColor1}`,
			runId: parseInt(s.RunID),
			patch: s.Patch,
			region: s.Region,
			rank: parseInt(s.Rank),
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
