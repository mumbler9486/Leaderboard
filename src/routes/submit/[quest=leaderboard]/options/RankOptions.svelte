<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { questForm } from '../questForm';

	export let maxRank: number;

	$: selectableOptions = new Array(maxRank)
		.fill(0)
		.map((_, i) => ({ label: (i + 1).toString(), value: i + 1 }));
</script>

<Select
	label="Rank"
	placeholder="Select a rank"
	options={selectableOptions}
	bind:value={$questForm.questRank}
	on:change
/>
