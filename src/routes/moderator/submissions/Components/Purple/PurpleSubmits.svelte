<script lang="ts">
	import PurplePartySubmitRow from './PurpleSubmitRow.svelte';

	import type { Submission } from '$lib/types/api/submissions/submissions';
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import { RunCategories } from '$lib/types/api/categories';
	import { fetchGetApi } from '$lib/utils/fetch';
	import type { Run } from '$lib/types/api/runs/run';
	import SubmissionInfoModal2 from '$lib/Components/SubmissionInfoModal2.svelte';

	export let category: RunCategories;

	let submissions: Run[] = [];
	let loading = true;

	let submissionModal: SubmissionInfoModal2;

	const categoryPathMap: { [key: string]: string } = {
		[RunCategories.PurpleDuo]: RunCategories.PurpleDuo,
		[RunCategories.PurpleParty]: RunCategories.PurpleParty
	};

	$: reloadData(category);

	async function reloadData(...watch: any[]) {
		const categoryPath = categoryPathMap[category];
		if (!categoryPath) console.error('Unknown purple category');

		loading = true;

		try {
			const submittedRuns = await fetchGetApi<Run[]>(`/ngs-api/submissions/purples`);
			submissions = submittedRuns.sort((a, b) =>
				new Date(a.submissionDate) > new Date(b.submissionDate) ? 1 : -1
			);
			return submittedRuns;
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}

	const runInfoOpen = (e: CustomEvent) => {
		const runId = e.detail as number;
		const run = submissions.find((r) => r.runId == runId);
		if (!run) {
			console.error(`RunId=${runId} does not exist.`);
			return;
		}

		submissionModal.showModal(run);
	};
</script>

<div class="-mx-6 overflow-x-auto overflow-y-hidden md:mx-0">
	<table class="table-zebra table-compact table w-full">
		<thead>
			<tr>
				<th class="bg-neutral text-neutral-content">Players</th>
				<th class="bg-neutral text-center text-neutral-content">Party</th>
				<th class="bg-neutral text-center text-neutral-content">Class</th>
				<th class="bg-neutral text-center text-neutral-content">Weapons</th>
				<th class="bg-neutral text-center text-neutral-content">Region</th>
				<th class="bg-neutral text-center text-neutral-content">Rank</th>
				<th class="bg-neutral text-center text-neutral-content">Patch</th>
				<th class="bg-neutral text-center text-neutral-content">
					IGT <InfoTooltip tip="In-Game Time" below />
				</th>
				<th class="bg-neutral text-center text-neutral-content">Submitted By</th>
				<th class="bg-neutral text-center text-neutral-content">Submission Time</th>
				<th class="w-2 bg-neutral text-center text-neutral-content" />
				<!-- NOTE ICON -->
			</tr>
		</thead>
		{#if !loading}
			<tbody>
				{#each submissions as submission}
					<PurplePartySubmitRow on:openRunInfo={runInfoOpen} {submission} />
				{/each}
			</tbody>
		{/if}
	</table>
</div>
{#if !loading && !submissions[0]}
	<span class="flex justify-center">There are no runs in the selected queue.</span>
{/if}
{#if loading}
	<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
		Loading - Please Wait...<br /><progress
			class="progress progress-primary w-56 border border-neutral-content/20"
		/>
	</div>
{/if}

<SubmissionInfoModal2 bind:this={submissionModal} on:submissionChanged={reloadData} />
