<script lang="ts">
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import IndomitableRunFilters from '../IndomitableRunFilters.svelte';

	import { page } from '$app/stores';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { t } from 'svelte-i18n';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import { indomitableRunFilters, type IndomitableRunSearchFilters } from '../runFilterStore';
	import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';
	import { onDestroy } from 'svelte';
	import type { DuelRun } from '$lib/types/api/runs/run';
	import type { DuelRunsSearchFilter } from '$lib/types/api/validation/duelRunsSearchFilter';
	import RunsTable from '$lib/Components/Tables/RunsTable.svelte';

	const pageTitles: { [key: string]: string } = {
		[IndomitableBoss.NexAelio]: $t('leaderboard.indomitableNexAelio'),
		[IndomitableBoss.RenusRetem]: $t('leaderboard.indomitableRenusRetem'),
		[IndomitableBoss.AmsKvaris]: $t('leaderboard.indomitableAmsKvaris'),
		[IndomitableBoss.NilsStia]: $t('leaderboard.indomitableNilsStia'),
		[IndomitableBoss.Halvaldi]: $t('leaderboard.indomitableHalvaldi')
	};

	const bossUrlMapping: Record<string, IndomitableBoss> = {
		['nex-aelio']: IndomitableBoss.NexAelio,
		['renus-retem']: IndomitableBoss.RenusRetem,
		['ams-kvaris']: IndomitableBoss.AmsKvaris,
		['nils-stia']: IndomitableBoss.NilsStia,
		['halvaldi']: IndomitableBoss.Halvaldi
	};

	$: boss = bossUrlMapping[$page.params.boss];
	$: pageHeader = pageTitles[boss];

	const filterDef: UrlQueryParamRule<IndomitableRunSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'augmentations', undefinedValue: 'no_filter' }
	];

	const { cleanup } = useUrlFilterStore(indomitableRunFilters, filterDef);

	const fetchRuns = async (filters: IndomitableRunSearchFilters) => {
		const basePath = `/ngs-api/runs/duels`;
		const runFilters = clearFilterValues(filters, filterDef);

		let augmentFilter: boolean | undefined = undefined;
		if (filters.augmentations === 'no') {
			augmentFilter = false;
		} else if (filters.augmentations === 'yes') {
			augmentFilter = true;
		} else {
			augmentFilter = undefined;
		}
		const allFilters: DuelRunsSearchFilter = {
			...runFilters,
			quest: 'duels',
			category: boss,
			rank: runFilters.rank,
			partySize: 1,
			augments: augmentFilter
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
		<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
			<IndomitableRunFilters />
			{#await fetchRuns($indomitableRunFilters)}
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
