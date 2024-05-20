<script lang="ts" generics="T">
	import DfAegisSupportIcon from '$lib/Components/DfAegisSupportIcon.svelte';
	import type { DfAegisRunDetails, Run } from '$lib/types/api/runs/run';

	export let details: Run<unknown>['details'];
	$: support = (details as DfAegisRunDetails).support;
</script>

<DfAegisSupportIcon {support} />
