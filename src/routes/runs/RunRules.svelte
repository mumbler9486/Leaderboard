<script lang="ts">
	import Modal from '$lib/Components/Modal.svelte';
	import { ListBullet } from 'svelte-heros-v2';

	export let rules: string[] = [];

	let modal: Modal;
</script>

<button
	class="btn btn-outline btn-primary btn-sm rounded"
	on:click={modal.show}
	on:keyup={modal.show}><ListBullet />Rules</button
>
<Modal
	bind:this={modal}
	size="narrow"
	modalId="indomitable-rules"
	title="Rules"
	btn2="Close"
	on:btn2Click={modal.close}
>
	<slot />
	{#each rules as rule}
		<ul class="list-inside list-disc space-y-2">
			<li>{rule}</li>
		</ul>
	{/each}
</Modal>
