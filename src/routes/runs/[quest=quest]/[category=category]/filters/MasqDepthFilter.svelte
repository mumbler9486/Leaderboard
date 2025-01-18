<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { runFilters } from '../../../runFilter';

	const augmentFilterOptions = [
		{ label: 'No Filter', value: 'no_filter' },
		...Array.from({ length: 10 }, (_, i) => ({ label: `D${i + 1}`, value: `${i + 1}` })),
	];
</script>

<RadioOptions name="masq-depth" options={augmentFilterOptions} bind:value={$runFilters.depth} />
