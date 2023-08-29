<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import ClassFilter from '$lib/Components/Filters/ClassFilter.svelte';
	import ServerFilter from '$lib/Components/Filters/ServerFilter.svelte';
	import Modal from '$lib/Components/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	import DfAegisSupportFilter from './dfaegis/DfAegisSupportFilter.svelte';
	const dispatch = createEventDispatcher();

	export let classFilter: boolean = false;
	export let dfAegisSupportFilter: boolean = false;

	export let server: string = 'no_filter';
	export let support: string = 'no_filter';
	export let mainClass: string = 'no_filter';
	export let dfAegisSupport: string = 'no_filter';

	let modal: Modal;

	const resetFilters = () => {
		server = 'no_filter';
		support = 'no_filter';
		mainClass = 'no_filter';
		dfAegisSupport = 'no_filter';
	};

	const applyFilters = () => {
		dispatch('applyFilters', {
			server: server,
			support: support,
			mainClass: mainClass,
			dfAegisSupport: dfAegisSupport
		});
		modal.close();
	};
</script>

<button
	class="btn btn-primary btn-outline btn-sm rounded"
	on:click={modal.show}
	on:keyup={modal.show}
>
	<i class="bi bi-funnel mr-2" />Filters
</button>
<Modal
	modalId="run-filters"
	title="Filters"
	btn1="Apply Filters"
	btn2="Reset Filters"
	bind:this={modal}
	on:btn1Click={applyFilters}
	on:btn2Click={resetFilters}
>
	{#if classFilter}
		<span
			class="text-base-100-content mb-2 flex flex-row justify-center font-semibold md:justify-start"
			>Main Class</span
		>
		<ClassFilter bind:selectedClass={mainClass} />
		<Divider />
	{/if}

	<span
		class="text-base-100-content mb-2 flex flex-row justify-center font-semibold md:justify-start"
		>Server</span
	>
	<ServerFilter bind:selectedServer={server} />
	<Divider />

	{#if dfAegisSupportFilter}
		<span
			class="text-base-100-content mb-2 flex flex-row justify-center font-semibold md:justify-start"
			>Support</span
		>
		<DfAegisSupportFilter bind:selectedSupport={dfAegisSupport} />
		<Divider />
	{/if}
</Modal>
