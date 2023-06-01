<script lang="ts">
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';
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
	$: nameDisplay = mapToNamePref(submission.players[0]);

	const typeCodes: { [id: string]: string } = {
		['trigger']: 'Trigger',
		['uq']: 'Urgent Quest'
	};

	$: player1 = submission.players[0];

	const openModal = () => {
		dispatcher('openRunInfo', submission.runId);
	};
</script>

<tr class="hover border-t border-t-secondary/20">
	<td>
		<PlayerNameBadge player={nameDisplay} on:click={openModal} />
	</td>
	<td class="text-center">
		<NgsClassIcon showTooltip combatClass={player1.mainClass} />
		<NgsClassIcon showTooltip combatClass={player1.subClass} />
	</td>
	<td class="text-center">{typeCodes[submission.drill]}</td>
	<td class="text-center">
		<DfaSupportIcon support={submission.buff} />
	</td>
	<td class="text-center">{patchCodeLabelMap[submission.patch.toLowerCase()]}</td>
	<td class="text-center">
		{#each player1.weapons ?? [] as weapon}
			<WeaponIcon {weapon} />
		{/each}
	</td>
	<td class="text-center">
		<TimeDisplay time={submission.time} />
	</td>
	<td class="text-center">
		<PlayerNameBadge player={nameDisplay} on:click={openModal} />
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
