<script lang="ts">
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge, { type PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import type { IndomitableSubmission } from '$lib/types/api/submissions/submissions';
	import { createEventDispatcher } from 'svelte';
	import { RunCategories, parseRunCategory } from '$lib/types/api/categories';

	const dispatcher = createEventDispatcher();

	export let submission: IndomitableSubmission;
	export let nameDisplay: PlayerNameDisplay;

	const usesAugments = {
		true: 'Special Augments Used',
		false: 'No Special Augment Used'
	} as { [id: string]: string };

	const patchCodes = {
		['60r']: '+60 Release',
		['slayer']: 'Slayer',
		['pot6r']: 'Potential Lv6. Release'
	} as { [id: string]: string };

	const bossNames = {
		[RunCategories.IndomitableNexAelio]: 'Nex Aelio',
		[RunCategories.IndomitableRenusRetem]: 'Renus Retem',
		[RunCategories.IndomitableAmsKvaris]: 'Ams Kvaris',
		[RunCategories.IndomitableNilsStia]: 'Nils Stia'
	} as { [id: string]: string };

	$: player1 = submission.players[0];

	const openModal = () => {
		dispatcher('openRunInfo', submission.runId);
	};
</script>

<tr class="hover border-t border-t-secondary/20">
	<td>
		<PlayerNameBadge player={nameDisplay} on:click={openModal} />
	</td>
	<td>
		<NgsClassIcon combatClass={player1.mainClass} />
		<NgsClassIcon combatClass={player1.subClass} />
	</td>
	<td class="text-center">{bossNames[parseRunCategory(submission.category) ?? '']}</td>
	<td class="text-center">{submission.rank}</td>
	<td class="text-center">{patchCodes[submission.patch.toLowerCase()]}</td>
	<td class="text-center">{usesAugments[submission.augments.toString()]}</td>
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
