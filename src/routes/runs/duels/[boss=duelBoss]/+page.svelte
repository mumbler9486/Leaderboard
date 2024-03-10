<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import DuelRunFilters from './DuelRunFilters.svelte';

	import { page } from '$app/stores';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { t } from 'svelte-i18n';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues,
	} from '$lib/utils/queryParams';
	import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';
	import { onDestroy } from 'svelte';
	import type { DuelRun } from '$lib/types/api/runs/run';
	import type { DuelRunsSearchFilter } from '$lib/types/api/validation/duelRunsSearchFilter';
	import RunsTable from '$lib/Components/Tables/RunsTable.svelte';
	import { runFilters, type RunSearchFilters } from '../../runFilter';
	import { NgsQuests } from '$lib/types/api/runs/quests';

	const pageTitles: { [key: string]: string } = {
		[IndomitableBoss.NexAelio]: $t('leaderboard.indomitableNexAelio'),
		[IndomitableBoss.RenusRetem]: $t('leaderboard.indomitableRenusRetem'),
		[IndomitableBoss.AmsKvaris]: $t('leaderboard.indomitableAmsKvaris'),
		[IndomitableBoss.NilsStia]: $t('leaderboard.indomitableNilsStia'),
		[IndomitableBoss.Halvaldi]: $t('leaderboard.indomitableHalvaldi'),
		[IndomitableBoss.Zelvin]: $t('leaderboard.indomitableZelvin'),
		[IndomitableBoss.Ringwedge]: $t('leaderboard.indomitableRingwedge'),
	};

	const bossUrlMapping: Record<string, IndomitableBoss> = {
		['nex-aelio']: IndomitableBoss.NexAelio,
		['renus-retem']: IndomitableBoss.RenusRetem,
		['ams-kvaris']: IndomitableBoss.AmsKvaris,
		['nils-stia']: IndomitableBoss.NilsStia,
		['halvaldi']: IndomitableBoss.Halvaldi,
		['zelvin']: IndomitableBoss.Zelvin,
		['ringwedge']: IndomitableBoss.Ringwedge,
	};

	$: boss = bossUrlMapping[$page.params.boss];
	$: pageHeader = pageTitles[boss];

	const filterDef: UrlQueryParamRule<RunSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'augments', undefinedValue: 'no_filter' },
	];

	runFilters.resetFilters();
	const { cleanup } = useUrlFilterStore(runFilters, filterDef);

	const fetchRuns = async (filters: RunSearchFilters) => {
		const basePath = `/ngs-api/runs/duels`;
		const runFilters = clearFilterValues(filters, filterDef);

		let augmentFilter: boolean | undefined = undefined;
		if (filters.augments === 'no') {
			augmentFilter = false;
		} else if (filters.augments === 'yes') {
			augmentFilter = true;
		} else {
			augmentFilter = undefined;
		}
		const allFilters: DuelRunsSearchFilter = {
			...runFilters,
			quest: NgsQuests.Duels,
			category: boss,
			rank: runFilters.rank,
			partySize: 1,
			augments: augmentFilter,
		};
		return (await fetchGetApi<DuelRun[]>(basePath, copyQueryParams(allFilters))) ?? [];
	};

	onDestroy(cleanup);
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | {$t('leaderboard.duelsPageTitle')}</title>
</svelte:head>

<LeaderboardTitle category={pageHeader} />

<div class="grow content-center">
	<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 space-y-2 overflow-x-scroll rounded-md border border-secondary bg-base-100 p-4 px-8"
		>
			<DuelRunFilters />
			{#await fetchRuns($runFilters)}
				<LoadingBar />
			{:then runs}
				<div class="-mx-6 md:mx-0">
					<RunsTable
						{runs}
						solosOnly={true}
						detailsColumn={{ label: 'Augments', textAlign: 'center' }}
					>
						<svelte:fragment slot="detailsItem" let:run>
							{run.details.augments ? 'Yes' : 'No'}
						</svelte:fragment>
					</RunsTable>
				</div>
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
