<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { t } from 'svelte-i18n';

	import Filters from './Filters.svelte';
	import IndomitableRules from './IndomitableRules.svelte';

	let selectedClass: string = $page.url.searchParams.get('class') ?? 'No Filter';
	let selectedServer: string = $page.url.searchParams.get('server') ?? 'No Filter';
	let userInfo: any = {};
	let filters: any = {};
	const updateUrl = () => {
		if (selectedClass != 'No Filter') {
			$page.url.searchParams.set('class', selectedClass);
		}
		if (selectedServer != 'No Filter') {
			$page.url.searchParams.set('server', selectedServer);
		}
		if (selectedClass == 'No Filter') $page.url.searchParams.delete('class');
		if (selectedServer == 'No Filter') $page.url.searchParams.delete('server');

		goto(`?${$page.url.searchParams.toString()}`);
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
	<!-- DIVIDER FOR FANCINESS. NOT SURE HOW TO BEST SHORTEN THIS -->
	{#if filters.server && (filters.server == 'global' || filters.server == 'japan')}
		<div class="divider -mx-1 my-0" />
	{/if}
	<!-- FILTER CATEGORIES STARTER. AGAIN, NOT SURE HOW BEST TO SHORTEN THIS -->
	<div class="flex flex-row flex-wrap place-content-center gap-1 md:place-content-start">
		<!-- SOLO PURPLE FILTER DISPLAYS -->
		{#if filters.server && (filters.server === 'global' || filters.server === 'japan')}
			<span class="badge badge-lg rounded border border-neutral-content/25 py-4">
				Server: {filters.server.charAt(0).toUpperCase() + filters.server.slice(1).toLowerCase()}
				<img src="/icons/server/server-{filters.server}.png" alt="Global" class="ml-1" />
				<button class="btn-square btn-xs btn ml-1 rounded">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</span>
		{/if}
	</div>
</div>
