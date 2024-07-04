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
	import type { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import Button from '$lib/Components/Button.svelte';
	import { ArrowRight } from 'svelte-heros-v2';

	const take = 10;
	let tabIndex = 0;

	let boardLink: string | null = null;

	interface Boards {
		boardInfo: LeaderboardDefinition<any, any> | null | undefined;
		name: string;
		href?: string;
		color?: TabOptions['color'];
	}

	const tabs: Boards[] = [
		{ boardInfo: null, name: '✨Recent', color: 'yellow' },
		{
			boardInfo: lookupBoard(NgsQuests.DfDalion, NgsRunCategories.Quest),
			name: 'Dark Falz Dalion',
		},
		{ boardInfo: lookupBoard(NgsQuests.DfSolus, NgsRunCategories.Quest), name: 'Dark Falz Solus' },
		{
			boardInfo: lookupBoard(NgsQuests.Purples, NgsRunCategories.AelioIntruders),
			name: 'Aelio Intruders',
		},
		{ boardInfo: lookupBoard(NgsQuests.Duels, NgsRunCategories.Ringwedge), name: 'Ringwedge' },
		{ boardInfo: lookupBoard(NgsQuests.Duels, NgsRunCategories.Venogia), name: 'Duel Venogia' },
	];

	const getRuns = async (tabIndex: number) => {
		const boardTab = tabs[tabIndex];
		if (!boardTab.boardInfo || tabIndex === 0) {
			boardLink = null;
			return fetchRecentRuns();
		}
		boardLink = `/runs/${boardTab.boardInfo.questRoute}/${boardTab.boardInfo.categoryRoute}`;
		return fetchRuns(
			boardTab.boardInfo.quest,
			boardTab.boardInfo.category,
			boardTab.boardInfo.maxQuestRank
		);
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
			<div class="flex justify-end">
				<Button size="xs" href={boardLink} disabled={!boardLink} class="btn btn-primary mt-4"
					>Go to Board <ArrowRight size="16" /></Button
				>
			</div>
		{:catch err}
			<p>Error, please try again later</p>
		{/await}
	</div>
</div>
