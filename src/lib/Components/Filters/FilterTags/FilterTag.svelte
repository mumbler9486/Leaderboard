<script lang="ts">
	export let icon: string | undefined = undefined;
	export let label: string;
</script>

<span class="badge badge-lg rounded border border-neutral-content/25 py-4">
	<img src={icon} alt={label} class="mr-1" />
	{label}
	<button class="btn-square btn-xs btn ml-1 rounded" on:click>
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
	</button>
</span>
