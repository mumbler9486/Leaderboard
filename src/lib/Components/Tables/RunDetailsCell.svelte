<script lang="ts">
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import type { DfAegisRunDetails, Run } from '$lib/types/api/runs/run';
	import DfAegisSupportIcon from '../DfAegisSupportIcon.svelte';
	import { planetfallStageBossNameMappings } from '$lib/leaderboard/boards/duelPlanetfall';

	export let run: Run<unknown>;

	let label: string = '-';

	$: {
		if (run.quest === NgsQuests.DfAegis) {
			const details = run.details as DfAegisRunDetails;
			label = details.support;
		}

		label = '-';
	}
</script>

{#if run.quest === NgsQuests.DfAegis}
	<DfAegisSupportIcon support={run.details?.support} />
{:else if run.quest === NgsQuests.ExtraDuels && run.category === NgsRunCategories.Masquerade}
	<span class="text-xs">Depth: {run.details?.depth}, Rank: {run.questRank}</span>
{:else if run.quest === NgsQuests.ExtraDuels && run.category === NgsRunCategories.PlanetfallStrike}
	<span class="text-xs"
		>Stage {run.details?.stage}: {planetfallStageBossNameMappings[run.details?.stage]}</span
	>
{:else if run.quest === NgsQuests.Duels}
	Augments: {run.details?.augments ? 'Yes' : 'No'}
{:else}
	-
{/if}
