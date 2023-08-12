<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PurpleRules from '../PurpleRules.svelte';
	import PurplePartyModalRunFilters from './PurplePartyModalRunFilters.svelte';
	import PurpleCategorySelector from '../PurpleCategorySelector.svelte';
	import { purpleRunFilters, type PurpleSearchFilters } from '../purpleRunFilterStore';
	import { t } from 'svelte-i18n';
	import ServerRegionFilterTag from '$lib/Components/Filters/FilterTags/ServerRegionFilterTag.svelte';

	let filters: PurpleSearchFilters = {
		region: 'stia',
		rank: '1',
		server: 'no_filter',
		class: 'no_filter'
	};

	const applyFilters = () => {
		purpleRunFilters.set({ ...filters });
	};

	purpleRunFilters.subscribe((f) => {
		filters = { ...f };
	});

	const resetServerRegion = () => {
		filters.server = 'no_filter';
		filters.class = 'no_filter';
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
			<PurplePartyModalRunFilters bind:server={filters.server} on:applyFilters={applyFilters} />
		</div>
		<div class="m-1 md:flex-initial">
			<PurpleRules />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row gap-2 px-1">
		{#if $purpleRunFilters.server && $purpleRunFilters.server != 'no_filter'}
			<ServerRegionFilterTag server={$purpleRunFilters.server} on:click={resetServerRegion} />
		{/if}
	</div>
</div>
