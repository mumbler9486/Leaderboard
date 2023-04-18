<script lang="ts">
	import SubmissionInfoModal from '$lib/Components/SubmissionInfoModal.svelte';
	import type { IndomitableSubmission, Submission } from '$lib/types/api/submissions/submissions';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import RowSubmitsSolo from './RowSubmitsSolo.svelte';

	import { onMount } from 'svelte';
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';

	export let boss: string;

	let submissions: IndomitableSubmission[] = [];
	let loading = true;

	let submissionModal: SubmissionInfoModal;
	let viewSubmission: IndomitableSubmission;

	$: reloadData(boss);

	onMount(async () => {
		reloadData();
	});

	async function reloadData(...watch: any[]) {
		loading = true;
		try {
			const response = await fetch(`/ngs-api/submissions/duelindomitable?boss=${boss}`, {
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
	<table class="table-zebra table-compact table w-full">
		<thead>
			<tr>
				<th class="bg-neutral text-neutral-content">Player</th>
				<th class="bg-neutral text-center text-neutral-content">Region</th>
				<th class="bg-neutral text-center text-neutral-content">Rank</th>
				<th class="bg-neutral text-center text-neutral-content">Patch</th>
				<th class="bg-neutral text-center text-neutral-content">Duel Augments</th>
				<th class="bg-neutral text-center text-neutral-content">Main Class</th>
				<th class="bg-neutral text-center text-neutral-content">Sub-Class</th>
				<th class="bg-neutral text-center text-neutral-content">Weapon(s)</th>
				<th class="bg-neutral text-center text-neutral-content">
					IGT
					<InfoTooltip bottom tip={'In-Game Time'} />
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
					<RowSubmitsSolo
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
			class="progress progress-primary w-56 border border-neutral-content/20"
		/>
	</div>
{/if}

<SubmissionInfoModal
	bind:this={submissionModal}
	submission={viewSubmission}
	on:submissionChanged={reloadData}
/>
