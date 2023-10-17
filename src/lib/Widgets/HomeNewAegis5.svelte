<script lang="ts">
	import { t } from 'svelte-i18n';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import DfAegisSupportIcon from '$lib/Components/DfAegisSupportIcon.svelte';
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { copyQueryParams } from '$lib/utils/queryParams';
	import type { DfAegisRun } from '$lib/types/api/runs/run';

	const fetchRuns = async () => {
		const path = `/ngs-api/runs/dfaegis`;
		const filters: any = {
			server: undefined!,
			support: undefined!,
			sort: 'ranking',
			partySize: 8,
			page: 0,
			take: 5,
		};
		return (await fetchGetApi<DfAegisRun[]>(path, copyQueryParams(filters))) ?? [];
	};
</script>

<div>
	<div class="text-center text-4xl font-light">
		{$t('page.home.newestRunsAegis')}
	</div>
	<div class="divider -mx-8" />
	<div class="overflow-x-auto">
		<table class="table-compact table table-zebra w-full">
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
								{#each run.party as player}
									<div class="flex gap-1">
										<NgsClassIcon combatClass={player.mainClass} />
										<PlayerNameBadge
											player={mapPartyMemberToNamePref(player)}
											showShipFlag={false}
										/>
									</div>
								{/each}
							</td>
							<td><TimeDisplay time={run.time} /></td>
							<td><DfAegisSupportIcon support={run.details?.support} /></td>
						</tr>
					{/each}
				{:catch err}
					<p>Error, please try again later</p>
				{/await}
			</tbody>
		</table>
	</div>
</div>
