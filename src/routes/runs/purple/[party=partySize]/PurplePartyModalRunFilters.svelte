<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import ClassFilter from '$lib/Components/Filters/ClassFilter.svelte';
	import ServerFilter from '$lib/Components/Filters/ServerFilter.svelte';
	import Modal from '$lib/Components/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	const dispatch = createEventDispatcher();

	export let solo: boolean;
	export let server: string = 'no_filter';
	export let mainClass: string = 'no_filter';

	let modal: Modal;

	const resetFilters = () => {
		server = 'no_filter';
	};

	const applyFilters = () => {
		dispatch('applyFilters', {
			server: server,
			mainClass: mainClass
		});
		modal.close();
	};
</script>

<label
	for="modal-filters"
	class="btn-outline btn-primary btn-sm btn rounded"
	on:click={modal.show}
	on:keyup={modal.show}><i class="bi bi-funnel mr-2" />Filters</label
>
<Modal
	modalId="run-filters"
	title="Filters"
	btn1="Apply Filters"
	btn2="Reset Filters"
	bind:this={modal}
	on:btn1Click={applyFilters}
	on:btn2Click={resetFilters}
>
	{#if solo}
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
</Modal>
