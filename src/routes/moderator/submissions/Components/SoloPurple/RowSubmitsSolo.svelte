<script lang="ts">
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge, { type PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import type { PurpleSubmission } from '$lib/types/api/submissions/submissions';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	export let submission: PurpleSubmission;
	export let nameDisplay: PlayerNameDisplay;

	const patchCodes = {
		['60r']: '+60 Release',
		['slayer']: 'Slayer',
		['pot6r']: 'Potential Lv6. Release'
	} as { [id: string]: string };

	const regionCodes = {
		['stia']: 'Stia',
		['aelio']: 'Aelio',
		['retem']: 'Retem',
		['kvaris']: 'Kvaris'
	} as { [id: string]: string };

	$: player1 = submission.players[0];

	const openModal = () => {
		dispatcher('openRunInfo', submission.runId);
	};
</script>

<tr class="hover border-t border-t-secondary/20">
	<th>
		<PlayerNameBadge player={nameDisplay} on:click={openModal} />
	</th>
	<td class="text-center">{regionCodes[submission.region]}</td>
	<td class="text-center">{submission.rank}</td>
	<td class="text-center">{patchCodes[submission.patch.toLowerCase()]}</td>
	<td class="text-center"><NgsClassIcon combatClass={player1.mainClass} /></td>
	<td class="text-center"><NgsClassIcon combatClass={player1.subClass} /></td>
	<td class="text-center">
		{#each player1.weapons ?? [] as weapon}
			<WeaponIcon {weapon} />
		{/each}
	</td>
	<td class="text-center">
		<TimeDisplay time={submission.time} />
	</td>
	<td> <PlayerNameBadge player={nameDisplay} on:click={openModal} /></td>
	<td class="text-center">
		{new Date(submission.submissionTime).toLocaleString()}
	</td>
	<td class="text-center">
		{#if submission.notes != undefined}
			<i class="bi bi-sticky" />
		{/if}
	</td>
</tr>
