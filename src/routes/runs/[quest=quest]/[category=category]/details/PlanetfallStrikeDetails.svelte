<script lang="ts" generics="T">
	import { planetfallStageBossNameMappings } from '$lib/leaderboard/boards/duelPlanetfall';
	import type { PlanetfallStrikeRunDetails, Run } from '$lib/types/api/runs/run';

	export let details: Run<unknown>['details'];

	$: stage = (details as PlanetfallStrikeRunDetails).stage;
	$: stageName = planetfallStageBossNameMappings[stage];
</script>

<span class="text-xs">Stage {stage}: {stageName}</span>
