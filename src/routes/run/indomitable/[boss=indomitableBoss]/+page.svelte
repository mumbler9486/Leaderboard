<script lang="ts">
	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import LeaderboardTitle from '$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import IndomitableRunFilters from '../IndomitableRunFilters.svelte';
	import IndomitableRunsTable from '../IndomitableRunsTable.svelte';

	import { page } from '$app/stores';
	import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { t } from 'svelte-i18n';
	import { copyQueryParams, updateUrlParams } from '$lib/utils/queryParams';
	import { indomitableRunFilters } from '../runFilterStore';
	import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';

	const pageTitles: { [key: string]: string } = {
		[IndomitableBoss.NexAelio]: $t('leaderboard.indomitableNexAelio'),
		[IndomitableBoss.RenusRetem]: $t('leaderboard.indomitableRenusRetem'),
		[IndomitableBoss.AmsKvaris]: $t('leaderboard.indomitableAmsKvaris'),
		[IndomitableBoss.NilsStia]: $t('leaderboard.indomitableNilsStia')
	};

	$: boss = $page.params.boss;
	$: pageHeader = pageTitles[boss];

	$: updateUrlParams($indomitableRunFilters, ['class', 'server', 'augmentations']);

	const fetchRuns = async (...watch: any[]) => {
		const basePath = `/ngs-api/runs/duels/indomitable/${boss}`;
		return (
			(await fetchGetApi<IndomitableRun[]>(basePath, copyQueryParams($indomitableRunFilters))) ?? []
		);
	};
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | {$t('leaderboard.duelsPageTitle')}</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<LeaderboardTitle category={pageHeader} />

	<div class="grow content-center">
		<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
			<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
				<IndomitableRunFilters />
				{#await fetchRuns($page, $indomitableRunFilters)}
					<LoadingBar />
				{:then runs}
					<IndomitableRunsTable {runs} />
				{/await}
			</div>
		</div>
	</div>

	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
