<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import Select from '$lib/Components/Select.svelte';
	import PartySizeNavigation from '$lib/Components/PartySizeNavigation.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import RunFilterModal from '../../RunFilterModal.svelte';
	import RunFilterTags from '../../RunFilterTags.svelte';
	import RunRules from '../../RunRules.svelte';
	import { runFilters } from '../../runFilter';

	export let solo: boolean;

	$: questCategory =
		$runFilters.category === NgsRunCategories.UrgentQuest
			? NgsRunCategories.UrgentQuest
			: NgsRunCategories.Quest;
	$: questCategoryQuery =
		questCategory === NgsRunCategories.Quest ? '' : `?category=${questCategory}`;
	$: partyLinks = [
		{ link: `/runs/dfsolus/solo${questCategoryQuery}`, label: 'Solo' },
		{ link: `/runs/dfsolus/duo${questCategoryQuery}`, label: 'Duo' },
		{ link: `/runs/dfsolus/party${questCategoryQuery}`, label: 'Party' },
	];
	const rules = ['Do not abuse bugs or exploits.'];

	$runFilters.category = NgsRunCategories.Quest;
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="grid w-full grid-cols-3 gap-4 px-4 py-2">
			<PartySizeNavigation parties={partyLinks} />
		</div>
	</div>
	<Divider class="-mx-1 my-0" />

	<Select
		label="Quest Type"
		options={[
			{ label: 'Quest', value: NgsRunCategories.Quest },
			{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest },
		]}
		bind:value={$runFilters.category}
	/>
	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<RunFilterModal classFilter={solo} />
		</div>
		<div class="m-1 md:flex-initial">
			<RunRules {rules} />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />

	<div class="flex flex-row gap-2 px-1">
		<RunFilterTags />
	</div>
</div>
