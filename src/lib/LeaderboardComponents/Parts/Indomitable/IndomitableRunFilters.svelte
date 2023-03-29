<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { t } from 'svelte-i18n';

	import Filters from '$lib/LeaderboardComponents/Parts/Indomitable/Filters.svelte';
	import LB_purplesolo_modal_rules from '$lib/LeaderboardComponents/Modals/PurpleDuo/rules.svelte';

	export let filters = {};

	let modalFilters;

	function clearFilter(type) {
		switch (type) {
			case 'server':
				filters.rank = null;
				break;
		}
	}

	let userInfo = null;
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="flex grow flex-col">
			<label class="label justify-center" for="drop-region">
				<span class="label-text text-base font-semibold">Rank</span>
			</label>
			<select
				bind:value={filters.rank}
				on:change={() => updateURL()}
				id="drop-region"
				class="select-bordered select rounded"
			>
				<option value="1">1</option>
			</select>
		</div>
	</div>

	<div class="divider -mx-1 my-0" />
	<div class="flex flex-row flex-wrap place-content-center items-stretch">
		<div class="m-1 md:flex-1">
			<label
				for="modal-filters"
				class="btn-outline btn-primary btn-sm btn rounded"
				on:click={() => modalFilters.openRefresh()}><i class="bi bi-funnel mr-2" />Filters</label
			>
		</div>
		<div class="m-1 md:flex-initial">
			<label for="modal-rules" class="btn-outline btn-primary btn-sm btn rounded"
				><i class="bi bi-journal-check mr-2" />Rules</label
			>
		</div>
		{#if userInfo != null && userInfo.userRoles.includes('user')}
			<div class="m-1 md:flex-initial">
				<a href="/submit" class="btn-outline btn-primary btn-sm btn rounded"
					><i class="bi bi-envelope-paper mr-2" />Submit</a
				>
			</div>
		{/if}
	</div>
	<!-- DIVIDER FOR FANCINESS. NOT SURE HOW TO BEST SHORTEN THIS -->
	{#if (filters.server && (filters.server == 'global' || filters.server == 'japan')) || (filters.patch && allowedPatches.includes(filters.patch))}
		<div class="divider -mx-1 my-0" />
	{/if}
	<!-- FILTER CATEGORIES STARTER. AGAIN, NOT SURE HOW BEST TO SHORTEN THIS -->
	<div class="flex flex-row flex-wrap place-content-center gap-1 md:place-content-start">
		<!-- SOLO PURPLE FILTER DISPLAYS -->
		{#if filters.server && (filters.server === 'global' || filters.server === 'japan')}
			<span class="badge badge-lg rounded border border-neutral-content/25 py-4">
				Server: {filters.server.charAt(0).toUpperCase() + filters.server.slice(1).toLowerCase()}
				<img src="/icons/server/server-{filters.server}.png" alt="Global" class="ml-1" />
				<button class="btn-square btn-xs btn ml-1 rounded" on:click={() => clearFilter('server')}>
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

<LB_purplesolo_modal_rules modalID="modal-rules" />
<Filters
	bind:filters
	modalID="modal-filters"
	bind:this={modalFilters}
/>
