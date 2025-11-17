<script lang="ts" generics="T">
	import type { MasqDuelRunDetails, Run } from '$lib/types/api/runs/run';

	interface Props {
		questRank: number;
		details: Run<unknown>['details'];
	}

	let { questRank, details }: Props = $props();
	let depth = $derived((details as MasqDuelRunDetails).depth);
</script>

<span class="text-xs">Depth: {depth}, Rank: {questRank}</span>
