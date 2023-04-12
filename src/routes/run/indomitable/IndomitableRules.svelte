<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import Modal from '$lib/Components/Modal.svelte';

	let modal: Modal;
</script>

<label
	for="modal-filters"
	class="btn-outline btn-primary btn-sm btn rounded"
	on:click={modal.show}
	on:keyup={modal.show}><i class="bi bi-journal-check mr-2" />Rules</label
>
<Modal
	bind:this={modal}
	modalId="indomitable-rules"
	title="Rules"
	btn2="Close"
	on:btn2Click={modal.close}
>
	<Divider class="-mx-6" />
	<ul class="list-inside list-disc space-y-2">
		<li><strong>Do not abuse bugs or exploits.</strong></li>
	</ul>
</Modal>
