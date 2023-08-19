<script lang="ts">
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { createEventDispatcher } from 'svelte';
	import { mapPlayerInfoNamePref, mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import { patchCodeLabelMap } from '$lib/constants/patchCodes';
	import type { DfSolusRun } from '$lib/types/api/runs/run';
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';

	const dispatcher = createEventDispatcher();

	export let submission: DfSolusRun;

	let partySize = 'Solo';
	$: {
		const size = submission.party.length;
		if (size == 1) {
			partySize = 'Solo';
		}
		if (size == 2) {
			partySize = 'Duo';
		}
		if (size > 2) {
			partySize = 'Party';
		}
		if (size <= 0) {
			partySize = 'Invalid';
		}
	}

	const openModal = () => {
		dispatcher('openRunInfo', submission.runId);
	};
</script>

<tr class="hover border-t border-t-secondary/20">
	<th>
		{#each submission.party as player}
			<PlayerNameBadge player={mapPartyMemberToNamePref(player)} on:click={openModal} />
		{/each}
	</th>
	<td class="text-center">{partySize}</td>
	<td class="text-center">{submission.questRank}</td>
	<td class="text-center">
		{#each submission.party as player}
			<p>
				<NgsClassIcon showTooltip combatClass={player.mainClass} />
				<NgsClassIcon showTooltip combatClass={player.subClass} />
			</p>
		{/each}
	</td>
	<td class="text-center">
		{#if submission.party[0].weapons.length == 0}
			N/A
		{/if}
		{#each submission.party[0].weapons as weapon}
			<div class="inline w-[16px] object-none">
				<WeaponIcon {weapon} />
			</div>
		{/each}
	</td>
	<td class="text-center">{patchCodeLabelMap[submission.patch.toLowerCase()]}</td>
	<td class="text-center">
		<TimeDisplay time={submission.time} />
	</td>
	<td class="text-center">
		<PlayerNameBadge player={mapPlayerInfoNamePref(submission.submitter)} on:click={openModal} />
	</td>
	<td class="text-center">
		{new Date(submission.submissionDate).toLocaleString()}
	</td>
	<td class="text-center">
		{#if submission.notes != undefined}
			<i class="bi bi-sticky" />
		{/if}
	</td>
</tr>
