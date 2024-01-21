<script lang="ts">
	import TextInput from '$lib/Components/TextInput.svelte';
	import ClassSelector from './ClassSelector.svelte';
	import PlayerSelector from './PlayerSelector.svelte';
	import WeaponSelector from './WeaponSelector.svelte';
	import { partyForm } from './partyFormStore';

	export let playerIndex: number;
</script>

<div>
	<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
		<PlayerSelector {playerIndex} />
		<TextInput
			prompt="In-Video Character Name"
			placeholder="Enter character name..."
			alt="Even if the In-Video Character Name is the same as the Main Character or Player Name, you must still enter it here."
			required
			maxlength={50}
			bind:value={$partyForm[playerIndex].inVideoName}
		/>
		<ClassSelector {playerIndex} />
	</div>
	<TextInput
		prompt="POV Video Link"
		placeholder="Youtube video URL"
		required={playerIndex == 0}
		maxlength={50}
		bind:value={$partyForm[playerIndex].povVideoLink}
	/>
	{#if $partyForm.length == 1}
		<div class="mt-4">
			<div class="mt-4 text-center text-lg font-semibold">Weapons Used</div>
			<div class="mb-4 text-center text-warning">Maximum of 6</div>
			<WeaponSelector {playerIndex} />
		</div>
	{/if}
</div>
