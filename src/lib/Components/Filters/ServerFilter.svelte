<script lang="ts">
	import RadioButton from '../RadioButton.svelte';

	export let selectedServer: string = 'No Filter';

	const filterServers = [
		{ name: 'No Filter' },
		{ name: 'Global', icon: '/icons/server/server-global.png' },
		{ name: 'Japan', icon: '/icons/server/server-japan.png' }
	];
</script>

<div class="flex flex-row flex-wrap justify-center gap-1 md:justify-start">
	{#each filterServers as serverFilter}
		<RadioButton
			bind:group={selectedServer}
			value={serverFilter.name}
			name="filter-server"
			icon={serverFilter.icon}
			alt={serverFilter.name}
		>
			{serverFilter.name}
		</RadioButton>
	{/each}
</div>
