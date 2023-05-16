<script lang="ts">
	import Filters from './IndomitableRunFilterModal.svelte';
	import IndomitableRules from './IndomitableRules.svelte';
	import Divider from '$lib/Components/Divider.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { page } from '$app/stores';
	import { indomitableRunFilters } from './runFilterStore';
	import { loadUrlParams } from '$lib/utils/queryParams';
	import { t } from 'svelte-i18n';

	let filters = {
		server: 'no_filter',
		class: 'no_filter',
		augmentations: 'yes'
	};

	const applyFilters = () => {
		indomitableRunFilters.update((f) => {
			f.server = filters.server == 'no_filter' ? undefined : filters.server;
			f.class = filters.class == 'no_filter' ? undefined : filters.class;
			f.augmentations = filters.augmentations;
			return f;
		});
	};

	$: loadUrlParamsToStore($page.url);
	const loadUrlParamsToStore = (...watch: any[]) => {
		const pageParams = loadUrlParams(['server', 'class', 'augmentations']);
		filters.server = pageParams.server ?? 'no_filter';
		filters.class = pageParams.class ?? 'no_filter';
		filters.augmentations = pageParams.augmentations ?? 'yes';

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
