<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import DfaPartyRunsTable from './DfaPartyRunsTable.svelte';
	import DfaPartyRunFilters from './DfaPartyRunFilters.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import type { DfaRun } from '$lib/types/api/dfa/dfa';
	import { partyRunFilters, type DfaPartySearchFilters } from '../dfaRunFilterStore';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import { onDestroy } from 'svelte';

	const partySizeMap: { [key: string]: string } = {
		[PartySize.Duo]: $t('common.playerCount.duo'),
		[PartySize.Party]: $t('common.playerCount.party')
	};

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Party;
	$: pageTitle =
		partySize === PartySize.Duo
			? `${$t('shared.siteName')} | ${$t('leaderboard.halphiaLake')} - ${$t(
					'common.playerCount.duo'
			  )}`
			: `${$t('shared.siteName')} | ${$t('leaderboard.halphiaLake')} - ${$t(
					'common.playerCount.party'
			  )}`;
	$: partySizeTitle = partySizeMap[partySize];

	const partyFilterDef: UrlQueryParamRule<DfaPartySearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'buff', undefinedValue: 'no_filter' },
		{ name: 'trigger', defaultValue: 'urgent' },
		{ name: 'rank', undefinedValue: '1' }
	];

	const { cleanup } = useUrlFilterStore(partyRunFilters, partyFilterDef);

	const fetchRuns = async (filters: DfaPartySearchFilters) => {
		const basePath = `/ngs-api/runs/dfa/${partySize}`;
		const runFilters = clearFilterValues(filters, partyFilterDef);

		return (await fetchGetApi<DfaRun[]>(basePath, copyQueryParams(runFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>{pageTitle}</title>page
</svelte:head>

<LeaderboardTitle category={$t('leaderboard.halphiaLake')} subCategory={partySizeTitle} />

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
			<DfaPartyRunFilters />
			{#await fetchRuns($partyRunFilters)}
				<LoadingBar />
			{:then runs}
				<DfaPartyRunsTable {runs} />
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
