<script lang="ts">
	import { t } from 'svelte-i18n';
	import ModeratorSubmissionsTable from '$lib/components/Tables/ModeratorSubmissionsTable.svelte';
	import LoadingBar from '$lib/components/LoadingBar.svelte';
	import { fetchGetApi } from '$lib/utils/fetch';
	import type { Run } from '$lib/types/api/runs/run';
	import LeaderboardTitle from '$lib/components/LeaderboardTitle.svelte';
	import Button from '$lib/components/Button.svelte';
	import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';
	import type { SubmissionSearchFilter } from '$lib/types/api/validation/submissionSearchFilter';
	import { copyQueryParams } from '$lib/utils/queryParams';
	import { RunSortOption } from '$lib/types/api/runs/sortOptions';

	const HistoryCount = 50;

	let unapprovedCount = $state(-1);
	let showUnapproved = $state(true);

	const fetchRuns = async (): Promise<Run<unknown>[]> => {
		const filter: SubmissionSearchFilter = {
			status: showUnapproved ? RunSubmissionStatus.AwaitingApproval : undefined,
			take: HistoryCount,
			sort: RunSortOption.Recent,
			page: 0
		};

		try {
			const submittedRuns = await fetchGetApi<Run<unknown>[]>(
				`/ngs-api/runs/submissions`,
				copyQueryParams(filter)
			);
			const sortedRuns = submittedRuns.sort((a, b) =>
				new Date(a.submissionDate) > new Date(b.submissionDate) ? -1 : 1
			);

			if (showUnapproved) {
				unapprovedCount = sortedRuns.length;
			}

			return sortedRuns;
		} catch (err) {
			console.error(err);
		}
		return [];
	};
	let submissionPromise = $derived(fetchRuns());

	const refreshRuns = () => {
		submissionPromise = fetchRuns();
	};

	const changeTab = (unapproved: boolean) => {
		showUnapproved = unapproved;
		refreshRuns();
	};
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Moderation - Submission Queue</title>
</svelte:head>
<LeaderboardTitle category="Submissions" />

<div class="flex grow content-center">
	<div class="container m-8 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div class="m-0 grow space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8 md:m-2">
			<div class="join mb-4">
				<Button
					class="join-item"
					modifier={showUnapproved ? 'primary' : 'default'}
					on:click={() => changeTab(true)}
				>
					📩 {unapprovedCount < 0 ? '-' : unapprovedCount} Unapproved
				</Button>
				<Button
					class="join-item"
					modifier={!showUnapproved ? 'primary' : 'default'}
					on:click={() => changeTab(false)}
				>
					🧾 Recent
				</Button>
			</div>
			{#await submissionPromise}
				<LoadingBar />
			{:then runs}
				<ModeratorSubmissionsTable submissions={runs ?? []} on:submissionChanged={refreshRuns} />
			{:catch err}
				<p>An error has occurred, please try again later</p>
			{/await}
		</div>
	</div>
</div>
