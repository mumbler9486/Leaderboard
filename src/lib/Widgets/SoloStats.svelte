<script lang="ts">
	import type { SoloCounts } from '$lib/types/api/runs/countSolos';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { InboxStack } from 'svelte-heros-v2';

	const getSoloCount = async () => {
		const response = await fetchGetApi<SoloCounts>('/ngs-api/runs/countSolos');
		return response.soloRuns;
	};
</script>

<div class="stats w-full rounded-md border border-secondary bg-neutral">
	<div class="stat">
		<div class="stat-figure text-primary">
			<InboxStack size="40" />
		</div>
		<div class="stat-title">Total Solo Runs</div>
		<div class="stat-value text-primary">
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
