<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import RunFilterModal from '../../../RunFilterModal.svelte';
	import RunFilterTags from '../../../RunFilterTags.svelte';
	import RunRules from '../../../RunRules.svelte';
	import { runFilters } from '../../../runFilter';
	import type { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import type { ComponentType } from 'svelte';
	import DfAegisSupportFilter from './DfAegisSupportFilter.svelte';
	import { goto } from '$app/navigation';
	import DuelDetailsFilter from './DuelDetailsFilter.svelte';
	import QuestRankFilter from './QuestRankFilter.svelte';
	import PartySizeFilter from './PartySizeFilter.svelte';
	import QuestCategoryFilter from './QuestCategoryFilter.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { lookupBoard } from '$lib/leaderboard/boards';
	import MasqDepthFilter from './MasqDepthFilter.svelte';

	export let solo: boolean;
	export let categories: NgsRunCategories[];
	export let boardInfo: LeaderboardDefinition<any, any>;

	$: isMasquerade =
		boardInfo.quest === NgsQuests.ExtraDuels && boardInfo.category === NgsRunCategories.Masquerade;
	$: $runFilters.rank = isMasquerade ? 'no_filter' : boardInfo.maxQuestRank.toString();

	interface FilterHandler {
		filterComponent: ComponentType;
		handler: (value: string | undefined) => void;
	}

	let filterSelection: string | undefined = undefined;

	const detailsFilterMap: Partial<Record<NgsQuests, FilterHandler>> = {
		[NgsQuests.DfAegis]: {
			filterComponent: DfAegisSupportFilter,
			handler: (value) => {
				if (!!value) {
					$runFilters.support = value;
				}
			},
		},
	};

	$: detailsFilterComponent = detailsFilterMap[boardInfo.quest];

	const categoryChanged = (e: CustomEvent<NgsRunCategories>) => {
		const newCategory = e.detail;
		const newBoard = lookupBoard(boardInfo.quest, newCategory);
		if (!newBoard) {
			console.error('Invalid category', boardInfo.quest, newCategory);
			return;
		}

		goto(`/runs/${boardInfo.questRoute}/${newBoard.categoryRoute}`);
	};
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class=" flex w-full gap-4 px-4 py-2 lg:gap-8">
			<QuestCategoryFilter {categories} on:categoryChanged={categoryChanged} />
			{#if boardInfo.quest === NgsQuests.Duels}
				<DuelDetailsFilter />
			{/if}
			<PartySizeFilter allowedPartySizes={boardInfo.allowedPartySizes} />
			{#if boardInfo.quest === NgsQuests.ExtraDuels && boardInfo.category === NgsRunCategories.Masquerade}
				<MasqDepthFilter />
			{/if}
			<QuestRankFilter allowNoFilter={isMasquerade} maxQuestRank={boardInfo.maxQuestRank} />
		</div>
	</div>

	<Divider slim />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<RunFilterModal
				classFilter={solo}
				on:applied={() => detailsFilterComponent?.handler(filterSelection)}
			>
				<svelte:fragment slot="additionalFilters">
					{#if !!detailsFilterComponent}
						<svelte:component
							this={detailsFilterComponent.filterComponent}
							bind:selection={filterSelection}
						/>
					{/if}
				</svelte:fragment>
			</RunFilterModal>
		</div>
		<div class="m-1 md:flex-initial">
			<RunRules rules={boardInfo.rules} />
		</div>
	</div>

	<Divider slim />

	<div class="flex flex-row gap-2 px-1">
		<RunFilterTags />
	</div>
</div>
