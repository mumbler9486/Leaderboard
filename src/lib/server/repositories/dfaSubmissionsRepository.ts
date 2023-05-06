import type { DfaDuoDbModel } from '$lib/server/types/db/dfa/dfaDuo';
import type { DfaPartyDbModel } from '$lib/server/types/db/dfa/dfaParty';
import type { DfaSoloDbModel } from '$lib/server/types/db/dfa/dfaSolo';
import type { Request } from 'mssql';
import { fields } from '../util/nameof';

const dfaPartyDbFields = fields<DfaPartyDbModel>();
const dfaDuoDbFields = fields<DfaDuoDbModel>();
const dfaSoloDbFields = fields<DfaSoloDbModel>();

export const getDfaPartySubmissions = async (request: Request) => {
	var sqlQuery = `
        
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
                submit.${dfaDuoDbFields.RunID}, 
                submit.${dfaDuoDbFields.P1PlayerID}, 
                submit.${dfaDuoDbFields.P2PlayerID}, 

                submit.${dfaDuoDbFields.P1RunCharacter}, 
                submit.${dfaDuoDbFields.P2RunCharacter}, 

                submit.${dfaDuoDbFields.Patch}, 
                submit.${dfaDuoDbFields.Drill}, 
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
  submit.${dfaSoloDbFields.RunID}, 
  submit.${dfaSoloDbFields.PlayerID}, 
  submit.${dfaSoloDbFields.RunCharacter}, 
  submit.${dfaSoloDbFields.Patch}, 
  submit.${dfaSoloDbFields.Drill}, 
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

  WHERE SubmissionStatus = 0

  ORDER BY SubmissionTime DESC`;

	var results = await request.query(sqlQuery);
	var ret = results.recordset as DfaSoloDbModel[];

	return ret;
};
