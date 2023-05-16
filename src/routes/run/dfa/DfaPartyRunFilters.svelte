<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import DfaRules from './DfaRules.svelte';
	import DfaPartyModalRunFilters from './DfaPartyModalRunFilters.svelte';
	import { partyRunFilters } from './dfaRunFilterStore';
	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { loadUrlParams } from '$lib/utils/queryParams';

	let filters = {
		trigger: 'urgent',
		class: 'no_filter',
		buff: 'no_filter',
		region: 'no_filter'
	};

	const applyFilters = () => {
		partyRunFilters.update((f) => {
			f.region = filters.region == 'no_filter' ? undefined : filters.region;
			f.buff = filters.buff == 'no_filter' ? undefined : filters.buff;
			f.trigger = filters.trigger;
			return f;
		});
	};

	$: loadUrlParamsToStore($page.url);
	const loadUrlParamsToStore = (...watch: any[]) => {
		const pageParams = loadUrlParams(['region', 'buff', 'trigger']);
		filters.region = pageParams.region ?? 'no_filter';
		filters.buff = pageParams.buff ?? 'no_filter';
		filters.trigger = pageParams.trigger ?? 'urgent';

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
	</div>

	<Divider class="-mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<DfaPartyModalRunFilters
				bind:server={filters.region}
				bind:support={filters.buff}
				on:applyFilters={applyFilters}
			/>
		</div>
		<div class="m-1 md:flex-initial">
			<DfaRules />
		</div>
	</div>
</div>
