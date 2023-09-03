<script lang="ts">
	import { mapPartyMemberToNamePref, mapPlayerInfoNamePref } from '$lib/types/api/mapNamePref';
	import type { Run } from '$lib/types/api/runs/run';
	import { createEventDispatcher } from 'svelte';
	import Button from '../Button.svelte';
	import NgsClassIcon from '../NgsClassIcon.svelte';
	import PlayerNameBadge from '../PlayerNameBadge.svelte';
	import RunApprovalStatus from '../RunApprovalStatus.svelte';
	import SubmissionInfoModal from '../SubmissionInfoModal.svelte';
	import TimeDisplay from '../TimeDisplay.svelte';
	import WeaponIcon from '../WeaponIcon.svelte';
	import Table, { type TableHeader } from './Table.svelte';
	import RunDetailsCell from './RunDetailsCell.svelte';
	import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';

	export let submissions: Run<unknown>[];

	let modal: SubmissionInfoModal;

	const dispatcher = createEventDispatcher();

	$: headerDef = [
		{ label: 'Id', textAlign: 'center', class: 'w-4' },
		{ label: 'Quest', textAlign: 'center' },
		{ label: 'Category', textAlign: 'center' },
		{ label: 'Details', textAlign: 'default' },
		{ label: 'Players', textAlign: 'default' },
		{ label: 'Class', textAlign: 'center' },
		{ label: 'Party', textAlign: 'center' },
		{ label: 'Weapons', textAlign: 'center' },
		{ label: 'Patch', textAlign: 'center' },
		{ label: 'IGT', textAlign: 'center', tooltip: 'In-Game Time' },
		{ label: 'Submitted By', textAlign: 'center' },
		{ label: 'Submission Date', textAlign: 'center' },
		{ label: 'Status', textAlign: 'center' },
		{ label: '📝', textAlign: 'center', class: 'w-2 text-lg' }
	] satisfies (TableHeader | undefined)[];

	const mapPartySizeName = (size: number) => {
		if (size == 1) {
			return 'Solo';
		}
		if (size == 2) {
			return 'Duo';
		}
		if (size > 2) {
			return 'Party';
		}
		return 'Invalid';
	};

	const runInfoOpen = (runId: number) => {
		const run = submissions.find((r) => r.runId == runId);
		if (!run) {
			console.error(`RunId=${runId} does not exist.`);
			return;
		}

		modal.showModal(run);
	};

	const submissionsUpdated = () => {
		dispatcher('submissionChanged');
	};
</script>

{#if submissions.length <= 0}
	<span class="flex justify-center">There are no runs that match the selected filters.</span>
{:else}
	<Table pinRows class="w-full" headers={headerDef}>
		{#each submissions as run}
			<tr class="hover">
				<td class="text-center font-bold">
					{run.runId}
				</td>
				<td class="text-center font-bold">
					{run.quest}
				</td>
				<td class="text-center font-bold">
					{run.category}
				</td>
				<td class="font-bold">
					<RunDetailsCell {run} />
				</td>
				<td>
					{#each run.party as player}
						<PlayerNameBadge
							player={mapPartyMemberToNamePref(player)}
							on:click={() => runInfoOpen(run.runId)}
							on:keyup={() => runInfoOpen(run.runId)}
						/>
					{/each}
				</td>
				<td class="text-center">
					{#each run.party as player}
						<p class="flex">
							<NgsClassIcon showTooltip combatClass={player.mainClass} />
							<NgsClassIcon showTooltip combatClass={player.subClass} />
						</p>
					{/each}
				</td>
				<td class="text-center font-bold">
					{mapPartySizeName(run.party?.length ?? -1)}
				</td>
				<td class="text-center">
					{#if run.party.length === 1}
						{#each run.party[0].weapons as weapon}
							<div class="inline w-[16px] object-none">
								<WeaponIcon {weapon} />
							</div>
						{/each}
					{:else}
						N/A
					{/if}
				</td>
				<td class="text-center">
					{run.patch}
				</td>
				<td class="text-center">
					<TimeDisplay time={run.time} />
				</td>
				<td>
					<PlayerNameBadge
						player={mapPlayerInfoNamePref(run.submitter)}
						on:click={() => runInfoOpen(run.runId)}
						on:keyup={() => runInfoOpen(run.runId)}
					/>
				</td>
				<td class="text-center">
					{new Date(run.submissionDate).toLocaleString()}
				</td>
				<td class="text-center">
					<RunApprovalStatus submissionStatus={run.submissionStatus} />
				</td>
				<td class="text-center">
					{#if run.submissionStatus === RunSubmissionStatus.AwaitingApproval}
						<Button primary on:click={() => runInfoOpen(run.runId)}>Review</Button>
					{/if}
				</td>
			</tr>
		{/each}
	</Table>
{/if}
<SubmissionInfoModal bind:this={modal} on:submissionChanged={submissionsUpdated} />
