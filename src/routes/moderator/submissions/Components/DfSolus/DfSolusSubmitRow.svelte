<script lang="ts">
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { createEventDispatcher } from 'svelte';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import { patchCodeLabelMap } from '$lib/constants/patchCodes';
	import type { DfSolusRun } from '$lib/types/api/runs/run';
	import type { Submission } from '$lib/types/api/submissions/submissions';

	const dispatcher = createEventDispatcher();

	export let submission: Submission;
	const solusRank = 1; //TODO get from run data

	let partySize = 'Solo';
	$: {
		if (submission.partySize == 1) {
			partySize = 'Solo';
		}
		if (submission.partySize == 2) {
			partySize = 'Duo';
		}
		if (submission.partySize > 2) {
			partySize = 'Party';
		}
		if (submission.partySize <= 0) {
			partySize = 'Invalid';
		}
	}

	const openModal = () => {
		dispatcher('openRunInfo', submission.runId);
	};
</script>

<tr class="hover border-t border-t-secondary/20">
	<th>
		{#each submission.players as player}
			<PlayerNameBadge player={mapToNamePref(player)} on:click={openModal} />
		{/each}
	</th>
	<td class="text-center">{partySize}</td>
	<td class="text-center">
		{#each submission.players as player}
			<p>
				<NgsClassIcon showTooltip combatClass={player.mainClass} />
				<NgsClassIcon showTooltip combatClass={player.subClass} />
			</p>
		{/each}
	</td>
	<td class="text-center">{solusRank}</td>
	<td class="text-center">{patchCodeLabelMap[submission.patch.toLowerCase()]}</td>
	<td class="text-center">
		<TimeDisplay time={submission.time} />
	</td>
	<td class="text-center">
		<PlayerNameBadge player={mapToNamePref(submission.submitter)} on:click={openModal} />
	</td>
	<td class="text-center">
		{new Date(submission.submissionTime).toLocaleString()}
	</td>
	<td class="text-center">
		{#if submission.notes != undefined}
			<i class="bi bi-sticky" />
		{/if}
	</td>
</tr>
