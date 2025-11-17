<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { runFilters } from '../../../runFilter';

	interface Props {
		allowNoFilter?: boolean;
		maxQuestRank: number;
	}

	let { allowNoFilter = false, maxQuestRank }: Props = $props();

	let noFilterOption = $derived(allowNoFilter ? [{ label: 'No Filter', value: 'no_filter' }] : []);

	let rankFilterOptions = $derived(noFilterOption.concat(
		Array.from({ length: maxQuestRank }, (_, i) => ({
			label: `R${i + 1}`,
			value: `${i + 1}`,
		}))
	));
</script>

<RadioOptions name="quest-rank" options={rankFilterOptions} bind:value={$runFilters.rank} />
