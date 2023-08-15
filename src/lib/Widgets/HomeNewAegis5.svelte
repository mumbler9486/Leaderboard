<script lang="ts">
	import { t } from 'svelte-i18n';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import DfaSupportIcon from '$lib/Components/DfaSupportIcon.svelte';
	import type { DfaRun } from '$lib/types/api/dfAegis/dfa';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { copyQueryParams } from '$lib/utils/queryParams';

	const fetchRuns = async () => {
		const path = `/ngs-api/runs/dfa/party`;
		const filters: any = {
			trigger: undefined, //TODO target all types
			server: undefined!,
			buff: undefined!,
			sort: 'ranking',
			page: 0,
			take: 5
		};
		return (await fetchGetApi<DfaRun[]>(path, copyQueryParams(filters))) ?? [];
	};
</script>

<div>
	<div class="text-center text-4xl font-light">
		{$t('page.home.newestRunsAegis')}
	</div>
	<div class="divider -mx-8" />
	<div class="overflow-x-auto">
		<table class="table-zebra table-compact table w-full">
			<thead>
				<tr>
					<th class="text-center">Players</th>
					<th class="text-center">{$t('leaderboard.shared.time')}</th>
					<th class="text-center">Support</th>
				</tr>
			</thead>
			<tbody>
				{#await fetchRuns()}
					<LoadingBar class="mt-2" showLabel={false} />
				{:then runs}
					{#each runs as run}
						<tr class="hover border-t border-t-secondary/20">
							<td>
								{#each run.players as player}
									<div class="flex gap-1">
										<NgsClassIcon combatClass={player.mainClass} />
										<PlayerNameBadge player={mapToNamePref(player)} showShipFlag={false} />
									</div>
								{/each}
							</td>
							<td><TimeDisplay time={run.time} /></td>
							<td><DfaSupportIcon support={run.support} /></td>
						</tr>
					{/each}
				{:catch err}
					<p>Error, please try again later</p>
				{/await}
			</tbody>
		</table>
	</div>
</div>
