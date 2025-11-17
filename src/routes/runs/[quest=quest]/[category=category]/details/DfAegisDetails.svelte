<script lang="ts" generics="T">
	import DfAegisSupportIcon from '$lib/Components/DfAegisSupportIcon.svelte';
	import type { DfAegisRunDetails, Run } from '$lib/types/api/runs/run';

	interface Props {
		details: Run<unknown>['details'];
	}

	let { details }: Props = $props();
	let support = $derived((details as DfAegisRunDetails).support);
</script>

<DfAegisSupportIcon {support} />
