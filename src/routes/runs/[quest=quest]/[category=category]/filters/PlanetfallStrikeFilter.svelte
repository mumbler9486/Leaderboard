<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { planetfallStageBossNameMappings } from '$lib/leaderboard/boards/duelPlanetfall';
	import { runFilters } from '../../../runFilter';

	const augmentFilterOptions = [
		...Array.from({ length: 6 }, (_, i) => ({
			label: `${i + 1}: ${planetfallStageBossNameMappings[i + 1]}`,
			value: `${i + 1}`,
		})),
	];
</script>

<RadioOptions
	name="planetfall-strike-stage"
	options={augmentFilterOptions}
	bind:value={$runFilters.stage}
/>
