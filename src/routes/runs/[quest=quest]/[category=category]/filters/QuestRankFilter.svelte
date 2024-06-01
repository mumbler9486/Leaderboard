<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { runFilters } from '../../../runFilter';

	export let maxQuestRank: number;

	$: rankFilterOptions = Array.from({ length: maxQuestRank }, (_, i) => ({
		label: `R${i + 1}`,
		value: `${i + 1}`,
	}));
</script>

<RadioOptions name="quest-rank" options={rankFilterOptions} bind:value={$runFilters.rank} />
