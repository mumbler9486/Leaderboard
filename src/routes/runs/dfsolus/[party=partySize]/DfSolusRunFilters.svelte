<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import NgsClassFilterTag from '$lib/Components/Filters/FilterTags/NgsClassFilterTag.svelte';
	import ServerRegionFilterTag from '$lib/Components/Filters/FilterTags/ServerRegionFilterTag.svelte';
	import PartySizeNavigation from '$lib/Components/PartySizeNavigation.svelte';
	import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import RunFilterModal from '../../RunFilterModal.svelte';
	import RunFilterTags from '../../RunFilterTags.svelte';
	import RunRules from '../../RunRules.svelte';
	import DfAegisRules from '../DfSolusRules.svelte';
	import { runFilters, type DfSolusSearchFilters } from '../dfSolusRunFilterStore';

	export let solo: boolean;

	$: playerClassFilterTag = parseNgsPlayerClass($runFilters.class);

	let filters: DfSolusSearchFilters = {
		class: 'no_filter',
		server: 'no_filter',
		rank: '1'
	};

	const partyLinks = [
		{ link: '/runs/dfsolus/solo', label: 'Solo' },
		{ link: '/runs/dfsolus/duo', label: 'Duo' },
		{ link: '/runs/dfsolus/party', label: 'Party' }
	];
	const rules = ['Do not abuse bugs or exploits.'];

	const applyFilters = () => {
		runFilters.set({ ...filters });
	};

	runFilters.subscribe((f) => {
		filters = { ...f };
	});
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="grid w-full grid-cols-3 gap-4 px-4 py-2">
			<PartySizeNavigation parties={partyLinks} />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<RunFilterModal
				classFilter={solo}
				bind:server={filters.server}
				bind:mainClass={filters.class}
				on:applyFilters={applyFilters}
			/>
		</div>
		<div class="m-1 md:flex-initial">
			<RunRules {rules} />
		</div>
	</div>

	<Divider class="-mx-1 my-0" />

	<div class="flex flex-row gap-2 px-1">
		<RunFilterTags />
	</div>
</div>
