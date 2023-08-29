<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { t } from 'svelte-i18n';
	import PartySizeNavigation from '$lib/Components/PartySizeNavigation.svelte';
	import RunFilterModal from '../../RunFilterModal.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import RunFilterTags from '../../RunFilterTags.svelte';
	import RunRules from '../../RunRules.svelte';
	import { defaultRunFilter, runFilters, type RunSearchFilters } from '../../runFilter';

	export let solo: boolean;

	let filters: RunSearchFilters = {
		...defaultRunFilter
	};

	const rules = ['Do not abuse bugs or exploits.'];

	const partyLinks = [
		{ link: '/runs/dfaegis/solo', label: 'Solo' },
		{ link: '/runs/dfaegis/duo', label: 'Duo' },
		{ link: '/runs/dfaegis/party', label: 'Party' }
	];

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
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="flex grow flex-col">
			<Dropdown
				label="Type"
				options={[
					{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest },
					{ label: 'Trigger', value: NgsRunCategories.Trigger }
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
			<RunFilterModal
				classFilter={solo}
				dfAegisSupportFilter={true}
				bind:server={filters.server}
				bind:mainClass={filters.class}
				bind:dfAegisSupport={filters.support}
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
