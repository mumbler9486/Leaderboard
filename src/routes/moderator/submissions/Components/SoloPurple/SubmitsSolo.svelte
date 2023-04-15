<script lang="ts">
	import RunInformationModal from '$lib/Components/RunInformationModal.svelte';
	import type { PurpleSubmission } from '$lib/types/api/submissions/submissions';
	import RowSubmitsSolo from './RowSubmitsSolo.svelte';

	import { onMount } from 'svelte';

	let submissions: PurpleSubmission[] = [];
	let loading = true;

	let submissionModal: RunInformationModal;

	onMount(async () => {
		reloadData();
	});

	async function reloadData() {
		loading = true;
		try {
			const response = await fetch('/ngs-api/submissions/purpleSolo', {
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

	const runInfoOpen = () => {
		submissionModal;
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
				<th class="bg-neutral text-center text-neutral-content">Main Class</th>
				<th class="bg-neutral text-center text-neutral-content">Sub-Class</th>
				<th class="bg-neutral text-center text-neutral-content">Weapon(s)</th>
				<th class="bg-neutral text-center text-neutral-content"
					>IGT <div
						class="tooltip tooltip-bottom tooltip-info font-semibold normal-case"
						data-tip="In-Game Time"
					>
						<i class="bi-question-circle ms-2" />
					</div></th
				>
				<th class="bg-neutral text-center text-neutral-content">Submitted By</th>
				<th class="bg-neutral text-center text-neutral-content">Submission Time</th>
				<th class="w-2 bg-neutral text-center text-neutral-content" />
				<!-- NOTE ICON -->
			</tr>
		</thead>
		{#if !loading}
			<tbody>
				{#each submissions as data}
					<RowSubmitsSolo on:openRunInfo={runInfoOpen} submission={data} />
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

<RunInformationModal bind:this={submissionModal} submission={{}} />
