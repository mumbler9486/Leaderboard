<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		clearFilterValues,
		type UrlQueryParamRule,
	} from '$lib/utils/queryParams';
	import { onDestroy } from 'svelte';
	import type { Run } from '$lib/types/api/runs/run';
	import RunsTable from '$lib/Components/Tables/RunsTable.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { allLeaderboards, lookupBoardsByQuest } from '$lib/leaderboard/boards';
	import { runFilters, type RunSearchFilters } from '../../runFilter';
	import DefaultRunFilter from './filters/DefaultRunFilter.svelte';
	import RunDetails from './details/RunDetails.svelte';
	import type { NgsQuests } from '$lib/types/api/runs/quests';

	interface PartySizeInfo {
		filterSize: number;
		name: string;
		pageTitle: string;
	}

	$: quest = $page.params.quest as NgsQuests;
	$: boardInfo = allLeaderboards.find((b) => b.quest === quest)!;
	$: categories = lookupBoardsByQuest(quest).map((b) => b.category);

	$: partySizeInfoMap = {
		[PartySize.Solo]: {
			filterSize: 1,
			name: $t('common.playerCount.solo'),
			pageTitle: $t('common.playerCount.solo'),
		},
		[PartySize.Duo]: {
			filterSize: 2,
			name: $t('common.playerCount.duo'),
			pageTitle: $t('common.playerCount.duo'),
		},
		[PartySize.Party]: {
			filterSize: 4,
			name: $t('common.playerCount.party'),
			pageTitle: $t('common.playerCount.party'),
		},
	} satisfies Record<string, PartySizeInfo>;

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Solo;
	$: isSolo = partySize === PartySize.Solo;
	$: partyInfo = partySizeInfoMap[partySize];

	$: partyPageTitle = partyInfo.pageTitle;
	$: boardPageTitle = $t(boardInfo.name);
	$: pageTitle = `${$t('shared.siteName')} | ${boardPageTitle} - ${partyPageTitle}`;
	$: partySizeTitle = partyInfo.name;

	const filterDef: UrlQueryParamRule<RunSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'rank', defaultValue: '1' },
		{ name: 'support', undefinedValue: 'no_filter' },
		{ name: 'category', defaultValue: NgsRunCategories.Quest },
	];

	runFilters.resetFilters();
	const { cleanup } = useUrlFilterStore(runFilters, filterDef);

	const fetchRuns = async (filters: RunSearchFilters) => {
		const basePath = `/ngs-api/runs/${boardInfo.route}`;
		const runFilters = clearFilterValues(filters, filterDef);

		const allFilters = {
			...runFilters,
			quest: boardInfo.quest,
			rank: runFilters.rank,
			partySize: partyInfo.filterSize,
		};

		return (await fetchGetApi<Run<unknown>[]>(basePath, copyQueryParams(allFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<LeaderboardTitle category={$t(boardInfo.name)} subCategory={partySizeTitle} />

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 space-y-2 overflow-x-scroll rounded-md border border-secondary bg-base-100 p-4 px-8"
		>
			<DefaultRunFilter
				solo={isSolo}
				rules={boardInfo.rules}
				route={boardInfo.route}
				{boardInfo}
				{categories}
			/>
			{#await fetchRuns($runFilters)}
				<LoadingBar />
			{:then runs}
				<div class="-mx-6 md:mx-0">
					<RunsTable {runs} solosOnly={isSolo} detailsColumn={boardInfo.detailsTableHeader}>
						<svelte:fragment slot="detailsItem" let:run>
							<RunDetails {boardInfo} runDetails={run.details} />
						</svelte:fragment>
					</RunsTable>
				</div>
			{:catch err}
				<p>An error has occurred, please try again later</p>
			{/await}
		</div>
	</div>
</div>
