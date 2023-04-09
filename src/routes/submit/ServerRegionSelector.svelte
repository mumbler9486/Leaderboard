<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { runForm } from './runStore';

	let serverRegion = '';

	$: $runForm.serverRegion = serverRegion;

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

<Dropdown label="Run Server Region" options={serverOptions} bind:value={serverRegion} />
