<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import ClassFilter from '$lib/Components/Filters/ClassFilter.svelte';
	import ServerFilter from '$lib/Components/Filters/ServerFilter.svelte';
	import Modal from '$lib/Components/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	const dispatch = createEventDispatcher();

	export let selectedClass: string = 'No Filter';
	export let selectedServer: string = 'No Filter';

	let modal: Modal;

	const resetFilters = () => {
		selectedClass = 'No Filter';
		selectedServer = 'No Filter';
	};

	const applyFilters = () => {
		dispatch('applyFilters', { selectedClass: selectedClass, selectedServer: selectedServer });
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
	<span
		class="text-base-100-content mb-2 flex flex-row justify-center font-semibold md:justify-start"
		>Main Class</span
	>
	<ClassFilter bind:selectedClass />
	<Divider />
	<span
		class="text-base-100-content mb-2 flex flex-row justify-center font-semibold md:justify-start"
		>Server</span
	>
	<ServerFilter bind:selectedServer />
</Modal>
