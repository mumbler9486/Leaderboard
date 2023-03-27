<script lang="ts">
	export let modalID: string;
</script>

<input type="checkbox" id={modalID} class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative max-w-4xl rounded">
		<div class="flex flex-row">
			<span class="flex-1 self-center text-3xl font-light md:text-4xl">Rules</span>
			<label
				for={modalID}
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
		<div class="divider -mx-6" />
		<ul class="list-inside list-disc space-y-2">
			<li><strong>Do not abuse bugs or exploits.</strong></li>
			<li>A run must primarily use main class weapons.</li>
		</ul>
		<div class="divider -mx-6" />
		<div class="modal-action">
			<label for={modalID} class="btn-outline btn-secondary btn rounded md:btn-sm">Close</label>
		</div>
	</div>
</div>
