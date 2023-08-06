import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import type { GetRunDbModel } from '$lib/server/repositories/runsRepository';
import { mapDbValToGame } from '$lib/server/types/db/runs/game';
import { mapDbValToNgsClass } from '$lib/server/types/db/runs/ngsClasses';
import { mapDbValToWeapon, type NgsWeaponDbValue } from '$lib/server/types/db/runs/weapons';
import type { PartyMember, PlayerInfo2, VenogiaRun } from '$lib/types/api/runs/run';

export const mapRuns = (getRun: GetRunDbModel[]): VenogiaRun[] => {
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

		const party: PartyMember[] = run.map((member) => {
			const weapons = !!member.PartyWeapons
				? (JSON.parse(member.PartyWeapons) as NgsWeaponDbValue[]).map(mapDbValToWeapon)
				: [];
			return {
				playerId: parseInt(member.PartyPlayerId),
				playerName: member.PlayerName,
				runCharacterName: member.PartyRunCharacterName,
				mainClass: mapDbValToNgsClass(member.PartyMainClass),
				subClass: mapDbValToNgsClass(member.PartySubClass),
				linkPov: member.PartyPovLink,
				weapons: weapons,
				playerInfo: {
					playerId: parseInt(member.PartyPlayerId),
					ship: parseInt(member.PlayerShip),
					flag: member.PlayerShip,
					characterName: member.PlayerCharacterName,
					preferredNameType: parseInt(member.PlayerPreferredNameType),
					nameEffectType: parseInt(member.PlayerNameEffectType),
					nameColor1: member.PlayerNameColor1,
					nameColor2: member.PlayerNameColor2
				}
			} satisfies PartyMember;
		});

		const submitter: PlayerInfo2 = {
			playerId: parseInt(runMeta.PartyPlayerId),
			ship: parseInt(runMeta.SubmitterShip),
			flag: runMeta.SubmitterShip,
			characterName: runMeta.SubmitterCharacterName,
			preferredNameType: parseInt(runMeta.SubmitterPreferredNameType),
			nameEffectType: parseInt(runMeta.SubmitterNameEffectType),
			nameColor1: runMeta.SubmitterNameColor1,
			nameColor2: runMeta.SubmitterNameColor2
		};

		const runTime = convertTimeToRunTime(new Date(runMeta.RunTime));

		const submission: VenogiaRun = {
			rank: i + 1,
			runId: parseInt(runId),
			game: mapDbValToGame(runMeta.RunGame),
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
