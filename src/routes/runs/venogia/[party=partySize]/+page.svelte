<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import VenogiaPartyRunsTable from './VenogiaRunsTable.svelte';
	import VenogiaPartyRunFilters from './VenogiaRunFilters.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { partyRunFilters, type VenogiaPartySearchFilters } from '../venogiaRunFilterStore';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import { onDestroy } from 'svelte';
	import type { VenogiaRun } from '$lib/types/api/runs/run';

	const partySizeMap: { [key: string]: string } = {
		[PartySize.Solo]: $t('common.playerCount.solo'),
		[PartySize.Duo]: $t('common.playerCount.duo'),
		[PartySize.Party]: $t('common.playerCount.party')
	};

	const partySizePageTitles: { [key: string]: string } = {
		[PartySize.Solo]: `${$t('shared.siteName')} | ${$t('leaderboard.venogia')} - ${$t(
			'common.playerCount.solo'
		)}`,
		[PartySize.Duo]: `${$t('shared.siteName')} | ${$t('leaderboard.venogia')} - ${$t(
			'common.playerCount.duo'
		)}`,
		[PartySize.Party]: `${$t('shared.siteName')} | ${$t('leaderboard.venogia')} - ${$t(
			'common.playerCount.party'
		)}`
	};

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Solo;
	$: isSolo = partySize === PartySize.Solo;
	$: pageTitle = partySizePageTitles[partySize];
	$: partySizeTitle = partySizeMap[partySize];

	const partyFilterDef: UrlQueryParamRule<VenogiaPartySearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'buff', undefinedValue: 'no_filter' },
		{ name: 'rank', undefinedValue: '1' }
	];

	const { cleanup } = useUrlFilterStore(partyRunFilters, partyFilterDef);

	const fetchRuns = async (filters: VenogiaPartySearchFilters) => {
		const basePath = `/ngs-api/runs/venogia/${partySize}`;
		const runFilters = clearFilterValues(filters, partyFilterDef);

		return (await fetchGetApi<VenogiaRun[]>(basePath, copyQueryParams(runFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>{pageTitle}</title>page
</svelte:head>

<LeaderboardTitle category={$t('leaderboard.venogia')} subCategory={partySizeTitle} />

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
			<VenogiaPartyRunFilters />
			{#await fetchRuns($partyRunFilters)}
				<LoadingBar />
			{:then runs}
				<VenogiaPartyRunsTable {runs} solo={isSolo} />
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
