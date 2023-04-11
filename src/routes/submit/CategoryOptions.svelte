<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { runForm, dfaForm } from './runStore';

	const options = [
		{ label: 'Purple Triggers', value: 'purples' },
		{ label: 'Dark Falz Aegis', value: 'dfa' },
		{ label: 'Duels (Indomitables) [Coming soon]', value: 'duels-indomitables', disabled: true }
	];
</script>

<Dropdown
	label="Category"
	placeholder="Select a category"
	{options}
	bind:value={$runForm.category}
/>
