<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { ngsCategoryTranslationMap, NgsRunCategories } from '$lib/types/api/runs/categories';
	import { questForm } from '../forms/questForm';
	import { t } from 'svelte-i18n';

	interface Props {
		allowedCategories?: NgsRunCategories[];
	}

	let { allowedCategories = [] }: Props = $props();

	let selectableOptions = $derived(allowedCategories.map((c) => ({
		label: $t(ngsCategoryTranslationMap[c]),
		value: c,
	})));
</script>

<Select
	label="Category"
	placeholder="Select a category"
	options={selectableOptions}
	bind:value={$questForm.category}
	on:change
/>
