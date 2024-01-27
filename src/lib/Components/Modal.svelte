<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Divider from './Divider.svelte';
	const dispatch = createEventDispatcher();

	export let modalId: string;
	export let title: string;
	export let btn1: string | undefined = undefined;
	export let btn2: string | undefined = undefined;
	export let allowDefocusClose: boolean = true;
	export let size: 'narrow' | 'default' | 'wide' = 'default';

	let dialog: HTMLDialogElement;
	let modalState: boolean = false;

	export const show = () => dialog.showModal();
	export const close = () => dialog.close();

	const btn1Click = (e: Event) => {
		dispatch('btn1Click', e);
	};
	const btn2Click = (e: Event) => {
		dispatch('btn2Click', e);
	};

	$: {
		// Modal closed event
		if (!modalState) dispatch('closed');
	}
</script>

<dialog id={modalId} class="modal" bind:this={dialog}>
	<div
		class="modal-box rounded-md"
		class:max-w-xl={size === 'narrow'}
		class:max-w-3xl={size === 'default'}
		class:max-w-5xl={size === 'wide'}
	>
		<div>
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2" on:click={close}
				>✕</button
			>
		</div>
		<h3 class="text-lg font-bold">{title}</h3>
		<Divider slim />
		<slot />
		<div class="modal-action">
			<div>
				<!-- if there is a button in form, it will close the modal -->
				<slot name="actions" />
				{#if btn2 != undefined}
					<button
						on:click={btn2Click}
						on:keyup={btn2Click}
						class="btn btn-outline btn-secondary rounded md:btn-sm">{btn2}</button
					>
				{/if}
				{#if btn1 != undefined}
					<button
						on:click={btn1Click}
						on:keyup={btn1Click}
						class="btn btn-outline btn-primary rounded md:btn-sm">{btn1}</button
					>
				{/if}
			</div>
		</div>
	</div>
	{#if allowDefocusClose}
		<div class="modal-backdrop">
			<button on:click={close}>close</button>
		</div>
	{/if}
</dialog>
