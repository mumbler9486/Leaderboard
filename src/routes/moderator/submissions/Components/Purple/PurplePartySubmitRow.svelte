<script lang="ts">
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import type { PurpleSubmission } from '$lib/types/api/submissions/submissions';
	import { createEventDispatcher } from 'svelte';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';

	const dispatcher = createEventDispatcher();

	export let submission: PurpleSubmission;

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

	const openModal = () => {
		dispatcher('openRunInfo', submission.runId);
	};
</script>

<tr class="hover border-t border-t-secondary/20">
	<td>
		{#each submission.players as player}
			<p>
				<PlayerNameBadge player={mapToNamePref(player)} on:click={openModal} />
			</p>
		{/each}
	</td>
	<td class="text-center">
		{#each submission.players as player}
			<p>
				<NgsClassIcon combatClass={player.mainClass} />
				<NgsClassIcon combatClass={player.subClass} />
			</p>
		{/each}
	</td>
	<td class="text-center">{regionCodes[submission.region]}</td>
	<td class="text-center">{submission.rank}</td>
	<td class="text-center">{patchCodes[submission.patch.toLowerCase()]}</td>

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
