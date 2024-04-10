<script lang="ts" generics="T">
	import type { ComponentType } from 'svelte';
	import type { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import type { Run } from '$lib/types/api/runs/run';

	export let boardInfo: LeaderboardDefinition;
	export let runDetails: Run<T>['details'];

	const detailsMap: Record<string, ComponentType> = {};

	$: detailsComponent = detailsMap[boardInfo.quest];
</script>

{#if !!detailsComponent}
	<svelte:component this={detailsComponent} {runDetails} />
{/if}
