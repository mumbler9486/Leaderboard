<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import PurpleRunFilters from './PurpleRunFilters.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues,
	} from '$lib/utils/queryParams';
	import { onDestroy } from 'svelte';
	import type { PurpleRun } from '$lib/types/api/runs/run';
	import RunsTable from '$lib/Components/Tables/RunsTable.svelte';
	import { runFilters, type RunSearchFilters } from '../../runFilter';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import { PurpleRegion } from '$lib/types/api/purpleRegions';

	interface PartySizeInfo {
		filterSize: number;
		name: string;
		pageTitle: string;
	}

	$: partySizeInfoMap = {
		[PartySize.Solo]: {
			filterSize: 1,
			name: $t('common.playerCount.solo'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
				'common.playerCount.solo'
			)}`,
		},
		[PartySize.Duo]: {
			filterSize: 2,
			name: $t('common.playerCount.duo'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
				'common.playerCount.duo'
			)}`,
		},
		[PartySize.Party]: {
			filterSize: 4,
			name:
				$runFilters.region === PurpleRegion.AelioIntruders
					? `${$t('common.playerCount.party')} (4P~8P)`
					: $t('common.playerCount.party'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
				'common.playerCount.party'
			)}`,
		},
		[PartySize.MultiParty]: {
			filterSize: 8,
			name: $t('common.playerCount.mpa'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
				'common.playerCount.mpa'
			)}`,
		},
	} satisfies Record<string, PartySizeInfo>;

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Solo;
	$: isSolo = partySize === PartySize.Solo;
	$: partyInfo = partySizeInfoMap[partySize];
	$: pageTitle = partyInfo.pageTitle;
	$: partySizeTitle = partyInfo.name;

	const partyFilterDef: UrlQueryParamRule<RunSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'rank', defaultValue: '4' },
		{ name: 'region', defaultValue: 'aelio' },
		{ name: 'class', undefinedValue: 'no_filter' },
	];

	runFilters.resetFilters();
	const { cleanup } = useUrlFilterStore(runFilters, partyFilterDef);

	const fetchRuns = async (filters: RunSearchFilters) => {
		const basePath = `/ngs-api/runs/purples`;
		const runFilters = clearFilterValues(filters, partyFilterDef);

		const allFilters = {
			...runFilters,
			quest: NgsQuests.Purples,
			category: runFilters.region,
			rank: runFilters.rank,
			partySize: partyInfo.filterSize,
		};
		return (await fetchGetApi<PurpleRun[]>(basePath, copyQueryParams(allFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<LeaderboardTitle category={$t('leaderboard.purpleTriggers')} subCategory={partySizeTitle} />

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 space-y-2 overflow-x-scroll rounded-md border border-secondary bg-base-100 p-4 px-8"
		>
			<PurpleRunFilters solo={isSolo} />
			{#await fetchRuns($runFilters)}
				<LoadingBar />
			{:then runs}
				<div class="-mx-6 md:mx-0">
					<RunsTable {runs} solosOnly={isSolo} />
				</div>
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
