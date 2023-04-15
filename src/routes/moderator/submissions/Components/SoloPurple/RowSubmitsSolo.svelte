<script lang="ts">
	import type { PurpleSoloRunSubmission } from '$lib/types/api/purples/purples';
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import type { PurpleSubmission } from '$lib/types/api/submissions/submissions';
	import RunInformationModal from '$lib/Components/RunInformationModal.svelte';

	export let submission: PurpleSubmission;

	let modal: RunInformationModal;

	const patchCodes = {
		['60r']: '+60 Release',
		['slayer']: 'Slayer'
	} as { [id: string]: string };

	const regionCodes = {
		['stia']: 'Stia',
		['aelio']: 'Aelio',
		['retem']: 'Retem',
		['kvaris']: 'Kvaris'
	} as { [id: string]: string };

	$: player1 = submission.players[0];

	const openModal = () => {
		modal.showModal();
	};
</script>

<tr class="hover border-t border-t-secondary/20">
	<th>
		<PlayerNameBadge
			region={'global'}
			ship={1}
			playerId={123}
			flag="us"
			hasLink
			player={{
				playerName: 'asdf',
				runCharacterName: 'asdf',
				characterName: 'asfd',
				namePreference: 1,
				nameType: 1,
				nameColor1: '',
				nameColor2: ''
			}}
			on:click={openModal}
		/>
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
	<td>
		<PlayerNameBadge
			region={player1.server}
			ship={1}
			playerId={123}
			flag="us"
			hasLink
			player={{
				playerName: 'Yeah',
				runCharacterName: 'asdfs',
				characterName: 'asdf',
				namePreference: 1,
				nameType: 1,
				nameColor1: '',
				nameColor2: ''
			}}
			on:click={openModal}
		/></td
	>
	<td class="text-center">
		{new Date(submission.submissionTime).toLocaleString()}
	</td>
	<td class="text-center">
		{#if submission.notes != undefined}
			<i class="bi bi-sticky" />
		{/if}
	</td>
</tr>

<RunInformationModal submission={{}} bind:this={modal} />
