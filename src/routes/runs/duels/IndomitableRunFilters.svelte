<script lang="ts">
	import Filters from './IndomitableRunFilterModal.svelte';
	import IndomitableRules from './IndomitableRules.svelte';
	import Divider from '$lib/Components/Divider.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import NgsClassFilterTag from '$lib/Components/Filters/FilterTags/NgsClassFilterTag.svelte';
	import ServerRegionFilterTag from '$lib/Components/Filters/FilterTags/ServerRegionFilterTag.svelte';
	import { indomitableRunFilters, type IndomitableRunSearchFilters } from './runFilterStore';
	import { t } from 'svelte-i18n';
	import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';

	let filters: IndomitableRunSearchFilters = {
		server: 'no_filter',
		class: 'no_filter',
		augmentations: 'no_filter'
	};

	const applyFilters = () => {
		indomitableRunFilters.set({ ...filters });
	};

	indomitableRunFilters.subscribe((f) => {
		filters = { ...f };
	});

	$: playerClassFilterTag = parseNgsPlayerClass($indomitableRunFilters.class);

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
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="flex grow flex-col">
			<Dropdown
				label="Augmentations"
				options={[
					{ label: 'No Filter', value: 'no_filter' },
					{ label: 'Yes', value: 'yes' },
					{ label: 'No', value: 'no' }
				]}
				bind:value={filters.augmentations}
				on:change={applyFilters}
			/>
		</div>
		<div class="flex grow flex-col">
			<Dropdown label="Rank" options={[{ label: '1', value: 1 }]} />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<Filters
				bind:mainClass={filters.class}
				bind:server={filters.server}
				on:applyFilters={applyFilters}
			/>
		</div>
		<div class="m-1 md:flex-initial">
			<IndomitableRules />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />

	<div class="flex flex-row gap-2 px-1">
		{#if playerClassFilterTag}
			<NgsClassFilterTag ngsClass={playerClassFilterTag} on:click={resetClassFilter} />
		{/if}
		{#if $indomitableRunFilters.server && $indomitableRunFilters.server != 'no_filter'}
			<ServerRegionFilterTag server={$indomitableRunFilters.server} on:click={resetServerRegion} />
		{/if}
	</div>
</div>
