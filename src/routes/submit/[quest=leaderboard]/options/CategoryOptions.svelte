<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { questForm } from '../questForm';

	export let allowedCategories: NgsRunCategories[] = [];

	const allOptions = [
		{ label: 'Quest', value: NgsRunCategories.Quest },
		{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest },
		{ label: 'Trigger', value: NgsRunCategories.Trigger },
		{ label: 'Nex Aelio', value: NgsRunCategories.NexAelio },
		{ label: 'Renus Retem', value: NgsRunCategories.RenusRetem },
		{ label: 'Ams Kvaris', value: NgsRunCategories.AmsKvaris },
		{ label: 'Nils Stia', value: NgsRunCategories.NilsStia },
		{ label: 'Halvaldi', value: NgsRunCategories.Halvaldi },
		{ label: 'Zelvin', value: NgsRunCategories.Zelvin },
		{ label: 'Ringwedge', value: NgsRunCategories.Ringwedge },
		{ label: 'Aelio', value: NgsRunCategories.Aelio },
		{ label: 'Retem', value: NgsRunCategories.Retem },
		{ label: 'Kvaris', value: NgsRunCategories.Kvaris },
		{ label: 'Stia', value: NgsRunCategories.Stia },
		{ label: 'Aelio Intruders', value: NgsRunCategories.AelioIntruders },
	];

	$: selectableOptions = allOptions.filter((o) => allowedCategories.includes(o.value));
</script>

<Select
	label="Mode"
	placeholder="Select a mode"
	options={selectableOptions}
	bind:value={$questForm.category}
	on:change
/>
