import sql, { type Request } from 'mssql';
import { fields } from '../util/nameof';
import type { PurplePartyRunDbModel } from '../types/db/runs/purple/purpleParty';
import type { PurpleSoloRunDbModel } from '../types/db/runs/purple/purpleSolo';
import type {
	PurplePartySearchFilter,
	PurpleSoloSearchFilter
} from '../types/validation/purpleRunFilter';

const purplePartyDbFields = fields<PurplePartyRunDbModel>();
const purpleSoloDbFields = fields<PurpleSoloRunDbModel>();

const regionDbMap: { [key: string]: string } = {
	aelio: 'aelio',
	retem: 'retem',
	kvaris: 'kvaris',
	stia: 'stia'
};

export const getPurpleSoloRuns = async (request: Request, filters: PurpleSoloSearchFilter) => {
	let query = `
    SELECT
      run.${purpleSoloDbFields.RunID},
      run.${purpleSoloDbFields.PlayerID},
      run.${purpleSoloDbFields.RunCharacterName},
      run.${purpleSoloDbFields.ShipOverride},
      run.${purpleSoloDbFields.Patch},
      run.${purpleSoloDbFields.Region},
      run.${purpleSoloDbFields.Rank},
      run.${purpleSoloDbFields.Time},
      run.${purpleSoloDbFields.MainClass},
      run.${purpleSoloDbFields.SubClass},
      run.${purpleSoloDbFields.WeaponInfo1},
      run.${purpleSoloDbFields.WeaponInfo2},
      run.${purpleSoloDbFields.WeaponInfo3},
      run.${purpleSoloDbFields.WeaponInfo4},
      run.${purpleSoloDbFields.WeaponInfo5},
      run.${purpleSoloDbFields.WeaponInfo6},
      run.${purpleSoloDbFields.Link},
      run.${purpleSoloDbFields.Notes},
      run.${purpleSoloDbFields.SubmissionTime},
      run.${purpleSoloDbFields.SubmitterID},
      run.${purpleSoloDbFields.VideoTag},
      run.${purpleSoloDbFields.ModNotes},

      pi.PlayerName AS ${purpleSoloDbFields.PlayerName},
      pi.CharacterName AS ${purpleSoloDbFields.CharacterName},
      pi.Description AS ${purpleSoloDbFields.Description},
      pi.Youtube AS ${purpleSoloDbFields.Youtube},
      pi.Twitch AS ${purpleSoloDbFields.Twitch},
      pi.Twitter AS ${purpleSoloDbFields.Twitter},
      pi.Discord AS ${purpleSoloDbFields.Discord},

      pc.PreferredName AS ${purpleSoloDbFields.PreferredName},
      pc.Server AS ${purpleSoloDbFields.Server},
      pc.Ship AS ${purpleSoloDbFields.Ship},
      pc.Flag AS ${purpleSoloDbFields.Flag},
      pc.BackgroundType AS ${purpleSoloDbFields.BackgroundType},
      pc.BackgroundImage AS ${purpleSoloDbFields.BackgroundImage},
      pc.BackgroundColor AS ${purpleSoloDbFields.BackgroundColor},
      pc.NameType AS ${purpleSoloDbFields.NameType},
      pc.NameColor1 AS ${purpleSoloDbFields.NameColor1},
      pc.NameColor2 AS ${purpleSoloDbFields.NameColor2},

      si.PlayerName as ${purpleSoloDbFields.SubmitterName},
      si.CharacterName as ${purpleSoloDbFields.SubmitterCName},
      sc.NameType as ${purpleSoloDbFields.SubmitterNameType},
      sc.NameColor1 as ${purpleSoloDbFields.SubmitterNameColor1},
      sc.NameColor2 as ${purpleSoloDbFields.SubmitterNameColor2},
      sc.PreferredName as ${purpleSoloDbFields.SubmitterPrefN}

    FROM Purples.Solo AS run

    INNER JOIN
    Players.Information AS pi ON run.${purpleSoloDbFields.PlayerID} = pi.PlayerID
    INNER JOIN 
    Players.Customization AS pc ON run.${purpleSoloDbFields.PlayerID} = pc.PlayerID
    
    INNER JOIN
    Players.Information AS si ON run.${purpleSoloDbFields.SubmitterID} = si.PlayerID
    INNER JOIN
    Players.Customization AS sc ON run.${purpleSoloDbFields.SubmitterID} = sc.PlayerID

    WHERE run.${purpleSoloDbFields.Region} = @region AND 
          run.${purpleSoloDbFields.Rank} = @rank`;

	if (filters.server) {
		query += ` AND pc.Server = @server`;
		request = request.input('server', sql.NVarChar, filters.server);
	}

	if (filters.class) {
		query += ` AND run.${purpleSoloDbFields.MainClass} = @mainClass`;
		request = request.input('mainClass', sql.NVarChar, filters.class);
	}

	query += ` ORDER BY run.${purplePartyDbFields.Time} ASC, run.${purplePartyDbFields.SubmissionTime} ASC`;

	const region = regionDbMap[filters.region];
	request = request.input('region', sql.NVarChar, region).input('rank', sql.Int, filters.rank);

	const results = await request.query(query);
	return results.recordset as PurpleSoloRunDbModel[];
};

