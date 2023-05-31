<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PurpleRules from '../PurpleRules.svelte';
	import PurpleSoloModalRunFilters from './PurpleSoloModalRunFilters.svelte';
	import PurpleCategorySelector from '../PurpleCategorySelector.svelte';
	import NgsClassFilterTag from '$lib/Components/Filters/FilterTags/NgsClassFilterTag.svelte';
	import ServerRegionFilterTag from '$lib/Components/Filters/FilterTags/ServerRegionFilterTag.svelte';
	import { soloRunFilters, type PurpleSoloSearchFilters } from '../purpleRunFilterStore';
	import { t } from 'svelte-i18n';
	import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';

	let filters: PurpleSoloSearchFilters = {
		server: 'no_filter',
		region: 'stia',
		rank: '1',
		class: 'no_filter'
	};

	const applyFilters = () => {
		soloRunFilters.set({ ...filters });
	};

	soloRunFilters.subscribe((f) => {
		filters = { ...f };
	});

	$: playerClassFilterTag = parseNgsPlayerClass($soloRunFilters.class);

	const resetClassFilter = () => {
		filters.class = 'no_filter';
		applyFilters();
	};

	const resetServerRegion = () => {
		filters.server = 'no_filter';
		applyFilters();
	};
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<PurpleCategorySelector
		bind:region={filters.region}
		bind:rank={filters.rank}
		on:changed={applyFilters}
	/>

	<Divider class="-mx-1 my-0" />

	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<PurpleSoloModalRunFilters
				bind:server={filters.server}
				bind:mainClass={filters.class}
				on:applyFilters={applyFilters}
			/>
		</div>
		<div class="m-1 md:flex-initial">
			<PurpleRules />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />

	<div class="flex flex-row gap-2 px-1">
		{#if playerClassFilterTag}
			<NgsClassFilterTag ngsClass={playerClassFilterTag} on:click={resetClassFilter} />
		{/if}
		{#if $soloRunFilters.server && $soloRunFilters.server != 'no_filter'}
			<ServerRegionFilterTag server={$soloRunFilters.server} on:click={resetServerRegion} />
		{/if}
	</div>
</div>
