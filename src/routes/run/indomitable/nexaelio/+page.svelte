<script lang="ts">
	import { t } from 'svelte-i18n';
	export let data;

	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import LeaderboardTitle from '$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte';

	import IndomitableRunFilters from '../IndomitableRunFilters.svelte';
	import RunsTable from '../RunsTable.svelte';
	import type { IndomitableRun, IndomitableSearchFilter } from '$lib/types/api/duels/indomitable';
	import { pageFilters } from '$lib/stores/indomitableFilterStore';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';

	const fetchRuns = async (filters: IndomitableSearchFilter) => {
		const searchParams = new URLSearchParams(filters);
		try {
			const response = await fetch(
				`/ngs-api/duels/indomitable/nexAelio?${searchParams.toString()}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			const runs = await response.json();
			return (runs as IndomitableRun[]) ?? [];
		} catch (err) {
			console.error(err);
		}
		return [];
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

	<LeaderboardTitle category={$t('leaderboard.indomitableNexAelio')} />

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
