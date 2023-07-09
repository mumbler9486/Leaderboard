<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import PurplePartyRunsTable from './PurplePartyRunsTable.svelte';
	import PurplePartyRunFilters from './PurplePartyRunFilters.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { partyRunFilters, type PurplePartySearchFilters } from '../purpleRunFilterStore';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import type { PurpleRun } from '$lib/types/api/purples/purples';
	import { onDestroy } from 'svelte';

	const partySizeMap: { [key: string]: string } = {
		[PartySize.Duo]: $t('common.playerCount.duo'),
		[PartySize.Party]: $t('common.playerCount.party')
	};

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Party;
	$: pageTitle =
		partySize === PartySize.Duo
			? `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
					'common.playerCount.duo'
			  )}`
			: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
					'common.playerCount.party'
			  )}`;
	$: partySizeTitle = partySizeMap[partySize];

	const partyFilterDef: UrlQueryParamRule<PurplePartySearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'rank', defaultValue: '1' },
		{ name: 'region', defaultValue: 'stia' }
	];

	const { cleanup } = useUrlFilterStore(partyRunFilters, partyFilterDef);

	const fetchRuns = async (filters: PurplePartySearchFilters) => {
		const basePath = `/ngs-api/runs/purples/${partySize}`;
		const runFilters = clearFilterValues(filters, partyFilterDef);

		return (await fetchGetApi<PurpleRun[]>(basePath, copyQueryParams(runFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<LeaderboardTitle category={$t('leaderboard.purpleTriggers')} subCategory={partySizeTitle} />

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
			<PurplePartyRunFilters />
			{#await fetchRuns($partyRunFilters)}
				<LoadingBar />
			{:then runs}
				<PurplePartyRunsTable {runs} />
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
