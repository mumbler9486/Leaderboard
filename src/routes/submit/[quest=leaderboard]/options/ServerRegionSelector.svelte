<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { ServerRegion } from '$lib/types/api/serverRegions';
	import { runForm } from '../runForm';

	const serverOptions = [
		{
			label: 'Global',
			value: ServerRegion.Global,
		},
		{
			label: 'Japan',
			value: ServerRegion.Japan,
		},
	];
</script>

<Select
	label="Run Server Region"
	placeholder="Select a server region"
	options={serverOptions}
	bind:value={$runForm.serverRegion}
/>
