<script lang="ts">
	import { ServerRegion } from '$lib/types/api/serverRegions';
	import RadioButton from '../RadioButton.svelte';

	export let selectedServer: string = 'no_filter';

	const filterServers = [
		{ name: 'No Filter', value: 'no_filter' },
		{ name: 'Global', value: ServerRegion.Global, icon: '/icons/server/server-global.png' },
		{ name: 'Japan', value: ServerRegion.Japan, icon: '/icons/server/server-japan.png' }
	];
</script>

<div class="flex flex-row flex-wrap justify-center gap-1 md:justify-start">
	{#each filterServers as serverFilter}
		<RadioButton
			bind:group={selectedServer}
			value={serverFilter.value}
			name="filter-server"
			icon={serverFilter.icon}
			alt={serverFilter.name}
		>
			{serverFilter.name}
		</RadioButton>
	{/each}
</div>
