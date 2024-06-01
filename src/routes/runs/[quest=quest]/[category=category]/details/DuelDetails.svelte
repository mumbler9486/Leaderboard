<script lang="ts" generics="T">
	import type { DuelRunDetails, Run } from '$lib/types/api/runs/run';

	export let details: Run<unknown>['details'];
	$: usingDuelAugment = (details as DuelRunDetails).augments;
	$: duelAugmentLabel = usingDuelAugment ? 'Yes' : 'No';
</script>

<span>{duelAugmentLabel}</span>
