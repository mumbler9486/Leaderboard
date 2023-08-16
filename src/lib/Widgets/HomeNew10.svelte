<script lang="ts">
	import { t } from 'svelte-i18n';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { copyQueryParams } from '$lib/utils/queryParams';
	import type { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import type { PlayerInfo } from '$lib/types/api/playerInfo';
	import type { RunTime } from '$lib/types/api/runTime';
	import type { Run } from '$lib/types/api/runs/run';
	import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';
	import { tempMapPartyPlayer } from '$lib/types/api/validation/utils/tempOldMapping';

	const take = 10;

	interface RecentRun {
		mainClass: NgsPlayerClass;
		player: PlayerInfo | undefined;
		time: RunTime;
		category: string;
		approvalDate: Date;
	}

	const questNameMap: Record<string, Record<string, string>> = {
		purples: {
			aelio: 'Purple Aelio R.',
			retem: 'Purple Retem R.',
			kvaris: 'Purple Kvaris R.',
			stia: 'Purple Stia R.'
		},
		dfaegis: {
			urgent_quest: 'DF Aegis R.',
			trigger: 'DF Aegis R.'
		},
		dfsolus: {
			quest: 'DF Solus R.'
		},
		duels: {
			nexaelio: 'Duel Nex Aelio',
			renusretem: 'Duel Renus Retem',
			amskvaris: 'Duel Ams Kvaris',
			nilsstia: 'Duel Nils Stia',
			halvaldi: 'Duel Halvaldi'
		}
	};

	const fetchRuns = async () => {
		const runsSearchFilter: RunsSearchFilter = {
			page: 0,
			take: take,
			partySize: 1,
			sort: 'recent'
		};
		const runsPath = '/ngs-api/runs';
		const soloRuns = (await fetchGetApi<Run[]>(runsPath, copyQueryParams(runsSearchFilter))) ?? [];

		const recentSolos = soloRuns
			.map(
				(r) =>
					({
						category: `${questNameMap[r.quest][r.category] ?? '<unknown_quest>'}${r.questRank}`,
						mainClass: r.party[0]?.mainClass,
						time: r.time,
						player: tempMapPartyPlayer(r.party[0]),
						approvalDate: new Date(r.dateApproved!)
					} satisfies RecentRun)
			)
			.sort((a, b) => (a.approvalDate < b.approvalDate ? 1 : -1));

		return recentSolos;
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
									<NgsClassIcon combatClass={run.player?.mainClass} />
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
