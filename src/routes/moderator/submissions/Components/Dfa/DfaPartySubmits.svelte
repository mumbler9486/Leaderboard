<script lang="ts">
	import DfaPartySubmitRow from './DfaPartySubmitRow.svelte';
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import { RunCategories } from '$lib/types/api/categories';
	import type { DfAegisRun } from '$lib/types/api/runs/run';
	import { fetchGetApi } from '$lib/utils/fetch';
	import SubmissionInfoModal2 from '$lib/Components/SubmissionInfoModal2.svelte';

	export let category: RunCategories;

	let submissions: DfAegisRun[] = [];
	let loading = true;

	let submissionModal: SubmissionInfoModal2;

	const categoryPathMap: { [key: string]: string } = {
		[RunCategories.DfaDuo]: RunCategories.DfaDuo,
		[RunCategories.DfaParty]: RunCategories.DfaParty
	};

	$: reloadData(category);

	async function reloadData(...watch: any[]) {
		const categoryPath = categoryPathMap[category];
		if (!categoryPath) console.error('Unknown DF Aegis category');

		loading = true;

		try {
			const submittedRuns = await fetchGetApi<DfAegisRun[]>(`/ngs-api/submissions/dfaegis`);
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
				<th class="bg-neutral text-center text-neutral-content">Class</th>
				<th class="bg-neutral text-center text-neutral-content">Quest</th>
				<th class="bg-neutral text-center text-neutral-content">Rank</th>
				<th class="bg-neutral text-center text-neutral-content">Support</th>
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
					<DfaPartySubmitRow on:openRunInfo={runInfoOpen} {submission} />
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
