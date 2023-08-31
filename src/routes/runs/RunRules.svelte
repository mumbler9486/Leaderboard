<script lang="ts">
	import Modal from '$lib/Components/Modal.svelte';

	export let rules: string[] = [];

	let modal: Modal;
</script>

<button
	class="btn btn-primary btn-outline btn-sm rounded"
	on:click={modal.show}
	on:keyup={modal.show}><i class="bi bi-journal-check mr-2" />Rules</button
>
<Modal
	bind:this={modal}
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
