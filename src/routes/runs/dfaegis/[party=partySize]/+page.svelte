<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import DfAegisPartyRunsTable from './DfAegisPartyRunsTable.svelte';
	import DfAegisPartyRunFilters from './DfAegisPartyRunFilters.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { dfAegisRunFilters, type DfAegisSearchFilters } from '../dfAegisRunFilterStore';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		clearFilterValues,
		type UrlQueryParamRule
	} from '$lib/utils/queryParams';
	import { onDestroy } from 'svelte';
	import type { DfAegisRun } from '$lib/types/api/runs/run';

	interface PartySizeInfo {
		filterSize: number;
		name: string;
		pageTitle: string;
	}

	const partySizeInfoMap: Record<string, PartySizeInfo> = {
		[PartySize.Solo]: {
			filterSize: 1,
			name: $t('common.playerCount.solo'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
				'common.playerCount.solo'
			)}`
		},
		[PartySize.Duo]: {
			filterSize: 2,
			name: $t('common.playerCount.duo'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
				'common.playerCount.duo'
			)}`
		},
		[PartySize.Party]: {
			filterSize: 4,
			name: $t('common.playerCount.party'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
				'common.playerCount.party'
			)}`
		}
	};

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Solo;
	$: isSolo = partySize === PartySize.Solo;
	$: partyInfo = partySizeInfoMap[partySize];
	$: pageTitle = partyInfo.pageTitle;
	$: partySizeTitle = partyInfo.name;

	const filterDef: UrlQueryParamRule<DfAegisSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'rank', defaultValue: '1' },
		{ name: 'support', undefinedValue: 'no_filter' },
		{ name: 'trigger', undefinedValue: 'urgent_quest' }
	];

	const { cleanup } = useUrlFilterStore(dfAegisRunFilters, filterDef);

	const fetchRuns = async (filters: DfAegisSearchFilters) => {
		const basePath = `/ngs-api/runs/dfaegis`;
		const runFilters = clearFilterValues(filters, filterDef);

		const allFilters = {
			...runFilters,
			quest: 'dfaegis',
			category: runFilters.trigger,
			rank: runFilters.rank,
			partySize: partyInfo.filterSize
		};
		return (await fetchGetApi<DfAegisRun[]>(basePath, copyQueryParams(allFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<LeaderboardTitle category={$t('leaderboard.halphiaLake')} subCategory={partySizeTitle} />

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
			<DfAegisPartyRunFilters solo={isSolo} />
			{#await fetchRuns($dfAegisRunFilters)}
				<LoadingBar />
			{:then runs}
				<DfAegisPartyRunsTable solo={isSolo} {runs} />
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
