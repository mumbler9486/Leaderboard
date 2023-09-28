<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PlayerInformationInput from './PlayerInformationInput.svelte';
	import { partyForm } from './partyFormStore';
</script>

{#key $partyForm.length}
	{#each $partyForm as player, i}
		<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
			<div class="text-center text-xl font-semibold">Player {i + 1}</div>
			<Divider />
			<div class="text-center text-lg font-semibold">Information</div>
			<PlayerInformationInput playerIndex={i} />
		</div>
	{/each}
{/key}
