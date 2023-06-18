import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';
import type { IndomitableRunDbModel } from '../types/db/runs/duels/indomitable';
import type { IndomitableRunSearchFilter } from '../../types/api/validation/indomitableRunFilter';
import sql, { type Request } from 'mssql';
import { fields } from '../util/nameof';

const indomitableBosses: { [key: string]: IndomitableBoss } = {
	[IndomitableBoss.NexAelio]: IndomitableBoss.NexAelio,
	[IndomitableBoss.RenusRetem]: IndomitableBoss.RenusRetem,
	[IndomitableBoss.AmsKvaris]: IndomitableBoss.AmsKvaris,
	[IndomitableBoss.NilsStia]: IndomitableBoss.NilsStia,
	[IndomitableBoss.Halvaldi]: IndomitableBoss.Halvaldi
};

const dbFields = fields<IndomitableRunDbModel>();

export const getIndomitableRuns = async (
	request: Request,
	filters: IndomitableRunSearchFilter,
	boss: IndomitableBoss
) => {
	const duelBoss = indomitableBosses[boss];
	if (!duelBoss) {
		throw Error('Unknown boss');
	}

	let query = `
    SELECT
      run.Id as ${dbFields.Id},
      run.PlayerID as ${dbFields.PlayerID},
      run.RunCharacterName as ${dbFields.RunCharacterName},
      run.ShipOverride as ${dbFields.ShipOverride},
      run.Patch as ${dbFields.Patch},
      run.Boss as ${dbFields.Boss},
      run.Rank as ${dbFields.Rank},
      run.Augments as ${dbFields.Augments},
      run.RunTime as ${dbFields.RunTime},
      run.MainClass as ${dbFields.MainClass},
      run.SubClass as ${dbFields.SubClass},
      run.WeaponInfo1 as ${dbFields.WeaponInfo1},
      run.WeaponInfo2 as ${dbFields.WeaponInfo2},
      run.WeaponInfo3 as ${dbFields.WeaponInfo3},
      run.WeaponInfo4 as ${dbFields.WeaponInfo4},
      run.WeaponInfo5 as ${dbFields.WeaponInfo5},
      run.WeaponInfo6 as ${dbFields.WeaponInfo6},
      run.Link as ${dbFields.Link},
      run.Notes as ${dbFields.Notes},
      run.SubmissionTime as ${dbFields.SubmissionTime},
      run.SubmitterID as ${dbFields.SubmitterID},
      run.VideoTag as ${dbFields.VideoTag},
      run.ModNotes as ${dbFields.ModNotes},

      pi.PlayerName as ${dbFields.PlayerName},
      pi.CharacterName as ${dbFields.PlayerCName},
      pc.NameType as ${dbFields.PlayerNameType},
      pc.NameColor1 as ${dbFields.PlayerNameColor1},
      pc.NameColor2 as ${dbFields.PlayerNameColor2},
      pc.Server as ${dbFields.PlayerServer},
      pc.PreferredName as ${dbFields.PlayerPrefN},
      pc.Flag as ${dbFields.Flag},
      pc.Ship as ${dbFields.Ship},

      si.PlayerName as ${dbFields.SubmitterName},
      si.CharacterName as ${dbFields.SubmitterCName},
      sc.NameType as ${dbFields.SubmitterNameType},
      sc.NameColor1 as ${dbFields.SubmitterNameColor1},
      sc.NameColor2 as ${dbFields.SubmitterNameColor2},
      sc.PreferredName as ${dbFields.SubmitterPrefN}
    FROM IndomitableRuns AS run
        
    INNER JOIN
    Players.Information AS pi ON run.${dbFields.PlayerID} = pi.PlayerID
    INNER JOIN
    Players.Customization AS pc ON run.${dbFields.PlayerID} = pc.PlayerID

    INNER JOIN
    Players.Information AS si ON run.${dbFields.SubmitterID} = si.PlayerID
    INNER JOIN
    Players.Customization AS sc ON run.${dbFields.SubmitterID} = sc.PlayerID
    WHERE run.${dbFields.Boss} = @boss
`;
	request = request.input('boss', sql.NVarChar, duelBoss);

	if (filters.server) {
		query += ` AND pc.Server = @server`;
		request = request.input('server', sql.NVarChar, filters.server);
	}

	if (filters.class) {
		query += ` AND run.MainClass = @mainClass`;
		request = request.input('mainClass', sql.NVarChar, filters.class);
	}

	if (filters.augmentations && filters.augmentations.toLowerCase() == 'yes') {
		query += ` AND run.Augments = 1`;
	}
	if (filters.augmentations && filters.augmentations.toLowerCase() == 'no') {
		query += ` AND run.Augments = 0`;
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
		query += ` ORDER BY run.${dbFields.SubmissionTime} DESC`;
	} else {
		query += ` ORDER BY run.${dbFields.RunTime} ASC, run.${dbFields.SubmissionTime} ASC`;
	}

	query += ` OFFSET @offset ROWS FETCH NEXT @take ROWS ONLY`;

	const results = await request.query(query);
	return results.recordset as IndomitableRunDbModel[];
};
