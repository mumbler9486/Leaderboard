<script lang="ts">
	import LeaderboardTitle from '$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import DfaSoloRunsTable from './DfaSoloRunsTable.svelte';
	import DfaSoloRunFilters from './DfaSoloRunFilters.svelte';

	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import type { DfaRun } from '$lib/types/api/dfa/dfa';
	import { soloRunFilters, type DfaSoloSearchFilters } from '../dfaRunFilterStore';
	import { PartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import { onDestroy } from 'svelte';

	const partySize = PartySize.Solo;

	const soloFilterDef: UrlQueryParamRule<DfaSoloSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'buff', undefinedValue: 'no_filter' },
		{ name: 'trigger', defaultValue: 'urgent' },
		{ name: 'rank', undefinedValue: '1' }
	];

	const { cleanup } = useUrlFilterStore(soloRunFilters, soloFilterDef);

	const fetchRuns = async (filters: DfaSoloSearchFilters) => {
		const basePath = `/ngs-api/runs/dfa/${partySize}`;
		const runFilters = clearFilterValues(filters, soloFilterDef);

		return (await fetchGetApi<DfaRun[]>(basePath, copyQueryParams(runFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>
		{$t('shared.siteName')} | {$t('leaderboard.halphiaLake')} - {$t('common.playerCount.solo')}
	</title>
</svelte:head>

<LeaderboardTitle
	category={$t('leaderboard.halphiaLake')}
	subCategory={$t('common.playerCount.solo')}
/>

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
			<DfaSoloRunFilters />
			{#await fetchRuns($soloRunFilters)}
				<LoadingBar />
			{:then runs}
				<DfaSoloRunsTable {runs} />
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
