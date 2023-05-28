<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PurpleRules from '../PurpleRules.svelte';
	import PurplePartyModalRunFilters from './PurplePartyModalRunFilters.svelte';
	import PurpleCategorySelector from '../PurpleCategorySelector.svelte';
	import { partyRunFilters, type PurplePartySearchFilters } from '../purpleRunFilterStore';
	import { t } from 'svelte-i18n';

	let filters: PurplePartySearchFilters = {
		region: 'stia',
		rank: '1',
		server: 'no_filter'
	};

	const applyFilters = () => {
		partyRunFilters.set({ ...filters });
	};

	partyRunFilters.subscribe((f) => {
		filters = { ...f };
	});
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
			<PurplePartyModalRunFilters bind:server={filters.server} on:applyFilters={applyFilters} />
		</div>
		<div class="m-1 md:flex-initial">
			<PurpleRules />
		</div>
	</div>
</div>
