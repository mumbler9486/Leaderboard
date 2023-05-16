import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
import { leaderboardDb } from '$lib/server/db/db';
import { error, json } from '@sveltejs/kit';
import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import { jsonError } from '$lib/server/error.js';
import { dbValToWeaponsMap } from '$lib/server/db/util/weaponType.js';
import { dbValToClassMap } from '$lib/server/db/util/ngsClass.js';
import type { PlayerInfo } from '$lib/types/api/playerInfo.js';
import { IndomitableBoss, parseIndomitableBoss } from '$lib/types/api/duels/indomitableBoss.js';

const indomitableTables: { [key: string]: string } = {
	[IndomitableBoss.NexAelio]: 'IndomitableNexAelioRuns',
	[IndomitableBoss.RenusRetem]: 'IndomitableRenusRetemRuns',
	[IndomitableBoss.AmsKvaris]: 'IndomitableAmsKvarisRuns',
	[IndomitableBoss.NilsStia]: 'IndomitableNilsStiaRuns'
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const boss = parseIndomitableBoss(params.boss);
	if (!boss) {
		return jsonError(404, 'Unknown boss');
	}
	const mainClass = url.searchParams.get('class');
	const region = url.searchParams.get('server');
	const augments = url.searchParams.get('augmentations');

	// Validate
	const table = indomitableTables[boss];
	if (!table) {
		throw error(404);
	}

	// Get data
	try {
		const pool = await leaderboardDb.connect();
		let request = await pool.request();
		let query = `
			SELECT TOP (1000)
				run.Id as Id,
				run.PlayerID as PlayerID,
				run.RunCharacterName as RunCharacterName,
				run.ShipOverride as ShipOverride,
				run.Patch as Patch,
				run.Region as Region,
				run.Rank as Rank,
				run.Augments as Augments,
				run.RunTime as RunTime,
				run.MainClass as MainClass,
				run.SubClass as SubClass,
				run.WeaponInfo1 as WeaponInfo1,
				run.WeaponInfo2 as WeaponInfo2,
				run.WeaponInfo3 as WeaponInfo3,
				run.WeaponInfo4 as WeaponInfo4,
				run.WeaponInfo5 as WeaponInfo5,
				run.WeaponInfo6 as WeaponInfo6,
				run.Link as Link,
				run.Notes as Notes,
				run.SubmissionTime as SubmissionTime,
				run.SubmitterID as SubmitterID,
				run.VideoTag as VideoTag,
				run.ModNotes as ModNotes,

				pi.PlayerName as PlayerName,
				pi.CharacterName as PlayerCName,
				pc.NameType as PlayerNameType,
				pc.NameColor1 as PlayerNameColor1,
				pc.NameColor2 as PlayerNameColor2,
				pc.Server as PlayerServer,
				pc.PreferredName as PlayerPrefN,
				pc.Flag as Flag,
				pc.Ship as Ship,

				si.PlayerName as SubmitterName,
				si.CharacterName as SubmitterCName,
				sc.NameType as SubmitterNameType,
				sc.NameColor1 as SubmitterNameColor1,
				sc.NameColor2 as SubmitterNameColor2,
				sc.PreferredName as SubmitterPrefN
			FROM ${table} AS run
					
			INNER JOIN
			Players.Information AS pi ON run.PlayerID = pi.PlayerID

			INNER JOIN
			Players.Customization AS pc ON run.PlayerID = pc.PlayerID

			INNER JOIN
			Players.Information AS si ON run.SubmitterID = si.PlayerID

			INNER JOIN
			Players.Customization AS sc ON run.SubmitterID = sc.PlayerID
			WHERE 1=1
		`;

		if (region && region != 'No Filter') {
			query += ' AND run.Region = @region';
			request = request.input('region', region);
		}

		if (mainClass && mainClass != 'No Filter') {
			query += ' AND run.MainClass = @mainClass';
			request = request.input('mainClass', mainClass);
		}

		if (augments && augments.toLowerCase() == 'yes') {
			query += ' AND run.Augments = 1';
		}
		if (augments && augments.toLowerCase() == 'no') {
			query += ' AND run.Augments = 0';
		}

		query += ' ORDER BY run.RunTime';

		const results = await request.query(query);
		const mapped = mapData(results.recordset);

		return json(mapped);
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const mapData = (queryData: any[]): IndomitableRun[] => {
	return queryData.map((run, i) => {
		const player1: PlayerInfo = {
			playerId: parseInt(run.PlayerID),
			playerName: run.PlayerName,
			characterName: run.PlayerCName,
			preferredName: run.PlayerPrefN,
			runCharacterName: run.RunCharacterName,
			mainClass: dbValToClassMap[run.MainClass],
			subClass: dbValToClassMap[run.SubClass],
			flag: run.Flag,
			ship: run.Ship,
			linkPov: run.Link,
			server: run.PlayerServer,
			nameType: parseInt(run.PlayerNameType),
			nameColor1: run.PlayerNameColor1,
			nameColor2: run.PlayerNameColor2,
			weapons: [
				run.WeaponInfo1,
				run.WeaponInfo2,
				run.WeaponInfo3,
				run.WeaponInfo4,
				run.WeaponInfo5,
				run.WeaponInfo6
			]
				.filter((w) => !!w)
				.map((w) => dbValToWeaponsMap[w == 'soaring blades' ? 'sb' : w]) //TODO make this weapon definition consistent
		};

		const submitter: PlayerInfo = {
			playerId: parseInt(run.SubmitterID),
			playerName: run.SubmitterName,
			characterName: run.SubmitterCName,
			preferredName: run.SubmitterPrefN,
			runCharacterName: '',
			mainClass: dbValToClassMap[run.MainClass],
			subClass: dbValToClassMap[run.SubClass],
			linkPov: undefined,
			server: undefined,
			flag: undefined,
			ship: undefined,
			nameType: parseInt(run.SubmitterNameType),
			nameColor1: run.SubmitterNameColor1,
			nameColor2: run.SubmitterNameColor2,
			weapons: []
		};

		return {
			runId: parseInt(run.Id),
			rank: i + 1,
			augments: parseInt(run.Augments) == 0 ? false : true,
			playerName: run.RunCharacterName,
			notes: run.Notes,
			modNotes: run.ModNotes,
			server: run.Region,
			time: convertTimeToRunTime(run.RunTime),
			videoUrl: run.Link,
			players: [player1],
			submitter: submitter
		} as IndomitableRun;
	});
};
