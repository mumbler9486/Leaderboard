<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { runFilters } from '../../../runFilter';

	const augmentFilterOptions = [
		{ label: 'No Filter', value: 'no_filter' },
		{ label: 'Yes', value: 'yes' },
		{ label: 'No', value: 'no' },
	];
</script>

<RadioOptions
	name="duel-augments"
	options={augmentFilterOptions}
	bind:value={$runFilters.augments}
/>
