<script lang="ts">
	import ClassSelector from './ClassSelector.svelte';
	import PlayerSelector from './PlayerSelector.svelte';
	import WeaponSelector from './WeaponSelector.svelte';
	import { partyForm } from './partyFormStore';

	export let playerIndex: number;
</script>

<div class="form-control">
	<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
		<div class="form-control">
			<PlayerSelector {playerIndex} />
		</div>
		<div class="form-control">
			<div class="label">
				<span class="label-text text-base font-semibold">In-Video Character Name</span>
			</div>
			<input
				placeholder="Enter character name..."
				class="input input-bordered"
				type="text"
				required
				bind:value={$partyForm[playerIndex].inVideoName}
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
		<ClassSelector {playerIndex} />
	</div>
	<div class="form-control mt-4">
		<div class="label">
			<span class="label-text text-base font-semibold">POV Video Link</span>
		</div>
		<input
			placeholder="Youtube video URL"
			class="input input-bordered"
			type="text"
			required={playerIndex == 0}
			bind:value={$partyForm[playerIndex].povVideoLink}
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
