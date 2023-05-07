<script lang="ts">
	import SubmissionInfoModal from '$lib/Components/SubmissionInfoModal.svelte';
	import PurplePartySubmitRow from './PurplePartySubmitRow.svelte';

	import type { PurpleSubmission, Submission } from '$lib/types/api/submissions/submissions';
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import { RunCategories } from '$lib/types/api/categories';

	export let category: string;

	let submissions: PurpleSubmission[] = [];
	let loading = true;

	let submissionModal: SubmissionInfoModal;
	let viewSubmission: Submission;

	const categoryPathMap: { [key: string]: string } = {
		[RunCategories.PurpleDuo.toLowerCase()]: RunCategories.PurpleDuo,
		[RunCategories.PurpleParty.toLowerCase()]: RunCategories.PurpleParty
	};

	$: reloadData(category);

	async function reloadData(...watch: any[]) {
		const categoryPath = categoryPathMap[category.toLowerCase()];
		if (!categoryPath) console.error('Unknown purple category');

		loading = true;

		try {
			const response = await fetch(`/ngs-api/submissions/${categoryPath}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			submissions = (await response.json()) as PurpleSubmission[];
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

		viewSubmission = run;
		submissionModal.showModal();
	};
</script>

<div class="-mx-6 overflow-x-auto overflow-y-hidden md:mx-0">
	<table class="table-zebra table-compact table w-full">
		<thead>
			<tr>
				<th class="bg-neutral text-neutral-content">Players</th>
				<th class="bg-neutral text-center text-neutral-content">Class</th>
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

<SubmissionInfoModal bind:this={submissionModal} submission={viewSubmission} />
