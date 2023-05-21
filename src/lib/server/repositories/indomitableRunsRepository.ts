import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';
import type { IndomitableRunDbModel } from '../types/db/runs/duels/indomitable';
import type { IndomitableRunSearchFilter } from '../types/validation/indomitableRunFilter';
import type { Request } from 'mssql';
import { fields } from '../util/nameof';

const indomitableTables: { [key: string]: string } = {
	[IndomitableBoss.NexAelio]: 'IndomitableNexAelioRuns',
	[IndomitableBoss.RenusRetem]: 'IndomitableRenusRetemRuns',
	[IndomitableBoss.AmsKvaris]: 'IndomitableAmsKvarisRuns',
	[IndomitableBoss.NilsStia]: 'IndomitableNilsStiaRuns'
};

const indomitableDbFields = fields<IndomitableRunDbModel>();

export const getIndomitableRuns = async (
	request: Request,
	filters: IndomitableRunSearchFilter,
	boss: IndomitableBoss
) => {
	const table = indomitableTables[boss];
	if (!table) {
		throw Error('Unknown boss');
	}

	let query = `
    SELECT TOP (1000)
      run.Id as ${indomitableDbFields.Id},
      run.PlayerID as ${indomitableDbFields.PlayerID},
      run.RunCharacterName as ${indomitableDbFields.RunCharacterName},
      run.ShipOverride as ${indomitableDbFields.ShipOverride},
      run.Patch as ${indomitableDbFields.Patch},
      run.Region as ${indomitableDbFields.Region},
      run.Rank as ${indomitableDbFields.Rank},
      run.Augments as ${indomitableDbFields.Augments},
      run.RunTime as ${indomitableDbFields.RunTime},
      run.MainClass as ${indomitableDbFields.MainClass},
      run.SubClass as ${indomitableDbFields.SubClass},
      run.WeaponInfo1 as ${indomitableDbFields.WeaponInfo1},
      run.WeaponInfo2 as ${indomitableDbFields.WeaponInfo2},
      run.WeaponInfo3 as ${indomitableDbFields.WeaponInfo3},
      run.WeaponInfo4 as ${indomitableDbFields.WeaponInfo4},
      run.WeaponInfo5 as ${indomitableDbFields.WeaponInfo5},
      run.WeaponInfo6 as ${indomitableDbFields.WeaponInfo6},
      run.Link as ${indomitableDbFields.Link},
      run.Notes as ${indomitableDbFields.Notes},
      run.SubmissionTime as ${indomitableDbFields.SubmissionTime},
      run.SubmitterID as ${indomitableDbFields.SubmitterID},
      run.VideoTag as ${indomitableDbFields.VideoTag},
      run.ModNotes as ${indomitableDbFields.ModNotes},

      pi.PlayerName as ${indomitableDbFields.PlayerName},
      pi.CharacterName as ${indomitableDbFields.PlayerCName},
      pc.NameType as ${indomitableDbFields.PlayerNameType},
      pc.NameColor1 as ${indomitableDbFields.PlayerNameColor1},
      pc.NameColor2 as ${indomitableDbFields.PlayerNameColor2},
      pc.Server as ${indomitableDbFields.PlayerServer},
      pc.PreferredName as ${indomitableDbFields.PlayerPrefN},
      pc.Flag as ${indomitableDbFields.Flag},
      pc.Ship as ${indomitableDbFields.Ship},

      si.PlayerName as ${indomitableDbFields.SubmitterName},
      si.CharacterName as ${indomitableDbFields.SubmitterCName},
      sc.NameType as ${indomitableDbFields.SubmitterNameType},
      sc.NameColor1 as ${indomitableDbFields.SubmitterNameColor1},
      sc.NameColor2 as ${indomitableDbFields.SubmitterNameColor2},
      sc.PreferredName as ${indomitableDbFields.SubmitterPrefN}
    FROM ${table} AS run
        
    INNER JOIN
    Players.Information AS pi ON run.${indomitableDbFields.PlayerID} = pi.PlayerID
    INNER JOIN
    Players.Customization AS pc ON run.${indomitableDbFields.PlayerID} = pc.PlayerID

    INNER JOIN
    Players.Information AS si ON run.${indomitableDbFields.SubmitterID} = si.PlayerID
    INNER JOIN
    Players.Customization AS sc ON run.${indomitableDbFields.SubmitterID} = sc.PlayerID
    WHERE 1=1
`;

	if (filters.server) {
		query += ' AND run.Region = @region';
		request = request.input('region', filters.server);
	}

	if (filters.class) {
		query += ' AND run.MainClass = @mainClass';
		request = request.input('mainClass', filters.class);
	}

	if (filters.augmentations && filters.augmentations.toLowerCase() == 'yes') {
		query += ' AND run.Augments = 1';
	}
	if (filters.augmentations && filters.augmentations.toLowerCase() == 'no') {
		query += ' AND run.Augments = 0';
	}

	query += ' ORDER BY run.RunTime';

	const results = await request.query(query);
	return results.recordset as IndomitableRunDbModel[];
};
