<script lang="ts">
	import DfAegisDetails from './DfAegisDetails.svelte';
	import type { ComponentType } from 'svelte';
	import type { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import type { Run } from '$lib/types/api/runs/run';
	import { NgsQuests } from '$lib/types/api/runs/quests';

	export let boardInfo: LeaderboardDefinition<any, any>;
	export let runDetails: Run<unknown>['details'];

	const detailsMap: Partial<Record<NgsQuests, ComponentType>> = {
		[NgsQuests.DfAegis]: DfAegisDetails,
	};

	$: detailsComponent = detailsMap[boardInfo.quest];
</script>

{#if !!detailsComponent}
	<svelte:component this={detailsComponent} details={runDetails} />
{/if}
