<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import PurpleCategorySelector from '../PurpleCategorySelector.svelte';
	import { t } from 'svelte-i18n';
	import RunFilterModal from '../../RunFilterModal.svelte';
	import RunFilterTags from '../../RunFilterTags.svelte';
	import { defaultRunFilter, runFilters, type RunSearchFilters } from '../../runFilter';
	import RunRules from '../../RunRules.svelte';

	export let solo: boolean;

	let filters: RunSearchFilters = {
		...defaultRunFilter
	};

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
	<PurpleCategorySelector
		bind:region={filters.region}
		bind:rank={filters.rank}
		on:changed={applyFilters}
	/>

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
