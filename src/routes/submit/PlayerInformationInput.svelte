<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import ClassSelector from './ClassSelector.svelte';
	import WeaponSelector from './WeaponSelector.svelte';
	import { userInfo } from './playerInfoStore';
	import { partyForm } from './partyFormStore';
	import { onMount } from 'svelte';

	export let playerIndex: number;

	let playerName = '';
	let inVideoName = '';
	let playerServer = 'global';
	let videoLink = '';

	onMount(userInfo.loadPlayerInfo);

	const serverOptions = [
		{
			label: 'Global',
			value: 'global'
		},
		{
			label: 'Japan',
			value: 'japan'
		}
	];

	$: partyForm.update((p) => {
		p[playerIndex].playerName = playerName;
		p[playerIndex].inVideoName = inVideoName;
		p[playerIndex].playerServer = playerServer;
		p[playerIndex].povVideoLink = videoLink;
		p[playerIndex].playerId = $userInfo?.find((x) => x.playerName == playerName)?.playerId ?? -1;
		return p;
	});
</script>

<div class="form-control">
	<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
		<div class="form-control">
			<label class="label" for="partysize-form1"
				><span class="label-text text-base font-semibold">Player or Character Name</span></label
			>
			<input
				placeholder="Search or enter name..."
				list="playerName-datalist{playerIndex}"
				name="player-name-form1"
				class="input-bordered input"
				bind:value={playerName}
				required
			/>
			<div class="label">
				<span class="label-text-alt"
					>You can search for existing players by player and character name!<br /><span
						class="text-warning">Please keep in mind that this list is sorted by Player Name.</span
					></span
				>
			</div>
			<datalist id="playerName-datalist{playerIndex}">
				{#each $userInfo as user}
					<option value={user.playerName} data-player={user.playerId}>{user.characterName}</option>
				{/each}
			</datalist>
		</div>
		<div class="form-control">
			<div class="label">
				<span class="label-text text-base font-semibold">In-Video Character Name</span>
			</div>
			<input
				placeholder="Enter character name..."
				class="input-bordered input"
				type="text"
				required
				bind:value={inVideoName}
			/>
			<div class="label">
				<span class="label-text-alt"
					>This is required to help viewers determine who is playing who in situations where
					Player/Main Character Name doesn't match the In-Video Character Name.<br /><span
						class="text-warning"
						>Even if the In-Video Character Name is the same as the Main Character or Player Name,
						you must still enter it here.</span
					></span
				>
			</div>
		</div>
		<div class="form-control">
			<Dropdown label="Player Server" options={serverOptions} bind:value={playerServer} />
			<div class="label">
				<span class="label-text-alt text-warning"
					>This only applies to manual name entries! If you picked an existing player, ignore this!</span
				>
			</div>
		</div>
		<ClassSelector {playerIndex} />
	</div>
	<div class="form-control mt-4">
		<div class="label">
			<span class="label-text text-base font-semibold">POV Video Link</span>
		</div>
		<input
			placeholder="Youtube video URL"
			class="input-bordered input"
			type="text"
			required={playerIndex == 0}
			bind:value={videoLink}
		/>
	</div>
	{#if $partyForm.length == 1}
		<div class="mt-4">
			<div class="mt-4 text-center text-lg font-semibold">Weapons Used</div>
			<div class="mb-4 text-center text-warning">Maximum of 6</div>
			<WeaponSelector {playerIndex} />
		</div>
	{/if}
</div>
