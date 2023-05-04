import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import type {
	IndomitableSubmission,
	PurpleSubmission
} from '$lib/types/api/submissions/submissions.js';
import type { PlayerInfo } from '$lib/types/api/playerInfo.js';
import { dbValToWeaponsMap } from '$lib/server/db/util/weaponType.js';
import { dbValToClassMap } from '$lib/server/db/util/ngsClass.js';
import { convertTimeToRunTime } from '$lib/server/db/util/datetime.js';

const validDuelTables: { [key: string]: string } = {
	nexaelio: 'IndomitableNexAelioRuns',
	renusretem: 'IndomitableRenusRetemRuns',
	amskvaris: 'IndomitableAmsKvarisRuns',
	nilsstia: 'IndomitableNilsStiaRuns'
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const category = params.category?.toLowerCase() ?? '';

	const poolConnection = await leaderboardDb.connect();

	switch (category) {
		case 'dfaparty':
			try {
				var sqlQuery = `
        
                SELECT
                submit.RunID, 
                submit.P1PlayerID, 
                submit.P2PlayerID, 
                submit.P3PlayerID, 
                submit.P4PlayerID, 
                submit.P5PlayerID, 
                submit.P6PlayerID, 
                submit.P7PlayerID, 
                submit.P8PlayerID, 
                submit.P1RunCharacter, 
                submit.P2RunCharacter, 
                submit.P3RunCharacter, 
                submit.P4RunCharacter, 
                submit.P5RunCharacter, 
                submit.P6RunCharacter, 
                submit.P7RunCharacter, 
                submit.P8RunCharacter, 
                submit.Patch, 
                submit.Drill, 
                submit.Buff, 
                CONVERT(VARCHAR(8), submit.Time, 108) as Time, 
                submit.P1MainClass, 
                submit.P2MainClass, 
                submit.P3MainClass, 
                submit.P4MainClass, 
                submit.P5MainClass, 
                submit.P6MainClass, 
                submit.P7MainClass, 
                submit.P8MainClass, 
                submit.P1SubClass, 
                submit.P2SubClass, 
                submit.P3SubClass, 
                submit.P4SubClass, 
                submit.P5SubClass, 
                submit.P6SubClass, 
                submit.P7SubClass, 
                submit.P8SubClass, 
                submit.PartySize,
                submit.P1Link, 
                submit.P2Link, 
                submit.P3Link, 
                submit.P4Link, 
                submit.P5Link, 
                submit.P6Link, 
                submit.P7Link, 
                submit.P8Link, 
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

                pi5.PlayerName as P5PlayerName,
                pi5.CharacterName as P5PlayerCName,
                pc5.NameType as P5PlayerNameType,
                pc5.NameColor1 as P5PlayerNameColor1,
                pc5.NameColor2 as P5PlayerNameColor2,
                pc5.Server as P5PlayerServer,
                pc5.PreferredName as P5PlayerPrefN,

                pi6.PlayerName as P6PlayerName,
                pi6.CharacterName as P6PlayerCName,
                pc6.NameType as P6PlayerNameType,
                pc6.NameColor1 as P6PlayerNameColor1,
                pc6.NameColor2 as P6PlayerNameColor2,
                pc6.Server as P6PlayerServer,
                pc6.PreferredName as P6PlayerPrefN,

                pi7.PlayerName as P7PlayerName,
                pi7.CharacterName as P7PlayerCName,
                pc7.NameType as P7PlayerNameType,
                pc7.NameColor1 as P7PlayerNameColor1,
                pc7.NameColor2 as P7PlayerNameColor2,
                pc7.Server as P7PlayerServer,
                pc7.PreferredName as P7PlayerPrefN,

                pi8.PlayerName as P8PlayerName,
                pi8.CharacterName as P8PlayerCName,
                pc8.NameType as P8PlayerNameType,
                pc8.NameColor1 as P8PlayerNameColor1,
                pc8.NameColor2 as P8PlayerNameColor2,
                pc8.Server as P8PlayerServer,
                pc8.PreferredName as P8PlayerPrefN,
        
                si.PlayerName as SubmitterName,
                si.CharacterName as SubmitterCName,
                sc.NameType as SubmitterNameType,
                sc.NameColor1 as SubmitterNameColor1,
                sc.NameColor2 as SubmitterNameColor2,
                sc.PreferredName as SubmitterPrefN
        
                FROM Submissions.DFAegisParty AS submit
                    
                INNER JOIN
                Players.Information AS pi1 ON submit.P1PlayerID = pi1.PlayerID
                INNER JOIN
                Players.Information AS pi2 ON submit.P2PlayerID = pi2.PlayerID
                INNER JOIN
                Players.Information AS pi3 ON submit.P3PlayerID = pi3.PlayerID
                INNER JOIN
                Players.Information AS pi4 ON submit.P4PlayerID = pi4.PlayerID

                INNER JOIN
                Players.Information AS pi5 ON submit.P5PlayerID = pi5.PlayerID
                INNER JOIN
                Players.Information AS pi6 ON submit.P6PlayerID = pi6.PlayerID
                INNER JOIN
                Players.Information AS pi7 ON submit.P7PlayerID = pi7.PlayerID
                INNER JOIN
                Players.Information AS pi8 ON submit.P8PlayerID = pi8.PlayerID
        
                INNER JOIN
                Players.Customization AS pc1 ON submit.P1PlayerID = pc1.PlayerID
                INNER JOIN
                Players.Customization AS pc2 ON submit.P2PlayerID = pc2.PlayerID
                INNER JOIN
                Players.Customization AS pc3 ON submit.P3PlayerID = pc3.PlayerID
                INNER JOIN
                Players.Customization AS pc4 ON submit.P4PlayerID = pc4.PlayerID

                INNER JOIN
                Players.Customization AS pc5 ON submit.P5PlayerID = pc5.PlayerID
                INNER JOIN
                Players.Customization AS pc6 ON submit.P6PlayerID = pc6.PlayerID
                INNER JOIN
                Players.Customization AS pc7 ON submit.P7PlayerID = pc7.PlayerID
                INNER JOIN
                Players.Customization AS pc8 ON submit.P8PlayerID = pc8.PlayerID
        
                INNER JOIN
                Players.Information AS si ON submit.SubmitterID = si.PlayerID
        
                INNER JOIN
                Players.Customization AS sc ON submit.SubmitterID = sc.PlayerID
        
                WHERE SubmissionStatus = 0
                AND
                PartySize = 8
        
                ORDER BY SubmissionTime DESC`;

				var results = await poolConnection.request().query(sqlQuery);

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
						p5: {
							PlayerID: data.P5PlayerID,
							PlayerName: data.P5PlayerName,
							CharacterName: data.P5PlayerCName,
							PreferredName: data.P5PlayerPrefN,
							RunCharacterName: data.P5RunCharacter,
							MainClass: data.P5MainClass,
							SubClass: data.P5SubClass,
							LinkPOV: data.P5Link,
							Server: data.P5PlayerServer,
							NameType: data.P5PlayerNameType,
							NameColor1: data.P5PlayerNameColor1,
							NameColor2: data.P5PlayerNameColor2
						},
						p6: {
							PlayerID: data.P6PlayerID,
							PlayerName: data.P6PlayerName,
							CharacterName: data.P6PlayerCName,
							PreferredName: data.P6PlayerPrefN,
							RunCharacterName: data.P6RunCharacter,
							MainClass: data.P6MainClass,
							SubClass: data.P6SubClass,
							LinkPOV: data.P6Link,
							Server: data.P6PlayerServer,
							NameType: data.P6PlayerNameType,
							NameColor1: data.P6PlayerNameColor1,
							NameColor2: data.P6PlayerNameColor2
						},
						p7: {
							PlayerID: data.P7PlayerID,
							PlayerName: data.P7PlayerName,
							CharacterName: data.P7PlayerCName,
							PreferredName: data.P7PlayerPrefN,
							RunCharacterName: data.P7RunCharacter,
							MainClass: data.P7MainClass,
							SubClass: data.P7SubClass,
							LinkPOV: data.P7Link,
							Server: data.P7PlayerServer,
							NameType: data.P7PlayerNameType,
							NameColor1: data.P7PlayerNameColor1,
							NameColor2: data.P7PlayerNameColor2
						},
						p8: {
							PlayerID: data.P8PlayerID,
							PlayerName: data.P8PlayerName,
							CharacterName: data.P8PlayerCName,
							PreferredName: data.P8PlayerPrefN,
							RunCharacterName: data.P8RunCharacter,
							MainClass: data.P8MainClass,
							SubClass: data.P8SubClass,
							LinkPOV: data.P8Link,
							Server: data.P8PlayerServer,
							NameType: data.P8PlayerNameType,
							NameColor1: data.P8PlayerNameColor1,
							NameColor2: data.P8PlayerNameColor2
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
							Drill: data.Drill.toString(),
							Buff: data.Buff,
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

				return json(returnArray);
			} catch (err) {
				console.error(err);
				break;
			}
			break;

		case 'dfaduo':
			try {
				var sqlQuery = `
        
                SELECT
                submit.RunID, 
                submit.P1PlayerID, 
                submit.P2PlayerID, 

                submit.P1RunCharacter, 
                submit.P2RunCharacter, 

                submit.Patch, 
                submit.Drill, 
                submit.Buff, 
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
        
                FROM Submissions.DFAegisParty AS submit
                    
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

				var results = await poolConnection.request().query(sqlQuery);

				var returner = results.recordset;
				var returnArray = [];
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
							Drill: data.Drill.toString(),
							Buff: data.Buff,
							SubmissionTime: data.SubmissionTime,
							SubmitterID: data.SubmitterID,
							PartySize: data.PartySize,
							ServerID: data.ServerID
						}
					};
					returnArray.push(dataReturn);
				});

				////console.log(returner);
				poolConnection.close();

				//returner = context.req.body;
				//console.log(returnArray)

				return json(returnArray);
			} catch (err) {
				console.error(err);
				break;
			}
			break;

		case 'purpleparty':
			try {
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

				var results = await poolConnection.request().query(sqlQuery);

				var returner = results.recordset;
				var returnArray = [];
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
				poolConnection.close();

				//returner = context.req.body;
				//console.log(returnArray)

				return json(returnArray);
			} catch (err) {
				console.error(err);
				break;
			}
			break;

		case 'purpleduo':
			try {
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

				var results = await poolConnection.request().query(sqlQuery);

				var returner = results.recordset;
				var returnArray = [];
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
				poolConnection.close();

				//returner = context.req.body;
				//console.log(returnArray)

				return json(returnArray);
			} catch (err) {
				console.error(err);
				break;
			}
			break;

		case 'dfasolo':
			try {
				var sqlQuery = `
        
                SELECT
                submit.RunID, 
                submit.PlayerID, 
                submit.RunCharacter, 
                submit.Patch, 
                submit.Drill, 
                submit.Support, 
                CONVERT(VARCHAR(8), submit.Time, 108) as Time, 
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
        
                FROM Submissions.DFAegisSolo AS submit
                    
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

				var results = await poolConnection.request().query(sqlQuery);

				var returner = results.recordset;
				////console.log(returner);
				poolConnection.close();

				//returner = context.req.body;

				return json(returner);
			} catch (err) {
				console.error(err);
				break;
			}
			break;

		case 'purplesolo':
			try {
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

				var results = await poolConnection.request().query(sqlQuery);

				var returner = results.recordset;

				const ret: PurpleSubmission[] = mapPurpleSolo(results.recordset);
				return json(ret);
			} catch (err) {
				console.error(err);
				break;
			}
			break;

		case 'duelindomitable':
			try {
				const boss = url.searchParams.get('boss') ?? '';
				const duelTable = validDuelTables[boss];
				if (!duelTable) {
					throw error(400, 'bad_request');
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

				var results = await poolConnection.request().query(sqlQuery);

				var returner = results.recordset;

				const ret: IndomitableSubmission[] = mapIndomitableDuel(boss, results.recordset);
				return json(ret);
			} catch (err) {
				console.error(err);
				break;
			}
			break;
		default:
			throw error(404, 'not_found');
			break;
	}
}

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
