<script lang="ts">
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
	<ul class="list-inside list-disc space-y-2">
		<li>Do not abuse bugs or exploits.</li>
		<li>
			A run is considered to have used a Duel Augment if any duel specific augments (e.g.,
			Defi-series) have been affixed to any equipment used during the run.
		</li>
	</ul>
</Modal>
