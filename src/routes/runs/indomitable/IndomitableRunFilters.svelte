<script lang="ts">
	import Filters from './IndomitableRunFilterModal.svelte';
	import IndomitableRules from './IndomitableRules.svelte';
	import Divider from '$lib/Components/Divider.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { indomitableRunFilters, type IndomitableRunSearchFilters } from './runFilterStore';
	import { t } from 'svelte-i18n';

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
</div>
