<script lang="ts">
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { createEventDispatcher } from 'svelte';
	import { patchCodeLabelMap } from '$lib/constants/patchCodes';
	import type { DuelRun } from '$lib/types/api/runs/run';
	import { mapPlayerInfoNamePref, mapToNamePref2 } from '$lib/types/api/mapNamePref';
	import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';

	const dispatcher = createEventDispatcher();

	export let submission: DuelRun;

	const usesAugments = {
		true: 'Special Augments Used',
		false: 'No Special Augment Used'
	} as { [id: string]: string };

	const bossNames = {
		[IndomitableBoss.NexAelio]: 'Nex Aelio',
		[IndomitableBoss.RenusRetem]: 'Renus Retem',
		[IndomitableBoss.AmsKvaris]: 'Ams Kvaris',
		[IndomitableBoss.NilsStia]: 'Nils Stia',
		[IndomitableBoss.Halvaldi]: 'Halvaldi'
	} as { [id: string]: string };

	$: player1 = submission.party[0];

	const openModal = () => {
		dispatcher('openRunInfo', submission.runId);
	};
</script>

<tr class="hover border-t border-t-secondary/20">
	<td>
		<PlayerNameBadge player={mapToNamePref2(submission.party[0])} on:click={openModal} />
	</td>
	<td>
		<NgsClassIcon showTooltip combatClass={player1.mainClass} />
		<NgsClassIcon showTooltip combatClass={player1.subClass} />
	</td>
	<td class="text-center">{bossNames[submission.category]}</td>
	<td class="text-center">{submission.rank}</td>
	<td class="text-center">{patchCodeLabelMap[submission.patch.toLowerCase()]}</td>
	<td class="text-center">{usesAugments[submission.details.augments.toString()]}</td>
	<td class="text-center">
		{#each player1.weapons ?? [] as weapon}
			<WeaponIcon {weapon} />
		{/each}
	</td>
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
