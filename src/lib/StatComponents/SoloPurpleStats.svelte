<script lang="ts">
	import { onMount } from 'svelte';
	let RunCount: string = '...';

	onMount(async () => {
		const response = await fetch('/ngs-api/CountSolos', {
			method: 'GET'
		});

		RunCount = await response.json();
	});
</script>

<div
	class="stats mb-4 flex rounded-md border border-secondary bg-neutral text-neutral-content shadow"
>
	<div class="stat">
		<div class="stat-figure text-neutral-content">
			<i class="bi bi-card-list text-4xl" />
		</div>
		<div class="stat-title">Total Solo Runs</div>
		<div class="stat-value text-neutral-content">{RunCount}</div>
	</div>
</div>
