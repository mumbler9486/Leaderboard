<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import type { Run } from '$lib/types/api/runs/run';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import DfAegisDetails from './DfAegisDetails.svelte';
	import DuelDetails from './DuelDetails.svelte';
	import MasqDetails from './MasqDetails.svelte';
	import PlanetfallStrikeDetails from './PlanetfallStrikeDetails.svelte';

	export let boardInfo: LeaderboardDefinition<any, any>;
	export let run: Run<unknown>;

	const detailsMap: Partial<Record<NgsQuests, ComponentType>> = {
		[NgsQuests.DfAegis]: DfAegisDetails,
		[NgsQuests.Duels]: DuelDetails,
	};

	$: detailsComponent = detailsMap[boardInfo.quest];
</script>

{#if boardInfo.quest === NgsQuests.ExtraDuels && boardInfo.category === NgsRunCategories.Masquerade}
	<MasqDetails questRank={run.questRank} details={run.details} />
{:else if boardInfo.quest === NgsQuests.ExtraDuels && boardInfo.category === NgsRunCategories.PlanetfallStrike}
	<PlanetfallStrikeDetails details={run.details} />
{:else if !!detailsComponent}
	<svelte:component this={detailsComponent} details={run.details} />
{/if}
