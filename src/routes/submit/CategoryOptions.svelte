<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { runForm, resetForm } from './runStore';

	let category: string = 'purples';

	$: $runForm.category = category;

	const categoryChanged = () => {
		resetForm();
		$runForm.category = category;
	};

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
	on:change={categoryChanged}
	bind:value={category}
/>
