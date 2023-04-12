<script lang="ts">
	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import LeaderboardTitle from '$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte';

	import IndomitableRunFilters from '../IndomitableRunFilters.svelte';
	import RunsTable from '../RunsTable.svelte';
	import type { IndomitableRun, IndomitableSearchFilter } from '$lib/types/api/duels/indomitable';
	import { pageFilters } from '$lib/stores/indomitableFilterStore';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { t } from 'svelte-i18n';

	const fetchRuns = async (filters: IndomitableSearchFilter) => {
		const basePath = '/ngs-api/duels/indomitable/amskvaris';
		return (await fetchGetApi<IndomitableRun[]>(basePath, filters)) ?? [];
	};
</script>

<svelte:head>
	<title
		>{$t('shared.siteName')} | {$t('leaderboard.purpleTriggers')} - {$t(
			'common.playerCount.solo'
		)}</title
	>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<LeaderboardTitle category={$t('leaderboard.indomitableAmsKvaris')} />

	<div class="grow content-center">
		<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
			<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
				<IndomitableRunFilters />
				{#await fetchRuns($pageFilters)}
					<LoadingBar />
				{:then runs}
					<RunsTable {runs} />
				{/await}
			</div>
		</div>
	</div>

	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
