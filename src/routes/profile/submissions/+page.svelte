<script lang="ts">
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import LeaderboardTitle from '$lib/Components/LeaderboardTitle.svelte';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import type { Run } from '$lib/types/api/runs/run';
	import type { SubmissionSearchFilter } from '$lib/types/api/validation/submissionSearchFilter';
	import { copyQueryParams } from '$lib/utils/queryParams';
	import { RunSortOption } from '$lib/types/api/runs/sortOptions';
	import { playerInfoStore } from '$lib/stores/userLogin';
	import PlayerSubmissionsTable from '$lib/Components/Tables/PlayerSubmissionsTable.svelte';

	let runCount = -1;

	const fetchRuns = async (): Promise<Run<unknown>[]> => {
		await playerInfoStore.refreshInfo();
		const filter: SubmissionSearchFilter = {
			sort: RunSortOption.Recent,
			page: 0,
			submitterId: $playerInfoStore?.playerId,
		};

		try {
			const submittedRuns = await fetchGetApi<Run<unknown>[]>(
				`/ngs-api/runs/submissions`,
				copyQueryParams(filter)
			);
			const sortedRuns = submittedRuns.sort((a, b) =>
				new Date(a.submissionDate) > new Date(b.submissionDate) ? -1 : 1
			);

			runCount = sortedRuns.length;

			return sortedRuns;
		} catch (err) {
			console.error(err);
		}
		return [];
	};
	$: submissionPromise = fetchRuns();
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | My Runs</title>
</svelte:head>
<LeaderboardTitle category="My Runs" />

<div class="flex grow content-center">
	<div class="container m-8 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div class="m-0 grow space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8 md:m-2">
			{#await submissionPromise}
				<LoadingBar />
			{:then runs}
				<PlayerSubmissionsTable submissions={runs ?? []} />
			{:catch err}
				<p>An error has occured, please try again later</p>
			{/await}
		</div>
	</div>
</div>
