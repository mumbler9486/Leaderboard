<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import ClassFilter from '$lib/Components/Filters/ClassFilter.svelte';
	import ServerFilter from '$lib/Components/Filters/ServerFilter.svelte';
	import Modal from '$lib/Components/Modal.svelte';
	import { t } from 'svelte-i18n';
	import { runFilters } from './runFilter';
	import { Funnel } from 'svelte-heros-v2';
	import { createEventDispatcher } from 'svelte';

	interface Props {
		classFilter?: boolean;
		dfAegisSupportFilter?: boolean;
		additionalFilters?: import('svelte').Snippet;
	}

	let { classFilter = false, dfAegisSupportFilter = false, additionalFilters }: Props = $props();

	const dispatch = createEventDispatcher();

	let server: string = $state('no_filter');
	let support: string = 'no_filter';
	let mainClass: string = $state('no_filter');

	let modal: Modal = $state();

	export const resetFilters = () => {
		server = 'no_filter';
		support = 'no_filter';
		mainClass = 'no_filter';
	};

	const applyFilters = () => {
		runFilters.update((f) => {
			f.server = server;
			f.support = support;
			f.class = mainClass;
			return f;
		});
		modal.close();
		dispatch('applied');
	};

	runFilters.subscribe((f) => {
		server = f.server;
		support = f.support;
		mainClass = f.class;
	});
</script>

<button
	class="btn btn-outline btn-primary btn-sm rounded"
	onclick={modal.show}
	onkeyup={modal.show}
>
	<Funnel />Filters
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

	{@render additionalFilters?.()}
</Modal>