export const getPurpleDuoRuns = async (request: Request, filters: PurplePartySearchFilter) =>
	getPurplePartyRuns(request, filters, 2);

export const getPurplePartyRuns = async (
	request: Request,
	filters: PurplePartySearchFilter,
	partySize: 2 | 4 = 4
) => {
	let query = `
    SELECT 
      run.${purplePartyDbFields.RunID},
      run.${purplePartyDbFields.PartySize},
      run.${purplePartyDbFields.Patch},
      run.${purplePartyDbFields.Region},
      run.${purplePartyDbFields.Rank},
      run.${purplePartyDbFields.Time},
      run.${purplePartyDbFields.Notes},
      run.${purplePartyDbFields.RunServer},
      run.${purplePartyDbFields.SubmissionTime},
      run.${purplePartyDbFields.SubmitterID},
      run.${purplePartyDbFields.ModNotes},

      pr.${purplePartyDbFields.PlayerID},
      pr.${purplePartyDbFields.RunCharacterName},
      pr.${purplePartyDbFields.ShipOverride},
      pr.${purplePartyDbFields.MainClass},
      pr.${purplePartyDbFields.SubClass},
      pr.${purplePartyDbFields.LinkPOV},

      pi.PlayerName AS ${purplePartyDbFields.PlayerName},
      pi.CharacterName AS ${purplePartyDbFields.CharacterName},
      pi.Description AS ${purplePartyDbFields.Description},
      pi.Youtube AS ${purplePartyDbFields.Youtube},
      pi.Twitch AS ${purplePartyDbFields.Twitch},
      pi.Twitter AS ${purplePartyDbFields.Twitter},
      pi.Discord AS ${purplePartyDbFields.Discord},

      pc.PreferredName AS ${purplePartyDbFields.PreferredName},
      pc.Server AS ${purplePartyDbFields.Server},
      pc.Ship AS ${purplePartyDbFields.Ship},
      pc.Flag AS ${purplePartyDbFields.Flag},
      pc.BackgroundType AS ${purplePartyDbFields.BackgroundType},
      pc.BackgroundImage AS ${purplePartyDbFields.BackgroundImage},
      pc.BackgroundColor AS ${purplePartyDbFields.BackgroundColor},
      pc.NameType AS ${purplePartyDbFields.NameType},
      pc.NameColor1 AS ${purplePartyDbFields.NameColor1},
      pc.NameColor2 AS ${purplePartyDbFields.NameColor2},

      si.PlayerName as ${purplePartyDbFields.SubmitterName},
      si.CharacterName as ${purplePartyDbFields.SubmitterCName},
      sc.NameType as ${purplePartyDbFields.SubmitterNameType},
      sc.NameColor1 as ${purplePartyDbFields.SubmitterNameColor1},
      sc.NameColor2 as ${purplePartyDbFields.SubmitterNameColor2},
      sc.PreferredName as ${purplePartyDbFields.SubmitterPrefN}

    FROM Purples.Party AS run
    INNER JOIN 
    Purples.PartyRunners AS pr ON run.${purplePartyDbFields.RunID} = pr.RunID

    INNER JOIN
    Players.Information AS pi ON pr.PlayerID = pi.PlayerID
    INNER JOIN 
    Players.Customization AS pc ON pr.PlayerID = pc.PlayerID
    
    INNER JOIN
    Players.Information AS si ON run.${purplePartyDbFields.SubmitterID} = si.PlayerID
    INNER JOIN
    Players.Customization AS sc ON run.${purplePartyDbFields.SubmitterID} = sc.PlayerID

    WHERE run.${purplePartyDbFields.Region} = @region AND 
      run.${purplePartyDbFields.Rank} = @rank AND 
      run.${purplePartyDbFields.PartySize} = @partySize
  `;

	if (filters.server) {
		query += ` AND pc.Server = @server`;
		request = request.input('server', sql.NVarChar, filters.server);
	}

	query += ` ORDER BY run.${purplePartyDbFields.Time} ASC, run.${purplePartyDbFields.SubmissionTime} ASC`;

	const region = regionDbMap[filters.region];
	request = request
		.input('region', sql.NVarChar, region)
		.input('rank', sql.Int, filters.rank)
		.input('partySize', sql.Int, partySize);

	const results = await request.query(query);
	return results.recordset as PurplePartyRunDbModel[];
};
