<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { onMount } from 'svelte';
	import { runForm, dfaForm } from './runStore';

	const options = [
		{ label: 'Purple Triggers', value: 'purples' },
		{ label: 'Dark Falz Aegis', value: 'dfa' },
		{ label: 'Duels (Indomitables)', value: 'duels-indomitables' }
	];
</script>

<Dropdown
	label="Category"
	placeholder="Select a category"
	{options}
	bind:value={$runForm.category}
/>
