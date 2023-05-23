<script lang="ts">
	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import LeaderboardTitle from '$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import DfaSoloRunsTable from '../DfaSoloRunsTable.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import type { DfaRun } from '$lib/types/api/dfa/dfa';
	import { soloRunFilters, partyRunFilters } from '../dfaRunFilterStore';
	import { PartySize } from '$lib/types/api/partySizes';
	import { copyQueryParams, updateUrlParams } from '$lib/utils/queryParams';
	import DfaPartyRunsTable from '../DfaPartyRunsTable.svelte';
	import DfaSoloRunFilters from '../DfaSoloRunFilters.svelte';
	import DfaPartyRunFilters from '../DfaPartyRunFilters.svelte';

	const partySizeMap: { [key: string]: string } = {
		[PartySize.Solo]: $t('common.playerCount.solo'),
		[PartySize.Duo]: $t('common.playerCount.duo'),
		[PartySize.Party]: $t('common.playerCount.party')
	};

	$: partySize = $page.params.party;
	$: pageTitle =
		partySize === PartySize.Solo
			? `${$t('shared.siteName')} | ${$t('leaderboard.halphiaLake')} - ${$t(
					'common.playerCount.solo'
			  )}`
			: `${$t('shared.siteName')} | ${$t('leaderboard.halphiaLake')} - ${$t(
					'common.playerCount.party'
			  )}`;
	$: partySizeTitle = partySizeMap[partySize];

	$: updateUrlParams($soloRunFilters, ['server', 'class', 'buff', 'trigger']);
	$: updateUrlParams($partyRunFilters, ['server', 'buff', 'trigger']);

	const fetchRuns = async (...watch: any[]) => {
		const basePath = `/ngs-api/runs/dfa/${partySize}`;
		let runFilters = partySize === PartySize.Solo ? $soloRunFilters : $partyRunFilters;

		return (await fetchGetApi<DfaRun[]>(basePath, copyQueryParams(runFilters))) ?? [];
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<LeaderboardTitle category={$t('leaderboard.halphiaLake')} subCategory={partySizeTitle} />

	<div class="grow content-center">
		<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
			<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
				{#if partySize === PartySize.Solo}
					<DfaSoloRunFilters />
				{:else}
					<DfaPartyRunFilters />
				{/if}
				{#await fetchRuns($page, $soloRunFilters, $partyRunFilters)}
					<LoadingBar />
				{:then runs}
					{#if partySize === PartySize.Solo}
						<DfaSoloRunsTable {runs} />
					{:else}
						<DfaPartyRunsTable {runs} />
					{/if}
				{:catch err}
					<p>An error has occured, please try again later</p>
				{/await}
			</div>
		</div>
	</div>

	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
