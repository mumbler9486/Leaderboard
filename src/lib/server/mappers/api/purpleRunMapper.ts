import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import { dbValToClassMap } from '$lib/server/db/util/ngsClass';
import { dbValToWeaponsMap } from '$lib/server/db/util/weaponType';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import type { DfaRun } from '$lib/types/api/dfa/dfa';
import type { PurpleSoloRunDbModel } from '$lib/server/types/db/runs/purple/purpleSolo';
import type { PurplePartyRunDbModel } from '$lib/server/types/db/runs/purple/purpleParty';
import type { PurpleRun } from '$lib/types/api/purples/purples';

const triggerDbMap: { [key: string]: string } = {
	'1': 'trigger',
	'0': 'uq'
};

export const mapPurpleSoloToRun = (runs: PurpleSoloRunDbModel[]): PurpleRun[] => {
	const mapped = runs.map((s, i) => {
		const player1: PlayerInfo = {
			playerId: parseInt(s.PlayerID),
			playerName: s.PlayerName,
			characterName: s.CharacterName,
			preferredName: parseInt(s.PreferredName),
			runCharacterName: s.RunCharacterName,
			mainClass: dbValToClassMap[s.MainClass],
			subClass: dbValToClassMap[s.SubClass],
			flag: s.Flag,
			ship: parseInt(s.Ship),
			linkPov: s.Link,
			server: s.Server,
			nameType: parseInt(s.NameType),
			nameColor1: s.NameColor1,
			nameColor2: s.NameColor2,
			weapons: [
				s.WeaponInfo1,
				s.WeaponInfo2,
				s.WeaponInfo3,
				s.WeaponInfo4,
				s.WeaponInfo5,
				s.WeaponInfo6
			]
				.filter((w) => !!w)
				.map((w) => dbValToWeaponsMap[w == 'soaring blades' ? 'sb' : w]) //TODO make this weapon definition consistent
		};

		const players = [player1];

		const runTime = convertTimeToRunTime(new Date(s.Time));
		runTime.seconds = runTime.minutes;
		runTime.minutes = runTime.hours;
		runTime.hours = 0;

		const submission: PurpleRun = {
			runId: parseInt(s.RunID),
			rank: parseInt(s.Rank),
			runRank: i + 1,
			server: s.Server,
			time: runTime,
			notes: s.Notes,
			modNotes: s.ModNotes,
			players: players,
			submitter: undefined //TODO
		};

		return submission;
	});
	return mapped;
};

export const mapPurplePartyToRun = (runs: PurplePartyRunDbModel[]): PurpleRun[] => {
	const groupedRuns = runs.reduce((prev, curr) => {
		if (!prev[curr.RunID]) {
			prev[curr.RunID] = [];
		}
		prev[curr.RunID].push(curr);
		return prev;
	}, {} as { [runId: string]: PurplePartyRunDbModel[] });

	const sortedGroups = Object.entries(groupedRuns).sort((g1, g2) =>
		new Date(g1[1][0].Time) > new Date(g2[1][0].Time) ? 1 : -1
	);

	const mapped = sortedGroups.map((runGroup, i) => {
		if (!runGroup[1] || runGroup[1].length == 0) {
			console.error(`Run is null/invalid RunID=${runGroup[0]}`, runGroup);
		}
		const runId = runGroup[0];
		const run = runGroup[1];

		const players: PlayerInfo[] = run.map((r) => ({
			playerId: parseInt(r.PlayerID),
			playerName: r.PlayerName,
			characterName: r.CharacterName,
			preferredName: parseInt(r.PreferredName),
			runCharacterName: r.RunCharacterName,
			mainClass: dbValToClassMap[r.MainClass],
			subClass: dbValToClassMap[r.SubClass],
			flag: r.Flag,
			ship: parseInt(r.Ship),
			linkPov: r.LinkPOV,
			server: r.Server,
			nameType: parseInt(r.NameType),
			nameColor1: r.NameColor1,
			nameColor2: r.NameColor2,
			weapons: []
		}));

		const runMeta = run[0];
		const runTime = convertTimeToRunTime(new Date(runMeta.Time));
		runTime.seconds = runTime.minutes;
		runTime.minutes = runTime.hours;
		runTime.hours = 0;

		const submission: PurpleRun = {
			runId: parseInt(runMeta.RunID),
			rank: parseInt(runMeta.Rank),
			runRank: i + 1,
			server: runMeta.Server,
			time: runTime,
			notes: runMeta.Notes,
			modNotes: runMeta.ModNotes,
			players: players,
			submitter: undefined //TODO
		};

		return submission;
	});

	return mapped;
};
