<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { runForm, resetForm, resetPlayerSize } from './runStore';

	let selectedCategory: string = $runForm.category;

	const categoryChanged = () => {
		const prevCategory = $runForm.category;
		const prevServerRegion = $runForm.serverRegion;
		resetForm();
		$runForm.category = prevCategory;
		$runForm.serverRegion = prevServerRegion;

		resetPlayerSize(1);
	};

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
	on:change={categoryChanged}
	bind:value={selectedCategory}
/>
