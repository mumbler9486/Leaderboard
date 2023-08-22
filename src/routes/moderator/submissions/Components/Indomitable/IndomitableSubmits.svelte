<script lang="ts">
	import IndomitableSubmitRow from './IndomitableSubmitRow.svelte';
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import type { DuelRun } from '$lib/types/api/runs/run';
	import { fetchGetApi } from '$lib/utils/fetch';
	import SubmissionInfoModal2 from '$lib/Components/SubmissionInfoModal.svelte';

	let submissions: DuelRun[] = [];
	let loading = true;

	let submissionModal: SubmissionInfoModal2;

	$: reloadData();

	async function reloadData() {
		loading = true;

		try {
			const submittedRuns = await fetchGetApi<DuelRun[]>(`/ngs-api/submissions/duels`);
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
				<th class="bg-neutral text-neutral-content">Player</th>
				<th class="bg-neutral text-center text-neutral-content">Class</th>
				<th class="bg-neutral text-center text-neutral-content">Boss</th>
				<th class="bg-neutral text-center text-neutral-content">Rank</th>
				<th class="bg-neutral text-center text-neutral-content">Patch</th>
				<th class="bg-neutral text-center text-neutral-content">Defi-Series Augments</th>
				<th class="bg-neutral text-center text-neutral-content">Weapon(s)</th>
				<th class="bg-neutral text-center text-neutral-content">
					IGT <InfoTooltip below tip={'In-Game Time'} />
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
					<IndomitableSubmitRow on:openRunInfo={runInfoOpen} {submission} />
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
