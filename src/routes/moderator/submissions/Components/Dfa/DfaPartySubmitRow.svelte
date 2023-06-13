<script lang="ts">
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import type { DfaSubmission } from '$lib/types/api/submissions/submissions';
	import { createEventDispatcher } from 'svelte';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import DfaSupportIcon from '$lib/Components/DfaSupportIcon.svelte';
	import { patchCodeLabelMap } from '$lib/constants/patchCodes';

	const dispatcher = createEventDispatcher();

	export let submission: DfaSubmission;

	const typeCodes: { [id: string]: string } = {
		['trigger']: 'Trigger',
		['uq']: 'Urgent Quest'
	};

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
	<td class="text-center">
		{#each submission.players as player}
			<p>
				<NgsClassIcon showTooltip combatClass={player.mainClass} />
				<NgsClassIcon showTooltip combatClass={player.subClass} />
			</p>
		{/each}
	</td>
	<td class="text-center">{typeCodes[submission.drill]}</td>
	<td class="text-center">{submission.rank}</td>
	<td class="text-center">
		<DfaSupportIcon support={submission.buff} />
	</td>
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
