<script lang="ts">
	import { t } from 'svelte-i18n';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { copyQueryParams } from '$lib/utils/queryParams';
	import type { PurpleRun } from '$lib/types/api/purples/purples';
	import type { DfaRun } from '$lib/types/api/dfa/dfa';
	import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
	import type { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import type { PlayerInfo } from '$lib/types/api/playerInfo';
	import type { RunTime } from '$lib/types/api/runTime';
	import type { DfSolusRun, PartyMember } from '$lib/types/api/runs/run';
	import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';

	const take = 10;

	interface RecentRun {
		mainClass: NgsPlayerClass;
		player: PlayerInfo;
		time: RunTime;
		category: string;
		submissionTime: Date;
	}

	const categoryMap: { [key: string]: string } = {
		aelio: 'Purple Aelio R.',
		retem: 'Purple Retem R.',
		kvaris: 'Purple Kvaris R.',
		stia: 'Purple Stia R.',
		dfasolo: 'DFA Solo',
		nexaelio: 'Duel Nex Aelio',
		renusretem: 'Duel Renus Retem',
		amskvaris: 'Duel Ams Kvaris',
		nilsstia: 'Duel Nils Stia',
		halvaldi: 'Duel Halvaldi',
		dfsolus: 'Dark Falz Solus'
	};

	const fetchRuns = async () => {
		const purplePath = `/ngs-api/runs/purples/solo`;
		const purpleFilters: any = {
			page: 0,
			take: take,
			sort: 'recent'
		};
		const purpleSoloRuns =
			(await fetchGetApi<PurpleRun[]>(purplePath, copyQueryParams(purpleFilters))) ?? [];

		const dfaPath = `/ngs-api/runs/dfa/solo`;
		const dfaFilters: any = {
			page: 0,
			take: take,
			sort: 'recent'
		};
		const dfaSoloRuns = (await fetchGetApi<DfaRun[]>(dfaPath, copyQueryParams(dfaFilters))) ?? [];

		const indomitablePath = `/ngs-api/runs/duels/indomitable`;
		const indomitablePathFilters: any = {
			page: undefined,
			take: take,
			sort: 'recent'
		};

		const indomitableRuns =
			(await fetchGetApi<IndomitableRun[]>(
				indomitablePath,
				copyQueryParams(indomitablePathFilters)
			)) ?? [];

		const dfSolusPath = `/ngs-api/runs/dfsolus`;
		const dfSolusFilters: RunsSearchFilter = {
			page: null,
			take: take,
			partySize: 1,
			quest: 'dfsolus',
			sort: 'recent'
		};
		const dfSolusRuns =
			(await fetchGetApi<DfSolusRun[]>(dfSolusPath, copyQueryParams(dfSolusFilters))) ?? [];

		const recentSolos = purpleSoloRuns
			.map(
				(r) =>
					({
						category: categoryMap[r.region] + r.rank,
						mainClass: r.players[0]?.mainClass,
						time: r.time,
						player: r.players[0],
						submissionTime: new Date(r.submissionTime)
					} satisfies RecentRun)
			)
			.concat(
				dfaSoloRuns.map(
					(r) =>
						({
							category: categoryMap['dfasolo'],
							mainClass: r.players[0]?.mainClass,
							time: r.time,
							player: r.players[0],
							submissionTime: new Date(r.submissionTime)
						} satisfies RecentRun)
				)
			)
			.concat(
				indomitableRuns.map(
					(r) =>
						({
							category: categoryMap[r.boss],
							mainClass: r.players[0]?.mainClass,
							time: r.time,
							player: r.players[0],
							submissionTime: new Date(r.submissionTime)
						} satisfies RecentRun)
				)
			)
			.concat(
				dfSolusRuns.map(
					(r) =>
						({
							category: categoryMap[r.quest],
							mainClass: r.party[0]?.mainClass,
							time: r.time,
							player: tempMapPartyPlayer(r.party[0]),
							submissionTime: new Date(r.submissionDate)
						} satisfies RecentRun)
				)
			)
			.sort((a, b) => (a.submissionTime < b.submissionTime ? 1 : -1))
			.splice(0, take);

		return recentSolos;
	};

	const tempMapPartyPlayer = (partyMember: PartyMember) => {
		return {
			playerId: partyMember.playerId ?? 0,
			playerName: partyMember.playerName,
			ship: partyMember.playerInfo.ship,
			flag: partyMember.playerInfo.flag ?? '',
			characterName: partyMember.playerInfo.characterName,
			preferredName: partyMember.playerInfo.preferredNameType,
			runCharacterName: partyMember.runCharacterName,
			mainClass: partyMember.mainClass,
			subClass: partyMember.subClass,
			linkPov: partyMember.linkPov,
			server: '',
			nameType: partyMember.playerInfo.nameEffectType,
			nameColor1: partyMember.playerInfo.nameColor1,
			nameColor2: partyMember.playerInfo.nameColor2,
			weapons: partyMember.weapons
		} satisfies PlayerInfo;
	};
</script>

<div>
	<div class="text-center text-4xl font-light">
		{$t('page.home.newestRuns')}
	</div>
	<div class="divider -mx-8" />
	<div class="overflow-x-auto">
		<table class="table-zebra table-compact table w-full">
			<thead>
				<tr>
					<th class="text-center">Player</th>
					<th class="text-center">{$t('leaderboard.shared.time')}</th>
					<th class="text-center">Category</th>
				</tr>
			</thead>
			<tbody>
				{#await fetchRuns()}
					<LoadingBar class="mt-2" showLabel={false} />
				{:then runs}
					{#each runs as run}
						<tr class="hover border-t border-t-secondary/20">
							<td>
								<div class="flex gap-1">
									<NgsClassIcon combatClass={run.player.mainClass} />
									<PlayerNameBadge player={mapToNamePref(run.player)} showShipFlag={false} />
								</div>
							</td>
							<td><TimeDisplay time={run.time} /></td>
							<td>{run.category}</td>
						</tr>
					{/each}
				{:catch err}
					<p>Error, please try again later</p>
				{/await}
			</tbody>
		</table>
	</div>
</div>
