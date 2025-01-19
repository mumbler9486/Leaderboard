<script>
	import Select from '$lib/Components/Select.svelte';
	import { duelMasqRunForm } from '../forms/duelMasqForm';
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<Select
		label="Masquerade Depth"
		placeholder="Select a masquerade depth"
		options={[...Array.from({ length: 10 }, (_, i) => ({ label: `D${i + 1}`, value: i + 1 }))]}
		bind:value={$duelMasqRunForm.depth}
	/>
</div>
