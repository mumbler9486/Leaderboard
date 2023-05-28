<script lang="ts">
	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import LeaderboardTitle from '$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import PurpleSoloRunsTable from '../PurpleSoloRunsTable.svelte';
	import PurpleSoloRunFilters from '../PurpleSoloRunFilters.svelte';

	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { soloRunFilters, type PurpleSoloSearchFilters } from '../purpleRunFilterStore';
	import { PartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import type { PurpleRun } from '$lib/types/api/purples/purples';
	import { onDestroy } from 'svelte';

	$: partySize = PartySize.Solo;

	const soloFilterDef: UrlQueryParamRule<PurpleSoloSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'rank', defaultValue: '1' },
		{ name: 'region', defaultValue: 'stia' }
	];

	const { cleanup } = useUrlFilterStore(soloRunFilters, soloFilterDef);

	const fetchRuns = async (filters: PurpleSoloSearchFilters) => {
		const basePath = `/ngs-api/runs/purples/${partySize}`;
		const runFilters = clearFilterValues(filters, soloFilterDef);

		return (await fetchGetApi<PurpleRun[]>(basePath, copyQueryParams(runFilters))) ?? [];
	};

	onDestroy(() => cleanup());
</script>

<svelte:head>
	<title>
		{$t('shared.siteName')} | {$t('leaderboard.purpleTriggers')} - {$t('common.playerCount.solo')}
	</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<LeaderboardTitle
		category={$t('leaderboard.purpleTriggers')}
		subCategory={$t('common.playerCount.solo')}
	/>

	<div class="grow content-center">
		<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
			<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
				<PurpleSoloRunFilters />
				{#await fetchRuns($soloRunFilters)}
					<LoadingBar />
				{:then runs}
					<PurpleSoloRunsTable {runs} />
				{:catch err}
					<p>An error has occured, please try again later</p>
				{/await}
			</div>
		</div>
	</div>

	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
