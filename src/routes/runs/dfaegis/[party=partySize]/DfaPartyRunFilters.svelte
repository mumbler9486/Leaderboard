<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import DfaRules from '../DfaRules.svelte';
	import DfaPartyModalRunFilters from './DfaPartyModalRunFilters.svelte';
	import { dfAegisRunFilters, type DfaSearchFilters } from '../dfaRunFilterStore';
	import { t } from 'svelte-i18n';
	import DfaSupportFilterTag from '$lib/Components/Filters/FilterTags/DfaSupportFilterTag.svelte';
	import ServerRegionFilterTag from '$lib/Components/Filters/FilterTags/ServerRegionFilterTag.svelte';
	import PartySizeNavigation from '$lib/Components/PartySizeNavigation.svelte';
	import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import NgsClassFilterTag from '$lib/Components/Filters/FilterTags/NgsClassFilterTag.svelte';

	export let solo: boolean;

	$: playerClassFilterTag = parseNgsPlayerClass($dfAegisRunFilters.class);

	let filters: DfaSearchFilters = {
		trigger: 'urgent_quest',
		class: 'no_filter',
		support: 'no_filter',
		server: 'no_filter',
		rank: '1'
	};

	const partyLinks = [
		{ link: '/runs/dfaegis/solo', label: 'Solo' },
		{ link: '/runs/dfaegis/duo', label: 'Duo' },
		{ link: '/runs/dfaegis/party', label: 'Party' }
	];

	const applyFilters = () => {
		dfAegisRunFilters.set({ ...filters });
	};

	dfAegisRunFilters.subscribe((f) => {
		filters = { ...f };
	});

	const resetClassFilter = () => {
		filters.class = 'no_filter';
		applyFilters();
	};

	const resetServerRegion = () => {
		filters.server = 'no_filter';
		applyFilters();
	};

	const resetBuffFilter = () => {
		filters.support = 'no_filter';
		applyFilters();
	};
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="grid w-full grid-cols-3 gap-4 py-2 px-4">
			<PartySizeNavigation parties={partyLinks} />
		</div>
	</div>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="flex grow flex-col">
			<Dropdown
				label="Type"
				options={[
					{ label: 'Urgent Quest', value: 'urgent_quest' },
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
			<DfaPartyModalRunFilters
				{solo}
				bind:mainClass={filters.class}
				bind:server={filters.server}
				bind:support={filters.support}
				on:applyFilters={applyFilters}
			/>
		</div>
		<div class="m-1 md:flex-initial">
			<DfaRules />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />

	<div class="flex flex-row gap-2 px-1">
		{#if !!playerClassFilterTag}
			<NgsClassFilterTag ngsClass={playerClassFilterTag} on:click={resetClassFilter} />
		{/if}
		{#if $dfAegisRunFilters.server && $dfAegisRunFilters.server != 'no_filter'}
			<ServerRegionFilterTag server={$dfAegisRunFilters.server} on:click={resetServerRegion} />
		{/if}
		{#if $dfAegisRunFilters.support && $dfAegisRunFilters.support != 'no_filter'}
			<DfaSupportFilterTag support={$dfAegisRunFilters.support} on:click={resetBuffFilter} />
		{/if}
	</div>
</div>
