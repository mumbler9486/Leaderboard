<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import DfaRules from '../VenogiaRules.svelte';
	import DfaPartyModalRunFilters from './VenogiaModalRunFilters.svelte';
	import { t } from 'svelte-i18n';
	import DfaSupportFilterTag from '$lib/Components/Filters/FilterTags/DfaSupportFilterTag.svelte';
	import ServerRegionFilterTag from '$lib/Components/Filters/FilterTags/ServerRegionFilterTag.svelte';
	import { partyRunFilters, type VenogiaPartySearchFilters } from '../venogiaRunFilterStore';
	import PartySizeNavigation from './PartySizeNavigation.svelte';

	let filters: VenogiaPartySearchFilters = {
		buff: 'no_filter',
		server: 'no_filter',
		rank: '1'
	};

	const applyFilters = () => {
		partyRunFilters.set({ ...filters });
	};

	partyRunFilters.subscribe((f) => {
		filters = { ...f };
	});

	const resetBuffFilter = () => {
		filters.buff = 'no_filter';
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
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="grid w-full grid-cols-3 gap-4 py-2 px-4">
			<PartySizeNavigation />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<DfaPartyModalRunFilters
				bind:server={filters.server}
				bind:support={filters.buff}
				on:applyFilters={applyFilters}
			/>
		</div>
		<div class="m-1 md:flex-initial">
			<DfaRules />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />

	<div class="flex flex-row gap-2 px-1">
		{#if $partyRunFilters.buff && $partyRunFilters.buff != 'no_filter'}
			<DfaSupportFilterTag support={$partyRunFilters.buff} on:click={resetBuffFilter} />
		{/if}
		{#if $partyRunFilters.server && $partyRunFilters.server != 'no_filter'}
			<ServerRegionFilterTag server={$partyRunFilters.server} on:click={resetServerRegion} />
		{/if}
	</div>
</div>
