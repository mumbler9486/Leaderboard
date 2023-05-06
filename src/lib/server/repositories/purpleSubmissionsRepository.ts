import type { Request } from 'mssql';
import type { PurpleSoloDbModel } from '$lib/server/types/db/purple/purpleSolo';
import type { PurpleDuoDbModel } from '$lib/server/types/db/purple/purpleDuo';
import type { PurplePartyDbModel } from '$lib/server/types/db/purple/purpleParty';
import { fields } from '../util/nameof';

const purplePartyDbFields = fields<PurplePartyDbModel>();
const purpleDuoDbFields = fields<PurpleDuoDbModel>();
const purpleSoloDbFields = fields<PurpleSoloDbModel>();

export const getPurplePartySubmissions = async (request: Request) => {
	var sqlQuery = `
        
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

  WHERE SubmissionStatus = 0

  ORDER BY SubmissionTime DESC`;

	var results = await request.query(sqlQuery);
	const ret = results.recordset as PurpleSoloDbModel[];

	return ret;
};
