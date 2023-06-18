<script lang="ts">
	import SubmissionInfoModal from '$lib/Components/SubmissionInfoModal.svelte';
	import type { IndomitableSubmission } from '$lib/types/api/submissions/submissions';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import IndomitableSubmitRow from './IndomitableSubmitRow.svelte';

	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import { RunCategories } from '$lib/types/api/categories';

	export let category: RunCategories;

	let submissions: IndomitableSubmission[] = [];
	let loading = true;

	let submissionModal: SubmissionInfoModal;
	let viewSubmission: IndomitableSubmission;

	const categoryPathMap: { [key: string]: string } = {
		[RunCategories.IndomitableNexAelio]: RunCategories.IndomitableNexAelio,
		[RunCategories.IndomitableRenusRetem]: RunCategories.IndomitableRenusRetem,
		[RunCategories.IndomitableAmsKvaris]: RunCategories.IndomitableAmsKvaris,
		[RunCategories.IndomitableNilsStia]: RunCategories.IndomitableNilsStia,
		[RunCategories.IndomitableHalvaldi]: RunCategories.IndomitableHalvaldi
	};

	$: reloadData(category);

	async function reloadData(...watch: any[]) {
		const categoryPath = categoryPathMap[category];
		if (!categoryPath) console.error('Unknown indomitable boss category');

		loading = true;

		try {
			const response = await fetch(`/ngs-api/submissions/${category}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			submissions = (await response.json()) as IndomitableSubmission[];
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
	<table class="table-compact table-zebra table w-full">
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
					<IndomitableSubmitRow
						on:openRunInfo={runInfoOpen}
						{submission}
						nameDisplay={mapToNamePref(submission.players[0])}
					/>
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
			class="progress-primary progress w-56 border border-neutral-content/20"
		/>
	</div>
{/if}

<SubmissionInfoModal
	bind:this={submissionModal}
	submission={viewSubmission}
	on:submissionChanged={reloadData}
/>
