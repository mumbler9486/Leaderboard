<script>
	import SoloPurpleFull from './PartyPurpleFull.svelte';
	import PurplesoloModalRuninfo from './SubmitModal.svelte';

	import { onMount } from 'svelte';

	var dataStorage = [];
	var loading = 1;

	let runInfoModal;

	onMount(async () => {
		reloadData();
	});

	async function reloadData() {
		dataStorage = [];
		loading = 1;
		const response = await fetch('/ngs-api/GetSubmissionsPurpleSolo?type=purpleparty', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		dataStorage = await response.json();
		loading = 0;
		//console.log(dataStorage)
	}

	function runInfoOpen(event) {
		runInfoModal.openRunInfo(event.detail.Data);
	}
</script>

<div class="-mx-6 overflow-x-auto overflow-y-hidden md:mx-0">
	<table class="table-zebra table-compact table w-full">
		<thead>
			<tr>
				<th class="bg-neutral text-neutral-content">Players</th>
				<th class="bg-neutral text-center text-neutral-content">Region</th>
				<th class="bg-neutral text-center text-neutral-content">Rank</th>
				<th class="bg-neutral text-center text-neutral-content">Patch</th>
				<th class="bg-neutral text-center text-neutral-content">Main Classes</th>
				<th class="bg-neutral text-center text-neutral-content">Sub-Classes</th>
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
		{#if loading == 0}
			<tbody>
				{#each dataStorage as data}
					<SoloPurpleFull on:openRunInfo={runInfoOpen} {data} />
				{/each}
			</tbody>
		{/if}
	</table>
</div>
{#if loading == 0 && !dataStorage[0]}
	<span class="flex justify-center">There are no runs in the selected queue.</span>
{/if}
{#if loading == 1}
	<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
		Loading - Please Wait...<br /><progress
			class="progress progress-primary w-56 border border-neutral-content/20"
		/>
	</div>
{/if}

<PurplesoloModalRuninfo on:refreshData={reloadData} bind:this={runInfoModal} />
