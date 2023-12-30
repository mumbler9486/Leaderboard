import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import type { GetRunDbModel } from '$lib/server/types/db/runs/getRun';
import { Game, parseGame } from '$lib/types/api/game';
import { NgsPlayerClass, parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { runTimeEqual, type RunTime } from '$lib/types/api/runTime';
import type { PartyMember, PlayerInfo, Run } from '$lib/types/api/runs/run';
import { parseServerRegion } from '$lib/types/api/serverRegions';
import { parseNgsWeapon, type NgsWeapon } from '$lib/types/api/weapon';

export const mapRuns = (getRun: GetRunDbModel[]): Run<unknown>[] => {
	const groupedRuns = Object.entries(
		getRun.reduce(
			(prev, curr) => {
				if (!prev[curr.run_id]) {
					prev[curr.run_id] = [];
				}
				prev[curr.run_id].push(curr);
				return prev;
			},
			{} as { [runId: string]: GetRunDbModel[] }
		)
	).sort((g1, g2) => {
		const g1RankNum = parseInt(g1[1][0].run_meta_group_num);
		const g2RankNum = parseInt(g2[1][0].run_meta_group_num);

		if (g1RankNum == g2RankNum) {
			return 0;
		}

		return g1RankNum > g2RankNum ? 1 : -1;
	});

	let currentRank = 0;
	let lastTime: RunTime = { hours: -1, minutes: -1, seconds: -1 };

	const mapped = groupedRuns.map((runGroup, i) => {
		if (!runGroup[1] || runGroup[1].length == 0) {
			console.error(`Run is null/invalid RunID=${runGroup[0]}`, runGroup);
		}
		const runId = runGroup[0];
		const run = runGroup[1];
		const runMeta = run[0];
		const runTime = runMeta.run_time;

		let runRank = currentRank;

		if (!runTimeEqual(lastTime, runTime)) {
			currentRank++;
			runRank = currentRank;
			lastTime = runTime;
		}

		const party: PartyMember[] = run.map((rg) => {
			const weapons = !!rg.party_weapons
				? (rg.party_weapons as NgsWeapon[]).map(parseNgsWeapon)
				: [];
			return {
				playerId: !!rg.party_player_id ? parseInt(rg.party_player_id) : undefined,
				playerName: rg.player_name,
				runCharacterName: rg.party_run_character_name,
				mainClass: parseNgsPlayerClass(rg.party_main_class) ?? NgsPlayerClass.Unknown,
				subClass: parseNgsPlayerClass(rg.party_sub_class) ?? NgsPlayerClass.Unknown,
				linkPov: rg.party_pov_link,
				weapons: weapons,
				//TODO make player info nullable as player may not exist
				playerInfo: {
					playerId: parseInt(rg.party_player_id),
					ship: parseInt(rg.player_ship),
					flag: rg.player_flag,
					server: parseServerRegion(rg.player_server),
					name: rg.player_name,
					characterName: rg.player_character_name,
					preferredNameType: parseInt(rg.player_preferred_name_type),
					nameEffectType: parseInt(rg.player_name_effect_type),
					nameColor1: rg.player_name_color1,
					nameColor2: rg.player_name_color2,
				},
			} satisfies PartyMember;
		});

		const submitter: PlayerInfo = {
			playerId: parseInt(runMeta.party_player_id),
			ship: parseInt(runMeta.submitter_ship),
			flag: runMeta.submitter_flag,
			name: runMeta.submitter_name,
			characterName: runMeta.submitter_character_name,
			preferredNameType: parseInt(runMeta.submitter_preferred_name_type),
			nameEffectType: parseInt(runMeta.submitter_name_effect_type),
			nameColor1: runMeta.submitter_name_color1,
			nameColor2: runMeta.submitter_name_color2,
		};

		const submission: Run = {
			rank: runRank,
			runId: parseInt(runId),
			game: parseGame(runMeta.run_game) ?? Game.Unknown,
			serverRegion: parseServerRegion(runMeta.run_server_region),
			quest: runMeta.run_quest,
			category: runMeta.run_category,
			patch: runMeta.run_patch,
			party: party,
			time: runTime,
			notes: runMeta.run_notes,
			modNotes: runMeta.run_mod_notes,
			questRank: parseInt(runMeta.run_quest_rank),
			submitter: submitter,
			submissionDate: runMeta.run_submission_date,
			submissionStatus: parseInt(runMeta.run_submission_status),
			dateReviewed: runMeta.run_date_reviewed,
			reviewedBy: runMeta.run_reviewed_by,
			details: !runMeta.run_attributes ? undefined : JSON.parse(runMeta.run_attributes),
		};

		return submission;
	});

	return mapped;
};
