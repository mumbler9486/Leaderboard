<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PurpleRules from './PurpleRules.svelte';
	import PurpleSoloModalRunFilters from './PurpleSoloModalRunFilters.svelte';
	import { soloRunFilters } from './purpleRunFilterStore';
	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { loadUrlParams } from '$lib/utils/queryParams';
	import PurpleCategorySelector from './PurpleCategorySelector.svelte';

	let filters = {
		server: 'no_filter',
		region: 'stia',
		rank: '1',
		class: 'no_filter'
	};

	const applyFilters = () => {
		soloRunFilters.update((f) => {
			f.server = filters.server == 'no_filter' ? undefined : filters.server;
			f.region = filters.region;
			f.rank = parseInt(filters.rank);
			f.class = filters.class == 'no_filter' ? undefined : filters.class;
			return f;
		});
	};

	$: loadUrlParamsToStore($page);
	const loadUrlParamsToStore = (...watch: any[]) => {
		const pageParams = loadUrlParams(['region', 'class', 'buff', 'trigger']);
		filters.server = pageParams.server ?? 'no_filter';
		filters.region = pageParams.region ?? 'stia';
		filters.rank = pageParams.rank ?? '1';
		filters.class = pageParams.class ?? 'no_filter';

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
</div>
