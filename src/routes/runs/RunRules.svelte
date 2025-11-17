<script lang="ts">
	import Modal from '$lib/Components/Modal.svelte';
	import { ListBullet } from 'svelte-heros-v2';

	interface Props {
		rules?: string[];
		children?: import('svelte').Snippet;
	}

	let { rules = [], children }: Props = $props();

	let modal: Modal = $state();
</script>

<button
	class="btn btn-outline btn-primary btn-sm rounded"
	onclick={modal.show}
	onkeyup={modal.show}><ListBullet />Rules</button
>
<Modal
	bind:this={modal}
	size="narrow"
	modalId="indomitable-rules"
	title="Rules"
	btn2="Close"
	on:btn2Click={modal.close}
>
	{@render children?.()}
	{#each rules as rule}
		<ul class="list-inside list-disc space-y-2">
			<li>{rule}</li>
		</ul>
	{/each}
</Modal>
