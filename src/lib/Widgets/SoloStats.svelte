<script lang="ts">
	import type { SoloCounts } from '$lib/types/api/runs/countSolos';
	import { fetchGetApi } from '$lib/utils/fetch';

	const getSoloCount = async () => {
		const response = await fetchGetApi<SoloCounts>('/ngs-api/runs/countSolos');
		return response.dfa + response.indomitables + response.soloRuns;
	};
</script>

<div
	class="stats mb-4 flex rounded-md border border-secondary bg-neutral text-neutral-content shadow"
>
	<div class="stat">
		<div class="stat-figure text-neutral-content">
			<i class="bi bi-card-list text-4xl" />
		</div>
		<div class="stat-title">Total Solo Runs</div>
		<div class="stat-value text-neutral-content">
			{#await getSoloCount()}
				...
			{:then soloCount}
				{soloCount}
			{:catch err}
				Error
			{/await}
		</div>
	</div>
</div>
