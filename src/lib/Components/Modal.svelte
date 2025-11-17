<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';
	import Divider from './Divider.svelte';
	const dispatch = createEventDispatcher();

	interface Props {
		modalId: string;
		title: string;
		btn1?: string | undefined;
		btn2?: string | undefined;
		allowDefocusClose?: boolean;
		size?: 'narrow' | 'default' | 'wide';
		children?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
	}

	let {
		modalId,
		title,
		btn1 = undefined,
		btn2 = undefined,
		allowDefocusClose = true,
		size = 'default',
		children,
		actions
	}: Props = $props();

	let dialog: HTMLDialogElement = $state();
	let modalState: boolean = false;

	export const show = () => dialog.showModal();
	export const close = () => dialog.close();

	const btn1Click = (e: Event) => {
		dispatch('btn1Click', e);
	};
	const btn2Click = (e: Event) => {
		dispatch('btn2Click', e);
	};

	run(() => {
		// Modal closed event
		if (!modalState) dispatch('closed');
	});
</script>

<dialog id={modalId} class="modal" bind:this={dialog}>
	<div
		class="modal-box rounded-md"
		class:max-w-xl={size === 'narrow'}
		class:max-w-3xl={size === 'default'}
		class:max-w-5xl={size === 'wide'}
	>
		<div>
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2" onclick={close}
				>✕</button
			>
		</div>
		<h3 class="text-lg font-bold">{title}</h3>
		<Divider slim />
		{@render children?.()}
		<div class="modal-action">
			<div>
				<!-- if there is a button in form, it will close the modal -->
				{@render actions?.()}
				{#if btn2 != undefined}
					<button
						onclick={btn2Click}
						onkeyup={btn2Click}
						class="btn btn-outline btn-secondary rounded md:btn-sm">{btn2}</button
					>
				{/if}
				{#if btn1 != undefined}
					<button
						onclick={btn1Click}
						onkeyup={btn1Click}
						class="btn btn-outline btn-primary rounded md:btn-sm">{btn1}</button
					>
				{/if}
			</div>
		</div>
	</div>
	{#if allowDefocusClose}
		<div class="modal-backdrop">
			<button onclick={close}>close</button>
		</div>
	{/if}
</dialog>
