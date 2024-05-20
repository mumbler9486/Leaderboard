<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
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
	import { PartySize } from '$lib/types/api/partySizes';
	import { goto } from '$app/navigation';
	import { mapCategoryToRoute } from '../../../../../params/category';

	export let solo: boolean;
	export let rules: string[];
	export let categories: NgsRunCategories[];
	export let boardInfo: LeaderboardDefinition<any, any>;

	const partySizeOptions = [
		{
			label: 'Solo',
			value: PartySize.Solo,
		},
		{
			label: 'Duo',
			value: PartySize.Duo,
		},
		{
			label: 'Party (4p)',
			value: PartySize.Party,
		},
		{
			label: 'Multi-Party',
			value: PartySize.MultiParty,
		},
	];
	$: selectablePartySizes = partySizeOptions.filter((c) =>
		boardInfo.allowedPartySizes.includes(c.value)
	);

	const categoryOptions = [
		{ label: 'Quest', value: NgsRunCategories.Quest },
		{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest },
		{ label: 'Trigger', value: NgsRunCategories.Trigger },
	];
	$: selectableCategories = categoryOptions.filter((c) => categories.includes(c.value));

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
		const categoryRouteFragment = mapCategoryToRoute(newCategory);
		goto(`/runs/${boardInfo.route}/${categoryRouteFragment}`);
	};
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class=" flex w-full gap-4 px-4 py-2 lg:gap-8">
			<RadioOptions
				name="category"
				options={selectableCategories}
				on:changed={categoryChanged}
				bind:value={$runFilters.category}
			/>
			<RadioOptions
				name="partySize"
				options={selectablePartySizes}
				bind:value={$runFilters.partySize}
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
