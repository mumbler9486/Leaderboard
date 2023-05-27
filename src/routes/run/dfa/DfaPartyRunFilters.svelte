<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import DfaRules from './DfaRules.svelte';
	import DfaPartyModalRunFilters from './DfaPartyModalRunFilters.svelte';
	import { partyRunFilters, type DfaPartySearchFilters } from './dfaRunFilterStore';
	import { t } from 'svelte-i18n';

	let filters: DfaPartySearchFilters = {
		trigger: 'urgent',
		buff: 'no_filter',
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
				bind:server={filters.server}
				bind:support={filters.buff}
				on:applyFilters={applyFilters}
			/>
		</div>
		<div class="m-1 md:flex-initial">
			<DfaRules />
		</div>
	</div>
</div>
