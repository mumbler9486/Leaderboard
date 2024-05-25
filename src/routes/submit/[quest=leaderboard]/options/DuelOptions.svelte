<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { duelsRunForm } from '../forms/duelsForm';

	const supportOptions = [
		{ label: 'Yes, at least one', value: true },
		{ label: 'No, not at all', value: false },
	];
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<Select
		label="Defi Augments Used?"
		options={supportOptions}
		bind:value={$duelsRunForm.augments}
	/>
</div>
