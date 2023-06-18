<script lang="ts">
	import LeaderboardTitle from '$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import IndomitableRunFilters from '../IndomitableRunFilters.svelte';
	import IndomitableRunsTable from '../IndomitableRunsTable.svelte';

	import { page } from '$app/stores';
	import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { t } from 'svelte-i18n';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import { indomitableRunFilters, type IndomitableRunSearchFilters } from '../runFilterStore';
	import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';
	import { onDestroy } from 'svelte';

	const pageTitles: { [key: string]: string } = {
		[IndomitableBoss.NexAelio]: $t('leaderboard.indomitableNexAelio'),
		[IndomitableBoss.RenusRetem]: $t('leaderboard.indomitableRenusRetem'),
		[IndomitableBoss.AmsKvaris]: $t('leaderboard.indomitableAmsKvaris'),
		[IndomitableBoss.NilsStia]: $t('leaderboard.indomitableNilsStia'),
		[IndomitableBoss.Halvaldi]: $t('leaderboard.indomitableHalvaldi')
	};

	$: boss = $page.params.boss;
	$: pageHeader = pageTitles[boss];

	const filterDef: UrlQueryParamRule<IndomitableRunSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'augmentations', undefinedValue: 'no_filter' }
	];

	const { cleanup } = useUrlFilterStore(indomitableRunFilters, filterDef);

	const fetchRuns = async (filters: IndomitableRunSearchFilters) => {
		const basePath = `/ngs-api/runs/duels/indomitable/${boss}`;
		const runFilters = clearFilterValues(filters, filterDef);

		return (await fetchGetApi<IndomitableRun[]>(basePath, copyQueryParams(runFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | {$t('leaderboard.duelsPageTitle')}</title>
</svelte:head>

<LeaderboardTitle category={pageHeader} />

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
			<IndomitableRunFilters />
			{#await fetchRuns($indomitableRunFilters)}
				<LoadingBar />
			{:then runs}
				<IndomitableRunsTable {runs} />
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
