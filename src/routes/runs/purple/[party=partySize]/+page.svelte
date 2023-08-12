<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import PurplePartyRunsTable from './PurplePartyRunsTable.svelte';
	import PurplePartyRunFilters from './PurplePartyRunFilters.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { purpleRunFilters, type PurpleSearchFilters } from '../purpleRunFilterStore';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import { onDestroy } from 'svelte';
	import type { PurpleRun2 } from '$lib/types/api/runs/run';

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

	const partyFilterDef: UrlQueryParamRule<PurpleSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'rank', defaultValue: '1' },
		{ name: 'region', defaultValue: 'stia' },
		{ name: 'class', undefinedValue: 'no_filter' }
	];

	const { cleanup } = useUrlFilterStore(purpleRunFilters, partyFilterDef);

	const fetchRuns = async (filters: PurpleSearchFilters) => {
		const basePath = `/ngs-api/runs/purples`;
		const runFilters = clearFilterValues(filters, partyFilterDef);

		const allFilters = {
			...runFilters,
			quest: 'purples',
			category: runFilters.region
		};
		return (await fetchGetApi<PurpleRun2[]>(basePath, copyQueryParams(allFilters))) ?? [];
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
			{#await fetchRuns($purpleRunFilters)}
				<LoadingBar />
			{:then runs}
				<PurplePartyRunsTable solo={isSolo} {runs} />
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
