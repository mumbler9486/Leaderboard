<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import RunRules from '../../RunRules.svelte';
	import RunFilterModal from '../../RunFilterModal.svelte';
	import RunFilterTags from '../../RunFilterTags.svelte';
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { runFilters } from '../../runFilter';

	const rules = [
		'Do not abuse bugs or exploits.',
		'A run is considered to have used a Duel Augment if any duel specific augments (e.g.,Defi-series) have been affixed to any equipment used during the run.',
	];
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex w-full flex-row flex-wrap items-stretch gap-4 px-4 py-2">
		<RadioOptions
			name="augments"
			label="Duel Augmentations"
			bind:value={$runFilters.augments}
			options={[
				{ label: 'No Filter', value: 'no_filter' },
				{ label: 'Yes', value: 'yes' },
				{ label: 'No', value: 'no' },
			]}
		/>
		<RadioOptions
			name="rank"
			label="Rank"
			bind:value={$runFilters.rank}
			options={[{ label: '1', value: 1 }]}
		/>
	</div>

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<RunFilterModal classFilter />
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
