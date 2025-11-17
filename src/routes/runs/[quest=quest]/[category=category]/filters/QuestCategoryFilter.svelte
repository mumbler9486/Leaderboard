<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { createEventDispatcher } from 'svelte';
	import { runFilters } from '../../../runFilter';

	interface Props {
		categories: NgsRunCategories[];
	}

	let { categories }: Props = $props();

	const dispatch = createEventDispatcher();

	const categoryOptions = [
		{ label: 'Quest', value: NgsRunCategories.Quest },
		{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest },
		{ label: 'Trigger', value: NgsRunCategories.Trigger },
	];
	let selectableCategories = $derived(categoryOptions.filter((c) => categories.includes(c.value)));

	const onCategoryChanged = (e: CustomEvent<NgsRunCategories>) => {
		const newCategory = e.detail;
		dispatch('categoryChanged', newCategory);
	};
</script>

{#if selectableCategories.length !== 0}
	<RadioOptions
		name="category"
		options={selectableCategories}
		on:changed={onCategoryChanged}
		bind:value={$runFilters.category}
	/>
{/if}
