<script lang="ts">
	import type { RunStats } from '$lib/types/api/runs/runStats';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { InboxStack, User, UserGroup, Users } from 'svelte-heros-v2';

	const getStats = async () => {
		const response = await fetchGetApi<RunStats>('/ngs-api/runs/stats');
		return response;
	};
</script>

<div class="stats w-full rounded-md bg-neutral">
	{#await getStats()}
		...
	{:then stats}
		<div class="stat">
			<div class="stat-figure text-primary">
				<User size="40" />
			</div>
			<div class="stat-title">Solo Runs</div>
			<div class="stat-value text-primary">{stats.soloCount}</div>
		</div>
		<div class="stat">
			<div class="stat-figure text-primary">
				<Users size="40" />
			</div>
			<div class="stat-title">Duo Runs</div>
			<div class="stat-value text-primary">
				{stats.duoCount}
			</div>
		</div>
		<div class="stat">
			<div class="stat-figure text-primary">
				<UserGroup size="40" />
			</div>
			<div class="stat-title">Party Runs</div>
			<div class="stat-value text-primary">
				{stats.partyCount}
			</div>
		</div>
	{:catch err}
		<div class="stat">
			<div class="stat-value text-primary">Error</div>
		</div>
	{/await}
</div>
