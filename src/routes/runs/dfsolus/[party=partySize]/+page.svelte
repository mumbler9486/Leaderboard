<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import DfSolusPartyRunsTable from './DfSolusRunsTable.svelte';
	import DfSolusPartyRunFilters from './DfSolusRunFilters.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { runFilters, type DfSolusSearchFilters } from '../dfSolusRunFilterStore';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import { onDestroy } from 'svelte';
	import type { DfSolusRun } from '$lib/types/api/runs/run';

	interface PartySizeInfo {
		filterSize: number;
		name: string;
		pageTitle: string;
	}

	const partySizeInfoMap: Record<string, PartySizeInfo> = {
		[PartySize.Solo]: {
			filterSize: 1,
			name: $t('common.playerCount.solo'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.dfSolus')} - ${$t(
				'common.playerCount.solo'
			)}`
		},
		[PartySize.Duo]: {
			filterSize: 2,
			name: $t('common.playerCount.duo'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.dfSolus')} - ${$t(
				'common.playerCount.duo'
			)}`
		},
		[PartySize.Party]: {
			filterSize: 4,
			name: $t('common.playerCount.party'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.dfSolus')} - ${$t(
				'common.playerCount.party'
			)}`
		}
	};

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Solo;
	$: isSolo = partySize === PartySize.Solo;
	$: partyInfo = partySizeInfoMap[partySize];
	$: pageTitle = partyInfo.pageTitle;
	$: partySizeTitle = partyInfo.name;

	const filterDef: UrlQueryParamRule<DfSolusSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'rank', undefinedValue: '1' }
	];

	const { cleanup } = useUrlFilterStore(runFilters, filterDef);

	const fetchRuns = async (filters: DfSolusSearchFilters) => {
		const basePath = `/ngs-api/runs/dfsolus`;
		const runFilters = clearFilterValues(filters, filterDef);

		runFilters.partySize = partyInfo.filterSize;
		return (await fetchGetApi<DfSolusRun[]>(basePath, copyQueryParams(runFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>{pageTitle}</title>page
</svelte:head>

<LeaderboardTitle category={$t('leaderboard.dfSolus')} subCategory={partySizeTitle} />

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
			<DfSolusPartyRunFilters solo={isSolo} />
			{#await fetchRuns($runFilters)}
				<LoadingBar />
			{:then runs}
				<DfSolusPartyRunsTable {runs} solo={isSolo} />
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
