import type { IndomitableRunDbModel } from '$lib/server/types/db/runs/duels/indomitable';
import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import { dbValToWeaponsMap } from '$lib/server/db/util/weaponType.js';
import { dbValToClassMap } from '$lib/server/db/util/ngsClass.js';
import { convertTimeToRunTime } from '$lib/server/db/util/datetime';

export const mapIndomitableToRun = (runs: IndomitableRunDbModel[]): IndomitableRun[] => {
	return runs.map((run, i) => {
		const player1: PlayerInfo = {
			playerId: parseInt(run.PlayerID),
			playerName: run.PlayerName,
			characterName: run.PlayerCName,
			preferredName: parseInt(run.PlayerPrefN),
			runCharacterName: run.RunCharacterName,
			mainClass: dbValToClassMap[run.MainClass],
			subClass: dbValToClassMap[run.SubClass],
			flag: run.Flag,
			ship: parseInt(run.Ship),
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
			preferredName: parseInt(run.SubmitterPrefN),
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
			time: convertTimeToRunTime(new Date(run.RunTime)),
			videoUrl: run.Link,
			players: [player1],
			submitter: submitter
		} as IndomitableRun;
	});
};
