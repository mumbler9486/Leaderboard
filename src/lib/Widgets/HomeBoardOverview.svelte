<script lang="ts">
	import { t } from 'svelte-i18n';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { copyQueryParams } from '$lib/utils/queryParams';
	import type { Run } from '$lib/types/api/runs/run';
	import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';
	import { RunSortOption } from '$lib/types/api/runs/sortOptions';
	import Tabs, { type TabOptions } from '$lib/Components/Tabs.svelte';
	import HomeBoardRankTable from './HomeBoardRankTable.svelte';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { lookupBoard } from '$lib/leaderboard/boards';
	import HomeBoardRecentsTable from './HomeBoardRecentsTable.svelte';

	const take = 10;
	let tabIndex = 0;

	const tabs: TabOptions[] = [
		{ name: '✨Recent', color: 'yellow' },
		{ name: 'Dark Falz Dalion' },
		{ name: 'Dark Falz Solus' },
		{ name: 'Aelio Intruders' },
		{ name: 'Ringwedge' },
	];

	const getRuns = async (tabIndex: number) => {
		if (tabIndex === 0) {
			return fetchRecentRuns();
		} else if (tabIndex === 1) {
			return fetchRuns(NgsQuests.DfDalion, NgsRunCategories.Quest);
		} else if (tabIndex === 2) {
			return fetchRuns(NgsQuests.DfSolus, NgsRunCategories.Quest);
		} else if (tabIndex === 3) {
			return fetchRuns(NgsQuests.Purples, NgsRunCategories.AelioIntruders, 2);
		} else if (tabIndex === 4) {
			return fetchRuns(NgsQuests.Duels, NgsRunCategories.Ringwedge);
		}
		return [];
	};

	const fetchRuns = async (quest: NgsQuests, category: NgsRunCategories, rank?: number) => {
		const board = lookupBoard(quest, category);

		const runsSearchFilter: RunsSearchFilter = {
			page: 0,
			take: take,
			sort: RunSortOption.Ranking,
			partySize: 1,
			rank: rank,
		};
		const runsPath = `/ngs-api/runs/${board?.questRoute}/${board?.categoryRoute}`;
		const runs =
			(await fetchGetApi<Run<unknown>[]>(runsPath, copyQueryParams(runsSearchFilter))) ?? [];

		return runs;
	};

	const fetchRecentRuns = async () => {
		const runsSearchFilter: RunsSearchFilter = {
			page: 0,
			take: take,
			sort: RunSortOption.Recent,
		};
		const runsPath = '/ngs-api/runs';
		const soloRuns =
			(await fetchGetApi<Run<unknown>[]>(runsPath, copyQueryParams(runsSearchFilter))) ?? [];

		return soloRuns;
	};
</script>

<div class="p-4">
	<div class="flex">
		<Tabs bold {tabs} bind:activeTab={tabIndex}></Tabs>
	</div>
	<div class="overflow-x-auto">
		{#await getRuns(tabIndex)}
			<LoadingBar class="mt-2" showLabel={false} />
		{:then runs}
			{#if runs.length === 0}
				<p class="p-4">No results. Perhaps you could submit one? (〜￣▽￣)〜</p>
			{:else if tabIndex === 0}
				<HomeBoardRecentsTable {runs} />
			{:else}
				<HomeBoardRankTable {runs} />
			{/if}
		{:catch err}
			<p>Error, please try again later</p>
		{/await}
	</div>
</div>
