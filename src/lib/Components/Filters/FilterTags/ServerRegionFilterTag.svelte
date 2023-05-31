<script lang="ts">
	import FilterTag from './FilterTag.svelte';

	export let server: string;

	$: regionInfo = regionMap[server.toLowerCase()] ?? regionMap['unknown'];

	const regionMap: { [region: string]: { label: string; icon: string } } = {
		['global']: { label: 'Global Only', icon: '/icons/server/server-global.png' },
		['japan']: { label: 'Japan Only', icon: '/icons/server/server-japan.png' },
		['unknown']: { label: '-', icon: '/icons/class/class-unknown.png' }
	};
</script>

<FilterTag icon={regionInfo.icon} label={regionInfo.label} on:click />
