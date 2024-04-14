<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PartySizeNavigation from '$lib/Components/PartySizeNavigation.svelte';
	import RunFilterModal from '../../../RunFilterModal.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import RunFilterTags from '../../../RunFilterTags.svelte';
	import RunRules from '../../../RunRules.svelte';
	import { runFilters } from '../../../runFilter';
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import type { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import type { ComponentType } from 'svelte';
	import DfAegisSupportFilter from './DfAegisSupportFilter.svelte';

	export let solo: boolean;
	export let rules: string[];
	export let categories: NgsRunCategories[];
	export let route: string;
	export let boardInfo: LeaderboardDefinition<any, any>;

	const categoryOptions = [
		{ label: 'Quest', value: NgsRunCategories.Quest },
		{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest },
		{ label: 'Trigger', value: NgsRunCategories.Trigger },
	];
	$: selectableCategories = categoryOptions.filter((c) => categories.includes(c.value));

	$: questCategoryQuery =
		$runFilters.category === NgsRunCategories.Quest ? '' : `?category=${$runFilters.category}`;
	$: partyLabel = $runFilters.category === NgsRunCategories.Quest ? 'Party (4p)' : 'Party (8p)';
	$: partyLinks = [
		{ link: `/runs/${route}/solo${questCategoryQuery}`, label: 'Solo' },
		{ link: `/runs/${route}/duo${questCategoryQuery}`, label: 'Duo' },
		{ link: `/runs/${route}/party${questCategoryQuery}`, label: partyLabel },
	];

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
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="grid w-full grid-cols-3 gap-4 px-4 py-2">
			<PartySizeNavigation parties={partyLinks} />
		</div>
	</div>
	<Divider slim />
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="w-full gap-4 px-4 py-2">
			<RadioOptions
				name="category"
				bind:value={$runFilters.category}
				options={selectableCategories}
			/>
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
			<RunRules {rules} />
		</div>
	</div>

	<Divider slim />

	<div class="flex flex-row gap-2 px-1">
		<RunFilterTags />
	</div>
</div>
