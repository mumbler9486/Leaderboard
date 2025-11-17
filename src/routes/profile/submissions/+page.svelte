<script lang="ts">
	import { run } from 'svelte/legacy';

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
	import Button from '$lib/Components/Button.svelte';
	import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';
	import DiscordContact from '$lib/Components/DiscordContact.svelte';

	let submissionCount = $state(-1);
	let runCount = $state(-1);
	let showSubmissions = $state(true);

	const fetchRuns = (): Promise<Run<unknown>[]> => {
		if (showSubmissions) {
			return fetchSubmissions();
		}

		return fetchParticipatingRuns();
	};

	const fetchSubmissions = async (): Promise<Run<unknown>[]> => {
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

			submissionCount = sortedRuns.length;

			return sortedRuns;
		} catch (err) {
			console.error(err);
		}
		return [];
	};

	const fetchParticipatingRuns = async (): Promise<Run<unknown>[]> => {
		await playerInfoStore.refreshInfo();
		const filter: RunsSearchFilter = {
			sort: RunSortOption.Recent,
			page: 0,
			userId: $playerInfoStore?.playerId,
		};

		try {
			const submittedRuns = await fetchGetApi<Run<unknown>[]>(
				`/ngs-api/runs`,
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

	let submissionPromise;
	run(() => {
		submissionPromise = fetchRuns();
	});

	const refreshRuns = () => {
		submissionPromise = fetchRuns();
	};

	const changeTab = (submissions: boolean) => {
		showSubmissions = submissions;
		refreshRuns();
	};
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | My Runs</title>
</svelte:head>
<LeaderboardTitle category="My Runs" />

<div class="flex grow content-center">
	<div class="container m-8 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div class="m-0 grow space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8 md:m-2">
			<div class="join mb-4">
				<Button
					size="sm"
					class="join-item"
					modifier={showSubmissions ? 'primary' : 'default'}
					on:click={() => changeTab(true)}
				>
					📩 {submissionCount < 0 ? '-' : submissionCount} Submissions
				</Button>
				<Button
					size="sm"
					class="join-item"
					modifier={!showSubmissions ? 'primary' : 'default'}
					on:click={() => changeTab(false)}
				>
					👥 {runCount < 0 ? '-' : runCount} Participated Runs
				</Button>
			</div>
			<p>
				If there are issues with your runs, please contact us on <DiscordContact />.
			</p>
			{#await submissionPromise}
				<LoadingBar />
			{:then runs}
				<PlayerSubmissionsTable submissions={runs ?? []} />
			{:catch err}
				<p>An error has occurred, please try again later</p>
			{/await}
		</div>
	</div>
</div>
