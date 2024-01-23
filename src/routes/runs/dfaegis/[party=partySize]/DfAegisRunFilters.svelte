<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import { t } from 'svelte-i18n';
	import PartySizeNavigation from '$lib/Components/PartySizeNavigation.svelte';
	import RunFilterModal from '../../RunFilterModal.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import RunFilterTags from '../../RunFilterTags.svelte';
	import RunRules from '../../RunRules.svelte';
	import { runFilters } from '../../runFilter';
	import RadioOptions from '$lib/Components/RadioOptions.svelte';

	export let solo: boolean;

	const rules = ['Do not abuse bugs or exploits.'];

	$: questCategoryQuery =
		$runFilters.category === NgsRunCategories.Quest ? '' : `?category=${$runFilters.category}`;
	$: partyLabel = $runFilters.category === NgsRunCategories.Quest ? 'Party (4p)' : 'Party (8p)';
	$: partyLinks = [
		{ link: `/runs/dfaegis/solo${questCategoryQuery}`, label: 'Solo' },
		{ link: `/runs/dfaegis/duo${questCategoryQuery}`, label: 'Duo' },
		{ link: `/runs/dfaegis/party${questCategoryQuery}`, label: partyLabel },
	];
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
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="w-full gap-4 px-4 py-2">
			<RadioOptions
				name="category"
				bind:value={$runFilters.category}
				options={[
					{ label: 'Quest', value: NgsRunCategories.Quest },
					{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest },
					{ label: 'Trigger', value: NgsRunCategories.Trigger },
				]}
			/>
		</div>
	</div>

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<RunFilterModal dfAegisSupportFilter classFilter={solo} />
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
