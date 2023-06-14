<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import DfaRules from '../DfaRules.svelte';
	import DfaSoloModalRunFilters from './DfaSoloModalRunFilters.svelte';
	import { t } from 'svelte-i18n';
	import { soloRunFilters, type DfaSoloSearchFilters } from '../dfaRunFilterStore';
	import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import NgsClassFilterTag from '$lib/Components/Filters/FilterTags/NgsClassFilterTag.svelte';
	import ServerRegionFilterTag from '$lib/Components/Filters/FilterTags/ServerRegionFilterTag.svelte';
	import DfaSupportFilterTag from '$lib/Components/Filters/FilterTags/DfaSupportFilterTag.svelte';

	let filters: DfaSoloSearchFilters = {
		trigger: 'urgent',
		class: 'no_filter',
		buff: 'no_filter',
		server: 'no_filter',
		rank: '1'
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
		<div class="flex grow flex-col">
			<Dropdown
				label="Type"
				options={[
					{ label: 'Urgent Quest', value: 'urgent' },
					{ label: 'Trigger', value: 'trigger' }
				]}
				bind:value={filters.trigger}
				on:change={applyFilters}
			/>
		</div>
		<!-- <div class="flex grow flex-col">
			<Dropdown
				label="Rank"
				options={[
					{ label: '1', value: '1' },
					{ label: '2', value: '2' }
				]}
				bind:value={filters.rank}
				on:change={applyFilters}
			/>
		</div> -->
	</div>

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<DfaSoloModalRunFilters
				bind:server={filters.server}
				bind:mainClass={filters.class}
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
		{#if playerClassFilterTag}
			<NgsClassFilterTag ngsClass={playerClassFilterTag} on:click={resetClassFilter} />
		{/if}
		{#if $soloRunFilters.buff && $soloRunFilters.buff != 'no_filter'}
			<DfaSupportFilterTag support={$soloRunFilters.buff} on:click={resetBuffFilter} />
		{/if}
		{#if $soloRunFilters.server && $soloRunFilters.server != 'no_filter'}
			<ServerRegionFilterTag server={$soloRunFilters.server} on:click={resetServerRegion} />
		{/if}
	</div>
</div>
