<script lang="ts">
	import NgsClassFilterTag from '$lib/Components/Filters/FilterTags/NgsClassFilterTag.svelte';
	import ServerRegionFilterTag from '$lib/Components/Filters/FilterTags/ServerRegionFilterTag.svelte';
	import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import { runFilters } from './runFilter';

	$: playerClassFilterTag = parseNgsPlayerClass($runFilters.class);
</script>

{#if !!playerClassFilterTag}
	<NgsClassFilterTag
		ngsClass={playerClassFilterTag}
		on:click={() => ($runFilters.class = 'no_filter')}
	/>
{/if}
{#if $runFilters.server && $runFilters.server != 'no_filter'}
	<ServerRegionFilterTag
		server={$runFilters.server}
		on:click={() => ($runFilters.server = 'no_filter')}
	/>
{/if}
