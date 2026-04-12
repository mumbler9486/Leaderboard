<script lang="ts" generics="T">
	import type { DuelRunDetails, Run } from '$lib/types/api/runs/run';

	interface Props {
		details: Run<unknown>['details'];
	}

	let { details }: Props = $props();
	let usingDuelAugment = $derived((details as DuelRunDetails).augments);
	let duelAugmentLabel = $derived(usingDuelAugment ? 'Yes' : 'No');
</script>

<span>{duelAugmentLabel}</span>
