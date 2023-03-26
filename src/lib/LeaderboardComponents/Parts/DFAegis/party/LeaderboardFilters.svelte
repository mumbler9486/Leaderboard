<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { t } from 'svelte-i18n';

	import LB_purplesolo_modal_filters from '$lib/LeaderboardComponents/Parts/DFAegis/party/Filters.svelte';
	import LB_purplesolo_modal_rules from '$lib/LeaderboardComponents/Modals/PurpleDuo/rules.svelte';

	export let filters = {};

	let modalFilters;

	let allowedBuffs = ['ilma', 'glen', 'ainamanon', 'nadereh'];

	const buffName = {
		glen: 'Glen',
		ilma: 'Ilma',
		ainamanon: 'Aina & Manon',
		nadereh: 'Nadereh'
	};
	const buffIcon = {
		glen: '/icons/dfa/glen.png',
		ilma: '/icons/dfa/ilma.png',
		ainamanon: '/icons/dfa/ainamanon.png',
		nadereh: '/icons/dfa/nadereh.png'
	};

	function clearFilter(type) {
		switch (type) {
			case 'buff':
				filters.buff = null;
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
		var b = event.detail.buff;
		if (b == 'null') {
			b = null;
		}
		filters.server = s;
		filters.buff = b;
		updateURL();
	}

	function updateURL() {
		var urlRef = '/run/dfa/party';
		if (filters.trigger != null && (filters.trigger == 1 || filters.trigger == 0)) {
			urlRef += '?trigger=' + filters.trigger;
		} else {
			urlRef += '?trigger=0';
			filters.trigger = '0';
			//console.log(filters.trigger)
		}

		if (filters.buff != null && allowedBuffs.includes(filters.buff)) {
			urlRef += '&buff=' + filters.buff;
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
				<span class="label-text text-base font-semibold">Type</span>
			</label>
			<select
				bind:value={filters.trigger}
				on:change={() => updateURL()}
				id="drop-region"
				class="select-bordered select rounded"
			>
				<option value="0">Urgent Quest</option>
				<option value="1">Trigger</option>
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

		{#if filters.buff && allowedBuffs.includes(filters.buff)}
			<span class="badge badge-lg rounded border border-neutral-content/25 py-4">
				<img class="mr-1 inline" src={buffIcon[filters.buff]} alt={buffName[filters.buff]} />
				Support: {buffName[filters.buff]}
				<button class="btn-square btn-xs btn ml-1 rounded" on:click={() => clearFilter('buff')}>
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
