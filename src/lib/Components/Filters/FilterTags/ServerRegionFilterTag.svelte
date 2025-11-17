<script lang="ts">
	import { ServerRegion } from '$lib/types/api/serverRegions';
	import FilterTag from './FilterTag.svelte';

	interface Props {
		server: string;
	}

	let { server }: Props = $props();


	const regionMap: { [region: string]: { label: string; icon: string } } = {
		[ServerRegion.Global]: { label: 'Global Only', icon: '/icons/server/server-global.png' },
		[ServerRegion.Japan]: { label: 'Japan Only', icon: '/icons/server/server-japan.png' },
		[ServerRegion.Unknown]: { label: '-', icon: '/icons/class/class-unknown.png' }
	};
	let regionInfo = $derived(regionMap[server.toLowerCase()] ?? regionMap['unknown']);
</script>

<FilterTag icon={regionInfo.icon} label={regionInfo.label} on:click />
