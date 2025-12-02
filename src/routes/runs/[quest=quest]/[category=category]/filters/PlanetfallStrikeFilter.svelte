<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { planetfallStageBossNameMappings } from '$lib/leaderboard/boards/duelPlanetfall';
	import { runFilters } from '../../../runFilter';

	const augmentFilterOptions = Object.values(planetfallStageBossNameMappings).map(
		(bossName, i) => ({
			label: `${i + 1}: ${bossName}`,
			value: `${i + 1}`,
		})
	);
</script>

<RadioOptions
	name="planetfall-strike-stage"
	options={augmentFilterOptions}
	bind:value={$runFilters.stage}
/>
