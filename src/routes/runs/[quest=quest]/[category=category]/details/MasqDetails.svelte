<script lang="ts" generics="T">
	import type { MasqDuelRunDetails, Run } from '$lib/types/api/runs/run';

	export let questRank: number;
	export let details: Run<unknown>['details'];
	$: depth = (details as MasqDuelRunDetails).depth;
</script>

<span class="text-xs">Depth: {depth}, Rank: {questRank}</span>
