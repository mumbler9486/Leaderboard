<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PurpleCategorySelector from '../PurpleCategorySelector.svelte';
	import { t } from 'svelte-i18n';
	import RunFilterModal from '../../RunFilterModal.svelte';
	import RunFilterTags from '../../RunFilterTags.svelte';
	import { runFilters } from '../../runFilter';
	import RunRules from '../../RunRules.svelte';

	export let solo: boolean;

	const rules = ['Do not abuse bugs or exploits.'];
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex w-full flex-row gap-4 px-4 py-2">
		<PurpleCategorySelector bind:region={$runFilters.region} bind:rank={$runFilters.rank} />
	</div>
	<Divider slim />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<RunFilterModal classFilter={solo} />
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
