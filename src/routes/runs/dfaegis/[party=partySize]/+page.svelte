<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import DfAegisPartyRunFilters from './DfAegisRunFilters.svelte';

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
	import type { DfAegisRun } from '$lib/types/api/runs/run';
	import RunsTable from '$lib/Components/Tables/RunsTable.svelte';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import { runFilters, type RunSearchFilters } from '../../runFilter';
	import DfAegisSupportIcon from '$lib/Components/DfAegisSupportIcon.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';

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
			name: $t('common.playerCount.party'),
			pageTitle: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
				'common.playerCount.party'
			)}`,
		},
	} satisfies Record<string, PartySizeInfo>;

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Solo;
	$: isSolo = partySize === PartySize.Solo;
	$: partyInfo = partySizeInfoMap[partySize];
	$: pageTitle = partyInfo.pageTitle;
	$: partySizeTitle = partyInfo.name;

	const filterDef: UrlQueryParamRule<RunSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'rank', defaultValue: '1' },
		{ name: 'support', undefinedValue: 'no_filter' },
		{ name: 'category', undefinedValue: NgsRunCategories.Quest },
	];

	runFilters.resetFilters();
	const { cleanup } = useUrlFilterStore(runFilters, filterDef);

	const fetchRuns = async (filters: RunSearchFilters) => {
		const basePath = `/ngs-api/runs/dfaegis`;
		const runFilters = clearFilterValues(filters, filterDef);

		const allFilters = {
			...runFilters,
			quest: NgsQuests.DfAegis,
			category: runFilters.category ?? NgsRunCategories.Quest,
			rank: runFilters.rank,
			partySize: partyInfo.filterSize,
		};

		if (runFilters.category) {
			allFilters.support = undefined;
		}

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
		<div
			class="m-2 space-y-2 overflow-x-scroll rounded-md border border-secondary bg-base-100 p-4 px-8"
		>
			<DfAegisPartyRunFilters solo={isSolo} />
			{#await fetchRuns($runFilters)}
				<LoadingBar />
			{:then runs}
				<div class="-mx-6 md:mx-0">
					<RunsTable
						{runs}
						solosOnly={isSolo}
						detailsColumn={{ label: 'Support', textAlign: 'center' }}
					>
						<svelte:fragment slot="detailsItem" let:run>
							<DfAegisSupportIcon support={run.details.support} />
						</svelte:fragment>
					</RunsTable>
				</div>
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
