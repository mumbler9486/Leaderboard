import type { DfaPartyRunDbModel } from '$lib/server/types/db/runs/dfa/dfaParty';
import type { DfaSoloRunDbModel } from '$lib/server/types/db/runs/dfa/dfaSolo';
import sql, { type Request } from 'mssql';
import { fields } from '../util/nameof';
import type { DfaPartySearchFilter, DfaSoloSearchFilter } from '../types/validation/dfaRunFilter';

const dfaPartyDbFields = fields<DfaPartyRunDbModel>();
const dfaSoloDbFields = fields<DfaSoloRunDbModel>();

const triggerDbMap: { [key: string]: number } = {
	trigger: 1,
	urgent: 0
};

export const getDfaSoloRuns = async (request: Request, filters: DfaSoloSearchFilter) => {
	let query = `
    SELECT
      run.${dfaSoloDbFields.RunID},
      run.${dfaSoloDbFields.PlayerID},
      run.${dfaSoloDbFields.RunCharacterName},
      run.${dfaSoloDbFields.Patch},
      run.${dfaSoloDbFields.Rank},
      run.${dfaSoloDbFields.Time},
      run.${dfaSoloDbFields.Buff},
      run.${dfaSoloDbFields.MainClass},
      run.${dfaSoloDbFields.SubClass},
      run.${dfaSoloDbFields.WeaponInfo1},
      run.${dfaSoloDbFields.WeaponInfo2},
      run.${dfaSoloDbFields.WeaponInfo3},
      run.${dfaSoloDbFields.WeaponInfo4},
      run.${dfaSoloDbFields.WeaponInfo5},
      run.${dfaSoloDbFields.WeaponInfo6},
      run.${dfaSoloDbFields.Link},
      run.${dfaSoloDbFields.Notes},
      run.${dfaSoloDbFields.ModNotes},
      run.${dfaSoloDbFields.SubmitterID},
      run.${dfaSoloDbFields.SubmissionTime},
      run.${dfaSoloDbFields.VideoTag},
      run.${dfaSoloDbFields.Drill},

      pi.PlayerName AS ${dfaSoloDbFields.PlayerName},
      pi.CharacterName AS ${dfaSoloDbFields.CharacterName},
      pi.Description AS ${dfaSoloDbFields.Description},
      pi.Youtube AS ${dfaSoloDbFields.Youtube},
      pi.Twitch AS ${dfaSoloDbFields.Twitch},
      pi.Twitter AS ${dfaSoloDbFields.Twitter},
      pi.Discord AS ${dfaSoloDbFields.Discord},

      pc.PreferredName AS ${dfaSoloDbFields.PreferredName},
      pc.Server AS ${dfaSoloDbFields.Server},
      pc.Ship AS ${dfaSoloDbFields.Ship},
      pc.Flag AS ${dfaSoloDbFields.Flag},
      pc.BackgroundType AS ${dfaSoloDbFields.BackgroundType},
      pc.BackgroundImage AS ${dfaSoloDbFields.BackgroundImage},
      pc.BackgroundColor AS ${dfaSoloDbFields.BackgroundColor},
      pc.NameType AS ${dfaSoloDbFields.NameType},
      pc.NameColor1 AS ${dfaSoloDbFields.NameColor1},
      pc.NameColor2 AS ${dfaSoloDbFields.NameColor2},

      si.PlayerName as ${dfaSoloDbFields.SubmitterName},
      si.CharacterName as ${dfaSoloDbFields.SubmitterCName},
      sc.NameType as ${dfaSoloDbFields.SubmitterNameType},
      sc.NameColor1 as ${dfaSoloDbFields.SubmitterNameColor1},
      sc.NameColor2 as ${dfaSoloDbFields.SubmitterNameColor2},
      sc.PreferredName as ${dfaSoloDbFields.SubmitterPrefN}

    FROM DFAegis.Solo AS run

    INNER JOIN
    Players.Information AS pi ON run.${dfaSoloDbFields.PlayerID} = pi.PlayerID
    INNER JOIN 
    Players.Customization AS pc ON run.${dfaSoloDbFields.PlayerID} = pc.PlayerID
    
    INNER JOIN
    Players.Information AS si ON run.${dfaSoloDbFields.SubmitterID} = si.PlayerID
    INNER JOIN
    Players.Customization AS sc ON run.${dfaSoloDbFields.SubmitterID} = sc.PlayerID
    
    WHERE 1=1`;

	if (filters.trigger) {
		const trigger = triggerDbMap[filters.trigger];
		query += ` AND run.${dfaSoloDbFields.Drill} = @trigger`;
		request = request.input('trigger', sql.Int, trigger);
	}

	if (filters.server) {
		query += ` AND pc.Server = @server`;
		request = request.input('server', sql.NVarChar, filters.server);
	}

	if (filters.class) {
		query += ` AND run.${dfaSoloDbFields.MainClass} = @mainClass`;
		request = request.input('mainClass', sql.NVarChar, filters.class);
	}

	if (filters.buff) {
		query += ` AND run.${dfaSoloDbFields.Buff} = @buff`;
		request = request.input('buff', sql.NVarChar, filters.buff);
	}

	if (filters.take) {
		request = request.input('take', sql.Int, filters.take);
	} else {
		request = request.input('take', sql.Int, 30000);
	}

	if (filters.page && filters.take) {
		request = request.input('offset', sql.Int, filters.page * filters.take);
	} else {
		request = request.input('offset', sql.Int, 0);
	}

	if (filters.sort === 'recent') {
		query += ` ORDER BY run.${dfaSoloDbFields.SubmissionTime} DESC`;
	} else {
		query += ` ORDER BY run.${dfaSoloDbFields.Time} ASC, run.${dfaSoloDbFields.SubmissionTime} ASC`;
	}

	query += ` OFFSET @offset ROWS FETCH NEXT @take ROWS ONLY`;

	const results = await request.query(query);
	return results.recordset as DfaSoloRunDbModel[];
};

