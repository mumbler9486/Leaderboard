<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { ServerRegion } from '$lib/types/api/serverRegions';
	import { runForm } from './runStore';

	const serverOptions = [
		{
			label: 'Global',
			value: ServerRegion.Global
		},
		{
			label: 'Japan',
			value: ServerRegion.Japan
		}
	];
</script>

<Dropdown label="Run Server Region" options={serverOptions} bind:value={$runForm.serverRegion} />
