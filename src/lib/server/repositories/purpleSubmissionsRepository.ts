import type { Request } from 'mssql';
import type { PurpleSoloDbModel } from '$lib/types/db/purple/purpleSolo';
import type { PurpleDuoDbModel } from '$lib/types/db/purple/purpleDuo';
import type { PurplePartyDbModel } from '$lib/types/db/purple/purpleParty';

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
  submit.Time, 
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
	var ret = results.recordset as PurplePartyDbModel[];

	return ret;
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
	var ret = results.recordset as PurpleDuoDbModel[];

	return ret;
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
	const ret = results.recordset as PurpleSoloDbModel[];

	return ret;
};