export const getDfaDuoRuns = async (request: Request, filters: DfaPartySearchFilter) =>
	getDfaPartyRuns(request, filters, 2);

export const getDfaPartyRuns = async (
	request: Request,
	filters: DfaPartySearchFilter,
	partySize: 2 | 8 = 8
) => {
	let query = `
    SELECT 
      run.${dfaPartyDbFields.RunID},
      run.${dfaPartyDbFields.PartySize},
      run.${dfaPartyDbFields.Patch},
      run.${dfaPartyDbFields.Rank},
      run.${dfaPartyDbFields.Time},
      run.${dfaPartyDbFields.Notes},
      run.${dfaPartyDbFields.RunServer},
      run.${dfaPartyDbFields.SubmissionTime},
      run.${dfaPartyDbFields.SubmitterID},
      run.${dfaPartyDbFields.ModNotes},
      run.${dfaPartyDbFields.Buff},
      run.${dfaPartyDbFields.Drill},
      run.${dfaPartyDbFields.UpdateID},

      pr.${dfaPartyDbFields.PlayerID},
      pr.${dfaPartyDbFields.RunCharacterName},
      pr.${dfaPartyDbFields.MainClass},
      pr.${dfaPartyDbFields.SubClass},
      pr.${dfaPartyDbFields.LinkPOV},

      pi.PlayerName AS ${dfaPartyDbFields.PlayerName},
      pi.CharacterName AS ${dfaPartyDbFields.CharacterName},
      pi.Description AS ${dfaPartyDbFields.Description},
      pi.Youtube AS ${dfaPartyDbFields.Youtube},
      pi.Twitch AS ${dfaPartyDbFields.Twitch},
      pi.Twitter AS ${dfaPartyDbFields.Twitter},
      pi.Discord AS ${dfaPartyDbFields.Discord},

      pc.PreferredName AS ${dfaPartyDbFields.PreferredName},
      pc.Server AS ${dfaPartyDbFields.Server},
      pc.Ship AS ${dfaPartyDbFields.Ship},
      pc.Flag AS ${dfaPartyDbFields.Flag},
      pc.BackgroundType AS ${dfaPartyDbFields.BackgroundType},
      pc.BackgroundImage AS ${dfaPartyDbFields.BackgroundImage},
      pc.BackgroundColor AS ${dfaPartyDbFields.BackgroundColor},
      pc.NameType AS ${dfaPartyDbFields.NameType},
      pc.NameColor1 AS ${dfaPartyDbFields.NameColor1},
      pc.NameColor2 AS ${dfaPartyDbFields.NameColor2},

      si.PlayerName as ${dfaPartyDbFields.SubmitterName},
      si.CharacterName as ${dfaPartyDbFields.SubmitterCName},
      sc.NameType as ${dfaPartyDbFields.SubmitterNameType},
      sc.NameColor1 as ${dfaPartyDbFields.SubmitterNameColor1},
      sc.NameColor2 as ${dfaPartyDbFields.SubmitterNameColor2},
      sc.PreferredName as ${dfaPartyDbFields.SubmitterPrefN}

    FROM DFAegis.Party AS run
    INNER JOIN 
    DFAegis.PartyRunners AS pr ON run.${dfaPartyDbFields.RunID} = pr.RunID

    INNER JOIN
    Players.Information AS pi ON pr.PlayerID = pi.PlayerID
    INNER JOIN 
    Players.Customization AS pc ON pr.PlayerID = pc.PlayerID
    
    INNER JOIN
    Players.Information AS si ON run.${dfaPartyDbFields.SubmitterID} = si.PlayerID
    INNER JOIN
    Players.Customization AS sc ON run.${dfaPartyDbFields.SubmitterID} = sc.PlayerID
    
    WHERE run.${dfaPartyDbFields.PartySize} = @partySize`;

	request = request.input('partySize', sql.Int, partySize);

	if (filters.trigger) {
		const trigger = triggerDbMap[filters.trigger];
		query += ` AND run.${dfaPartyDbFields.Drill} = @trigger`;
		request = request.input('trigger', sql.Int, trigger);
	}

	if (filters.server) {
		query += ` AND pc.Server = @server`;
		request = request.input('server', sql.NVarChar, filters.server);
	}

	if (filters.buff) {
		query += ` AND run.${dfaPartyDbFields.Buff} = @buff`;
		request = request.input('buff', sql.NVarChar, filters.buff);
	}

	if (filters.take) {
		request = request.input('take', sql.Int, filters.take * partySize);
	} else {
		request = request.input('take', sql.Int, 30000);
	}

	if (filters.page && filters.take) {
		request = request.input('offset', sql.Int, filters.page * filters.take * partySize);
	} else {
		request = request.input('offset', sql.Int, 0);
	}

	if (filters.sort === 'recent') {
		query += ` ORDER BY run.${dfaPartyDbFields.SubmissionTime} DESC`;
	} else {
		query += ` ORDER BY run.${dfaPartyDbFields.Time} ASC, run.${dfaPartyDbFields.SubmissionTime} ASC`;
	}

	query += ` OFFSET @offset ROWS FETCH NEXT @take ROWS ONLY`;

	const results = await request.query(query);
	return results.recordset as DfaPartyRunDbModel[];
};
