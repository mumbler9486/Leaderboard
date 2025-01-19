<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { runFilters } from '../../../runFilter';

	export let allowNoFilter: boolean = false;
	export let maxQuestRank: number;

	$: noFilterOption = allowNoFilter ? [{ label: 'No Filter', value: 'no_filter' }] : [];

	$: rankFilterOptions = noFilterOption.concat(
		Array.from({ length: maxQuestRank }, (_, i) => ({
			label: `R${i + 1}`,
			value: `${i + 1}`,
		}))
	);
</script>

<RadioOptions name="quest-rank" options={rankFilterOptions} bind:value={$runFilters.rank} />
