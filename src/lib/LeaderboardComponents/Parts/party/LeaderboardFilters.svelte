<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { t } from 'svelte-i18n';

	import LB_purplesolo_modal_filters from '$lib/LeaderboardComponents/Modals/PurpleParty/lb_filters.svelte';
	import LB_purplesolo_modal_rules from '$lib/LeaderboardComponents/Modals/PurpleParty/rules.svelte';

	export let filters = {};

	let modalFilters;

	let allowedPatches = ['P60'];
	let patchNames = {
		P60: 'Historical'
	};
	let allowedRegions = ['aelio', 'retem', 'kvaris', 'stia'];
	let allowedRanks = ['1', '2', '3'];

	function clearFilter(type) {
		switch (type) {
			case 'patch':
				filters.patch = null;
				break;
			case 'server':
				filters.server = null;
				break;
		}
		updateURL();
	}

	let userInfo = null;

	onMount(async () => {
		updateURL();
		const response = await fetch('/.auth/me');
		const payload = await response.json();
		const { clientPrincipal } = payload;
		userInfo = clientPrincipal;
	});

	function updateFilters(event) {
		var s = event.detail.server;
		if (s == 'null') {
			s = null;
		}
		var p = event.detail.patch;
		if (p == 'null') {
			p = null;
		}
		filters.server = s;
		filters.patch = p;
		updateURL();
	}

	function updateURL() {
		var urlRef = '/run/purple/party';
		if (filters.region != null && allowedRegions.includes(filters.region)) {
			urlRef += '?region=' + filters.region;
		} else {
			urlRef += '?region=stia';
			filters.region = 'stia';
		}

		if (filters.rank != null && allowedRanks.includes(filters.rank)) {
			if (filters.region == 'stia' && (filters.rank > 1 || filters.rank < 1)) {
				urlRef += '&rank=1';
				filters.rank = '1';
			} else if (filters.region == 'stia' && filters.rank == 1) {
				urlRef += '&rank=1';
				filters.rank = '1';
			}

			if (filters.region == 'kvaris' && (filters.rank > 2 || filters.rank < 1)) {
				urlRef += '&rank=2';
				filters.rank = '2';
			} else if (filters.region == 'kvaris' && filters.rank <= 2) {
				urlRef += '&rank=' + filters.rank;
			}

			if (filters.region == 'retem' && (filters.rank > 3 || filters.rank < 1)) {
				urlRef += '&rank=3';
				filters.rank = '3';
			} else if (filters.region == 'retem' && filters.rank <= 3) {
				urlRef += '&rank=' + filters.rank;
			}

			if (filters.region == 'aelio' && (filters.rank > 3 || filters.rank < 1)) {
				urlRef += '&rank=3';
				filters.rank = '3';
			} else if (filters.region == 'aelio' && filters.rank <= 3) {
				urlRef += '&rank=' + filters.rank;
			}
		} else {
			urlRef += '&rank=1';
			filters.rank = '1';
		}

		if (filters.patch != null && allowedPatches.includes(filters.patch)) {
			urlRef += '&patch=' + filters.patch;
		}

		if (filters.server != null && (filters.server === 'japan' || filters.server === 'global')) {
			urlRef += '&server=' + filters.server;
		}

		history.replaceState({}, '', urlRef);
		dispatch('msgReload');
	}
</script>

<div
	class="-mx-6 flex grow flex-col rounded-md border border-secondary bg-secondary/25 p-1 md:mx-0"
>
	<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
		<div class="flex grow flex-col">
			<label class="label justify-center" for="drop-region">
				<span class="label-text text-base font-semibold">{$t('common.region')}</span>
			</label>
			<select
				bind:value={filters.region}
				on:change={() => updateURL()}
				id="drop-region"
				class="select-bordered select rounded"
			>
				<option value="aelio">{$t('common.regions.aelio')}</option>
				<option value="retem">{$t('common.regions.retem')}</option>
				<option value="kvaris">{$t('common.regions.kvaris')}</option>
				<option value="stia">{$t('common.regions.stia')}</option>
			</select>
		</div>

		<div class="flex grow flex-col">
			<label class="label justify-center" for="drop-rank">
				<span class="label-text text-base font-semibold">Rank</span>
			</label>
			<select
				bind:value={filters.rank}
				on:change={() => updateURL()}
				id="drop-rank"
				class="select-bordered select rounded"
			>
				<option>1</option>
				{#if filters.region == 'aelio' || filters.region == 'retem' || filters.region == 'kvaris'}
					<option>2</option>
					{#if filters.region == 'aelio' || filters.region == 'retem'}
						<option>3</option>
					{/if}
				{/if}
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

		{#if filters.patch && allowedPatches.includes(filters.patch)}
			<span class="badge badge-lg rounded border border-neutral-content/25 py-4">
				Patch: {patchNames[filters.patch]}
				<button class="btn-square btn-xs btn ml-1 rounded" on:click={() => clearFilter('patch')}>
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
<LB_purplesolo_modal_filters
	on:msgFiltersUpdate={updateFilters}
	bind:filters
	modalID="modal-filters"
	bind:this={modalFilters}
/>
