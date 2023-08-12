import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import type { GetRunDbModel } from '$lib/server/repositories/runsRepository';
import { mapDbValToGame } from '$lib/server/types/db/runs/game';
import { mapDbValToNgsClass } from '$lib/server/types/db/runs/ngsClasses';
import { mapDbValToServerRegion } from '$lib/server/types/db/runs/serverRegions';
import { mapDbValToWeapon, type NgsWeaponDbValue } from '$lib/server/types/db/runs/weapons';
import type { PartyMember, PlayerInfo2, DfSolusRun } from '$lib/types/api/runs/run';

export const mapRuns = (getRun: GetRunDbModel[]): DfSolusRun[] => {
	const groupedRuns = getRun.reduce((prev, curr) => {
		if (!prev[curr.RunId]) {
			prev[curr.RunId] = [];
		}
		prev[curr.RunId].push(curr);
		return prev;
	}, {} as { [runId: string]: GetRunDbModel[] });

	const sortedGroups = Object.entries(groupedRuns).sort((g1, g2) =>
		new Date(g1[1][0].RunTime) > new Date(g2[1][0].RunTime) ? 1 : -1
	);

	const mapped = sortedGroups.map((runGroup, i) => {
		if (!runGroup[1] || runGroup[1].length == 0) {
			console.error(`Run is null/invalid RunID=${runGroup[0]}`, runGroup);
		}
		const runId = runGroup[0];
		const run = runGroup[1];
		const runMeta = run[0];

		const party: PartyMember[] = run.map((rg) => {
			const weapons = !!rg.PartyWeapons
				? (JSON.parse(rg.PartyWeapons) as NgsWeaponDbValue[]).map(mapDbValToWeapon)
				: [];
			return {
				playerId: parseInt(rg.PartyPlayerId),
				playerName: rg.PlayerName,
				runCharacterName: rg.PartyRunCharacterName,
				mainClass: mapDbValToNgsClass(rg.PartyMainClass),
				subClass: mapDbValToNgsClass(rg.PartySubClass),
				linkPov: rg.PartyPovLink,
				weapons: weapons,
				playerInfo: {
					playerId: parseInt(rg.PartyPlayerId),
					ship: parseInt(rg.PlayerShip),
					flag: rg.PlayerFlag,
					server: !!rg.RunServerRegion ? mapDbValToServerRegion(rg.RunServerRegion) : undefined,
					name: rg.PlayerName,
					characterName: rg.PlayerCharacterName,
					preferredNameType: parseInt(rg.PlayerPreferredNameType),
					nameEffectType: parseInt(rg.PlayerNameEffectType),
					nameColor1: rg.PlayerNameColor1,
					nameColor2: rg.PlayerNameColor2
				}
			} satisfies PartyMember;
		});

		const submitter: PlayerInfo2 = {
			playerId: parseInt(runMeta.PartyPlayerId),
			ship: parseInt(runMeta.SubmitterShip),
			flag: runMeta.SubmitterFlag,
			name: runMeta.SubmitterName,
			characterName: runMeta.SubmitterCharacterName,
			preferredNameType: parseInt(runMeta.SubmitterPreferredNameType),
			nameEffectType: parseInt(runMeta.SubmitterNameEffectType),
			nameColor1: runMeta.SubmitterNameColor1,
			nameColor2: runMeta.SubmitterNameColor2
		};

		const runTime = convertTimeToRunTime(new Date(runMeta.RunTime));

		const submission: DfSolusRun = {
			rank: i + 1,
			runId: parseInt(runId),
			game: mapDbValToGame(runMeta.RunGame),
			serverRegion: mapDbValToServerRegion(runMeta.RunServerRegion),
			quest: runMeta.RunQuest,
			category: runMeta.RunCategory,
			patch: runMeta.RunPatch,
			party: party,
			time: runTime,
			notes: runMeta.RunNotes,
			modNotes: runMeta.RunModNotes,
			questRank: parseInt(runMeta.RunQuestRank),
			submitter: submitter,
			submissionDate: runMeta.RunSubmissionDate,
			submissionStatus: parseInt(runMeta.RunSubmissionStatus),
			dateApproved: runMeta.RunDateApproved
		};

		return submission;
	});

	return mapped;
};
