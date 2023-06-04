import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import { dbValToClassMap } from '$lib/server/db/util/ngsClass';
import { dbValToWeaponsMap } from '$lib/server/db/util/weaponType';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import type { DfaSoloRunDbModel } from '$lib/server/types/db/runs/dfa/dfaSolo';
import type { DfaPartyRunDbModel } from '$lib/server/types/db/runs/dfa/dfaParty';
import type { DfaRun } from '$lib/types/api/dfa/dfa';

const triggerDbMap: { [key: string]: string } = {
	'1': 'trigger',
	'0': 'uq'
};

export const mapDfaSoloToRun = (runs: DfaSoloRunDbModel[]): DfaRun[] => {
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

		const submitter: PlayerInfo = {
			playerId: parseInt(s.SubmitterID),
			playerName: s.SubmitterName,
			characterName: s.SubmitterCName,
			preferredName: parseInt(s.SubmitterPrefN),
			runCharacterName: '',
			mainClass: dbValToClassMap[s.MainClass],
			subClass: dbValToClassMap[s.SubClass],
			linkPov: undefined,
			server: undefined,
			flag: undefined,
			ship: undefined,
			nameType: parseInt(s.SubmitterNameType),
			nameColor1: s.SubmitterNameColor1,
			nameColor2: s.SubmitterNameColor2,
			weapons: []
		};

		const players = [player1];

		const runTime = convertTimeToRunTime(new Date(s.Time));

		const submission: DfaRun = {
			runId: parseInt(s.RunID),
			patch: s.Patch,
			support: s.Buff,
			drill: triggerDbMap[s.Drill],
			time: runTime,
			players: players,
			submitter: submitter,
			notes: s.Notes,
			rank: i + 1,
			submissionTime: s.SubmissionTime
		};

		return submission;
	});
	return mapped;
};

export const mapDfaPartyToRun = (runs: DfaPartyRunDbModel[]): DfaRun[] => {
	const groupedRuns = runs.reduce((prev, curr) => {
		if (!prev[curr.RunID]) {
			prev[curr.RunID] = [];
		}
		prev[curr.RunID].push(curr);
		return prev;
	}, {} as { [runId: string]: DfaPartyRunDbModel[] });

	const sortedGroups = Object.entries(groupedRuns).sort((g1, g2) =>
		new Date(g1[1][0].Time) > new Date(g2[1][0].Time) ? 1 : -1
	);

	const mapped = sortedGroups.map((runGroup, i) => {
		if (!runGroup[1] || runGroup[1].length == 0) {
			console.error(`Run is null/invalid RunID=${runGroup[0]}`, runGroup);
		}
		const runId = runGroup[0];
		const run = runGroup[1];
		const runMeta = run[0];

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

		const submitter: PlayerInfo = {
			playerId: parseInt(runMeta.SubmitterID),
			playerName: runMeta.SubmitterName,
			characterName: runMeta.SubmitterCName,
			preferredName: parseInt(runMeta.SubmitterPrefN),
			runCharacterName: '',
			mainClass: dbValToClassMap[runMeta.MainClass],
			subClass: dbValToClassMap[runMeta.SubClass],
			linkPov: undefined,
			server: undefined,
			flag: undefined,
			ship: undefined,
			nameType: parseInt(runMeta.SubmitterNameType),
			nameColor1: runMeta.SubmitterNameColor1,
			nameColor2: runMeta.SubmitterNameColor2,
			weapons: []
		};

		const runTime = convertTimeToRunTime(new Date(runMeta.Time));

		const submission: DfaRun = {
			runId: parseInt(runMeta.RunID),
			patch: runMeta.Patch,
			support: runMeta.Buff,
			drill: triggerDbMap[runMeta.Drill],
			time: runTime,
			players: players,
			submitter: submitter,
			notes: runMeta.Notes,
			rank: i + 1,
			submissionTime: runMeta.SubmissionTime
		};

		return submission;
	});

	return mapped;
};
