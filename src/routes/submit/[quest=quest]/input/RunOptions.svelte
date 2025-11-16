<script lang="ts">
	import type { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import DfAegisOptions from './DfAegisOptions.svelte';
	import DuelOptions from './DuelOptions.svelte';
	import MasqDepthInput from './MasqDepthInput.svelte';
	import PlanetfallStrikeInput from './PlanetfallStrikeInput.svelte';

	export let board: LeaderboardDefinition<any, any>;
</script>

{#if board.quest === NgsQuests.DfAegis}
	<DfAegisOptions />
{:else if board.quest === NgsQuests.Duels}
	<DuelOptions />
{:else if board.quest === NgsQuests.ExtraDuels && board.category === NgsRunCategories.Masquerade}
	<MasqDepthInput />
{:else if board.quest === NgsQuests.ExtraDuels && board.category === NgsRunCategories.PlanetfallStrike}
	<PlanetfallStrikeInput />
{/if}
