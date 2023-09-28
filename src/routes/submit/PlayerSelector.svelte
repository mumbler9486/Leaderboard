<script lang="ts">
	import { onMount } from 'svelte';
	import { partyForm } from './partyFormStore';
	import { userInfo } from './playerInfoStore';
	import { clientPrincipleStore } from '$lib/stores/userLogin';
	import { UserRole } from '$lib/types/api/users/userRole';

	export let playerIndex: number;

	onMount(userInfo.loadPlayerInfo);

	let playerName = $partyForm[playerIndex].playerName;

	$: isModerator = $clientPrincipleStore?.userRoles.includes(UserRole.Moderator);
	$: selectedPlayerId = $userInfo?.find((x) => x.playerName == playerName)?.playerId ?? -1;
	$: isPlayer1 = playerIndex == 0;
	$: playerExists = selectedPlayerId !== -1;

	$: partyForm.update((p) => {
		p[playerIndex].playerName = playerName;
		p[playerIndex].playerId = $userInfo?.find((x) => x.playerName == playerName)?.playerId ?? -1;
		return p;
	});
</script>

<label class="label" for="partysize-form1"
	><span class="label-text text-base font-semibold">Player or Character Name</span></label
>
<input
	required
	disabled={isPlayer1 && !isModerator}
	readonly={isPlayer1 && !isModerator}
	placeholder="Search or enter name..."
	list="playerName-datalist{playerIndex}"
	name="player-name-form1"
	class="input input-bordered bg-base-100"
	class:player-exists={playerExists}
	bind:value={playerName}
/>

<div class="label">
	{#if isModerator}
		<span class="label-text-alt">Moderator mode: can submit a run not their own.</span>
	{:else if isPlayer1}
		<span class="label-text-alt">You must be a participant of your own run.</span>
	{:else}
		<span class="label-text-alt"
			>You can search for existing players by player and character name!<br /><span
				class="text-warning">Please keep in mind that this list is sorted by Player Name.</span
			></span
		>
	{/if}
</div>
<datalist id="playerName-datalist{playerIndex}">
	{#each $userInfo as user}
		<option value={user.playerName} data-player={user.playerId}>{user.characterName}</option>
	{/each}
</datalist>

<style scoped>
	.player-exists {
		background: url(/icons/submit/green_checkmark.png) no-repeat scroll right 1rem top 1rem;
		background-size: 16px 16px;
		background-color: hsl(var(--b1) / var(--tw-bg-opacity));
	}
</style>
