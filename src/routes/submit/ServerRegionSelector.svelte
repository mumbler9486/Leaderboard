<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { runForm } from './runStore';

	const serverOptions = [
		{
			label: 'Global',
			value: 'global'
		},
		{
			label: 'Japan',
			value: 'japan'
		}
	];
</script>

<Dropdown label="Run Server Region" options={serverOptions} bind:value={$runForm.serverRegion} />
