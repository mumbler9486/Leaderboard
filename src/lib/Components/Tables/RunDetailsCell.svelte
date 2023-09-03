<script lang="ts">
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import type { DfAegisRunDetails, Run } from '$lib/types/api/runs/run';
	import DfAegisSupportIcon from '../DfAegisSupportIcon.svelte';

	export let run: Run<unknown>;

	let label: string = '-';

	$: {
		if (run.quest === NgsQuests.DfAegis) {
			const details = run.details as DfAegisRunDetails;
			label = details.support;
		}

		label = '-';
	}
</script>

{#if run.quest === NgsQuests.DfAegis}
	<DfAegisSupportIcon support={run.details?.support} />
{:else if run.quest === NgsQuests.Duels}
	Augments: {run.details?.augments ? 'Yes' : 'No'}
{:else}
	-
{/if}
