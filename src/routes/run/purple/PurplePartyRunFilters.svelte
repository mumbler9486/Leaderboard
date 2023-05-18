<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PurpleRules from './PurpleRules.svelte';
	import PurplePartyModalRunFilters from './PurplePartyModalRunFilters.svelte';
	import { partyRunFilters } from './purpleRunFilterStore';
	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { loadUrlParams } from '$lib/utils/queryParams';
	import PurpleCategorySelector from './PurpleCategorySelector.svelte';

	let filters = {
		region: 'stia',
		rank: '1',
		server: 'no_filter'
	};

	const applyFilters = () => {
		partyRunFilters.update((f) => {
			f.region = filters.region;
			f.rank = parseInt(filters.rank.toString());
			f.server = filters.server == 'no_filter' ? undefined : filters.server;
			return f;
		});
	};

	$: loadUrlParamsToStore($page.url);
	const loadUrlParamsToStore = (...watch: any[]) => {
		const pageParams = loadUrlParams(['server', 'region', 'rank']);
		filters.region = pageParams.region ?? 'stia';
		filters.rank = pageParams.rank ?? '1';
		filters.server = pageParams.server ?? 'no_filter';

		applyFilters();
	};
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<PurpleCategorySelector region={filters.region} rank={filters.rank} on:changed={applyFilters} />

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<PurplePartyModalRunFilters bind:server={filters.server} on:applyFilters={applyFilters} />
		</div>
		<div class="m-1 md:flex-initial">
			<PurpleRules />
		</div>
	</div>
</div>
