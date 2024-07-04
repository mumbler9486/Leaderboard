<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { ngsCategoryTranslationMap, NgsRunCategories } from '$lib/types/api/runs/categories';
	import { questForm } from '../forms/questForm';
	import { t } from 'svelte-i18n';

	export let allowedCategories: NgsRunCategories[] = [];

	// Maps NgsRunCategories to translation key
	const allOptions = (
		Object.entries(ngsCategoryTranslationMap) as [NgsRunCategories, string][]
	).map(([key, value]) => ({ label: $t(value), value: key }));

	$: selectableOptions = allowedCategories.map((c) => ({
		label: $t(ngsCategoryTranslationMap[c]),
		value: c,
	}));
</script>

<Select
	label="Category"
	placeholder="Select a category"
	options={selectableOptions}
	bind:value={$questForm.category}
	on:change
/>
