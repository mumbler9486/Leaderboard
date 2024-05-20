<script lang="ts">
	import type { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import DfAegisOptions from './DfAegisOptions.svelte';
	import DfDalionOptions from './DfDalionOptions.svelte';

	export let board: LeaderboardDefinition<any, any>;
</script>

{#if board.quest === NgsQuests.DfDalion}
	<DfDalionOptions />
{:else if board.quest === NgsQuests.DfAegis}
	<DfAegisOptions />
{/if}
