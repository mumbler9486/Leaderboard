<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { pageFilters } from '$lib/stores/indomitableFilterStore';
	import { t } from 'svelte-i18n';

	import Filters from './Filters.svelte';
	import IndomitableRules from './IndomitableRules.svelte';

	let selectedClass: string = $page.url.searchParams.get('class') ?? 'No Filter';
	let selectedServer: string = $page.url.searchParams.get('server') ?? 'No Filter';

	const updateUrl = () => {
		if (selectedClass != 'No Filter') {
			$page.url.searchParams.set('class', selectedClass);
		}
		if (selectedServer != 'No Filter') {
			$page.url.searchParams.set('server', selectedServer);
		}
		if (selectedClass == 'No Filter') $page.url.searchParams.delete('class');
		if (selectedServer == 'No Filter') $page.url.searchParams.delete('server');

		goto($page.url);
		pageFilters.set({ class: selectedClass, server: selectedServer });
	};
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<Filters bind:selectedClass bind:selectedServer on:applyFilters={updateUrl} />
		</div>
		<div class="m-1 md:flex-initial">
			<IndomitableRules />
		</div>
	</div>
</div>
