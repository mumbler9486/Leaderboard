<script>
	import Select from '$lib/Components/Select.svelte';
	import { planetfallStageBossNameMappings } from '$lib/leaderboard/boards/duelPlanetfall';
	import { planetfallStrikeRunForm } from '../forms/planetfallStrikeForm';
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<Select
		label="Planetfall Strike Stage"
		placeholder="Select a Planetfall Strike stage"
		options={Object.values(planetfallStageBossNameMappings).map((bossName, i) => ({
			label: `${i + 1}: ${bossName}`,
			value: i + 1,
		}))}
		bind:value={$planetfallStrikeRunForm.stage}
	/>
</div>
