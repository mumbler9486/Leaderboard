import type { DfaDuoDbModel } from '$lib/types/db/dfa/dfaDuo';
import type { DfaPartyDbModel } from '$lib/types/db/dfa/dfaParty';
import type { DfaSoloDbModel } from '$lib/types/db/dfa/dfaSolo';
import type { Request } from 'mssql';

export const getDfaPartySubmissions = async (request: Request) => {
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
  submit.Time, 
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

	var results = await request.query(sqlQuery);
	var ret = results.recordset as DfaPartyDbModel[];

	return ret;
};

export const getDfaDuoSubmissions = async (request: Request) => {
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
                submit.Time, 
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

	var results = await request.query(sqlQuery);
	var ret = results.recordset as DfaDuoDbModel[];

	return ret;
};

export const getDfaSoloSubmissions = async (request: Request) => {
	var sqlQuery = `
        
  SELECT
  submit.RunID, 
  submit.PlayerID, 
  submit.RunCharacter, 
  submit.Patch, 
  submit.Drill, 
  submit.Support, 
  submit.Time, 
  submit.MainClass, 
  submit.SubClass, 
  submit.W1,
  submit.W2,
  submit.W3,
  submit.W4,
  submit.W5,
  submit.W6,
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

	var results = await request.query(sqlQuery);
	var ret = results.recordset as DfaSoloDbModel[];

	return ret;
};
