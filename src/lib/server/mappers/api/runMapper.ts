import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import type { GetRunDbModel } from '$lib/server/types/db/runs/getRun';
import { Game, parseGame } from '$lib/types/api/game';
import { NgsPlayerClass, parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { runTimeEqual, type RunTime } from '$lib/types/api/runTime';
import type { PartyMember, PlayerInfo, Run } from '$lib/types/api/runs/run';
import { parseServerRegion } from '$lib/types/api/serverRegions';
import { parseNgsWeapon, type NgsWeapon } from '$lib/types/api/weapon';

export const mapRuns = (getRun: GetRunDbModel[]): Run<unknown>[] => {
	const groupedRuns = getRun.reduce(
		(prev, curr) => {
			if (!prev[curr.RunId]) {
				prev[curr.RunId] = [];
			}
			prev[curr.RunId].push(curr);
			return prev;
		},
		{} as { [runId: string]: GetRunDbModel[] }
	);

	const sortedGroups = Object.entries(groupedRuns).sort((g1, g2) =>
		new Date(g1[1][0].RunTime) > new Date(g2[1][0].RunTime) ? 1 : -1
	);

	let currentRank = 0;
	let lastTime: RunTime = { hours: -1, minutes: -1, seconds: -1 };

	const mapped = sortedGroups.map((runGroup, i) => {
		if (!runGroup[1] || runGroup[1].length == 0) {
			console.error(`Run is null/invalid RunID=${runGroup[0]}`, runGroup);
		}
		const runId = runGroup[0];
		const run = runGroup[1];
		const runMeta = run[0];
		const runTime = convertTimeToRunTime(new Date(runMeta.RunTime));

		let runRank = currentRank;

		if (!runTimeEqual(lastTime, runTime)) {
			currentRank++;
			runRank = currentRank;
			lastTime = runTime;
		}

		const party: PartyMember[] = run.map((rg) => {
			const weapons = !!rg.PartyWeapons
				? (JSON.parse(rg.PartyWeapons) as NgsWeapon[]).map(parseNgsWeapon)
				: [];
			return {
				playerId: !!rg.PartyPlayerId ? parseInt(rg.PartyPlayerId) : undefined,
				playerName: rg.PlayerName,
				runCharacterName: rg.PartyRunCharacterName,
				mainClass: parseNgsPlayerClass(rg.PartyMainClass) ?? NgsPlayerClass.Unknown,
				subClass: parseNgsPlayerClass(rg.PartySubClass) ?? NgsPlayerClass.Unknown,
				linkPov: rg.PartyPovLink,
				weapons: weapons,
				//TODO make player info nullable as player may not exist
				playerInfo: {
					playerId: parseInt(rg.PartyPlayerId),
					ship: parseInt(rg.PlayerShip),
					flag: rg.PlayerFlag,
					server: parseServerRegion(rg.PlayerServer),
					name: rg.PlayerName,
					characterName: rg.PlayerCharacterName,
					preferredNameType: parseInt(rg.PlayerPreferredNameType),
					nameEffectType: parseInt(rg.PlayerNameEffectType),
					nameColor1: rg.PlayerNameColor1,
					nameColor2: rg.PlayerNameColor2
				}
			} satisfies PartyMember;
		});

		const submitter: PlayerInfo = {
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

		const submission: Run = {
			rank: runRank,
			runId: parseInt(runId),
			game: parseGame(runMeta.RunGame) ?? Game.Unknown,
			serverRegion: parseServerRegion(runMeta.RunServerRegion),
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
			dateApproved: runMeta.RunDateApproved,
			details: !runMeta.RunAttributes ? undefined : JSON.parse(runMeta.RunAttributes)
		};

		return submission;
	});

	return mapped;
};
