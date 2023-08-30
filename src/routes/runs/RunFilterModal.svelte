<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import ClassFilter from '$lib/Components/Filters/ClassFilter.svelte';
	import ServerFilter from '$lib/Components/Filters/ServerFilter.svelte';
	import Modal from '$lib/Components/Modal.svelte';
	import { t } from 'svelte-i18n';
	import DfAegisSupportFilter from './dfaegis/DfAegisSupportFilter.svelte';
	import { runFilters } from './runFilter';

	export let classFilter: boolean = false;
	export let dfAegisSupportFilter: boolean = false;

	let server: string = 'no_filter';
	let support: string = 'no_filter';
	let mainClass: string = 'no_filter';
	let dfAegisSupport: string = 'no_filter';

	let modal: Modal;

	export const resetFilters = () => {
		server = 'no_filter';
		support = 'no_filter';
		mainClass = 'no_filter';
		dfAegisSupport = 'no_filter';
	};

	const applyFilters = () => {
		runFilters.update((f) => {
			f.server = server;
			f.support = support;
			f.class = mainClass;
			f.support = dfAegisSupport;
			return f;
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
