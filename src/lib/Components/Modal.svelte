<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let modalId: string;
	export let title: string;
	export let btn1: string | undefined = undefined;
	export let btn2: string | undefined = undefined;
	export let allowDefocusClose: boolean = true;

	let modalState: boolean = false;

	export const show = () => (modalState = true);
	export const close = () => (modalState = false);

	const btn1Click = (e: Event) => {
		dispatch('btn1Click', e);
	};
	const btn2Click = (e: Event) => {
		dispatch('btn2Click', e);
	};

	const defocusCloseHandler = () => {
		if (!allowDefocusClose) return;
		close();
	};
</script>

<input type="checkbox" id={modalId} bind:checked={modalState} class="modal-toggle" />
<div
	class="modal"
	class:cursor-pointer={allowDefocusClose}
	on:click={defocusCloseHandler}
	on:keydown|stopPropagation
>
	<div
		class="modal-box relative max-w-4xl cursor-default rounded"
		on:click|stopPropagation
		on:keydown|stopPropagation
	>
		<div class="flex flex-row">
			<span class="flex-1 self-center text-3xl font-light md:text-4xl">{title}</span>
			<label
				for={modalId}
				class="btn-outline btn-secondary btn-square btn-sm btn flex-initial self-center rounded"
			>
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
			</label>
		</div>

		<div>
			<slot />
		</div>

		<Divider class="-mx-6" />

		<div class="modal-action justify-center md:justify-end">
			{#if btn2 != undefined}
				<button
					on:click={btn2Click}
					on:keyup={btn2Click}
					class="btn-outline btn-secondary btn rounded md:btn-sm">{btn2}</button
				>
			{/if}
			{#if btn1 != undefined}
				<button
					on:click={btn1Click}
					on:keyup={btn1Click}
					class="btn-outline btn-primary btn rounded md:btn-sm">{btn1}</button
				>
			{/if}
		</div>
	</div>
</div>
