<script lang="ts">
	import Button from '../Button.svelte';
	import NgsClassIcon from '../NgsClassIcon.svelte';
	import PlayerNameBadge from '../PlayerNameBadge.svelte';
	import RunApprovalStatus from '../RunApprovalStatus.svelte';
	import SubmissionInfoModal from '../SubmissionInfoModal.svelte';
	import TimeDisplay from '../TimeDisplay.svelte';
	import WeaponIcon from '../WeaponIcon.svelte';
	import RunDetailsCell from './RunDetailsCell.svelte';
	import Table, { type TableHeader } from './Table.svelte';
	import { mapPartyMemberToNamePref, mapPlayerInfoNamePref } from '$lib/types/api/mapNamePref';
	import type { Run } from '$lib/types/api/runs/run';
	import { createEventDispatcher } from 'svelte';
	import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';
	import { t } from 'svelte-i18n';
	import PartySizeLabel from '../PartySizeLabel.svelte';
	import PatchLabel from '../PatchLabel.svelte';

	export let submissions: Run<unknown>[];

	let modal: SubmissionInfoModal;

	const dispatcher = createEventDispatcher();

	$: headerDef = [
		{ label: $t('page.moderator.submissions.header.id'), textAlign: 'center', class: 'w-4' },
		{
			label: $t('page.moderator.submissions.header.serverRegion'),
			textAlign: 'center',
			class: 'w-4 whitespace-pre-wrap',
		},
		{ label: $t('page.moderator.submissions.header.quest'), textAlign: 'center' },
		{ label: $t('page.moderator.submissions.header.category'), textAlign: 'center' },
		{ label: $t('page.moderator.submissions.header.details'), textAlign: 'default' },
		{ label: $t('page.moderator.submissions.header.players'), textAlign: 'default' },
		{ label: $t('page.moderator.submissions.header.class'), textAlign: 'center' },
		{ label: $t('page.moderator.submissions.header.party'), textAlign: 'center' },
		{ label: $t('page.moderator.submissions.header.weapons'), textAlign: 'center' },
		{ label: $t('page.moderator.submissions.header.patch'), textAlign: 'center' },
		{
			label: $t('page.moderator.submissions.header.igt'),
			textAlign: 'center',
			tooltip: $t('page.moderator.submissions.header.igtTooltip'),
		},
		{
			label: $t('page.moderator.submissions.header.submittedBy'),
			textAlign: 'center',
			class: 'whitespace-pre-wrap',
		},
		{
			label: $t('page.moderator.submissions.header.submissionDate'),
			textAlign: 'center',
			class: 'whitespace-pre-wrap',
		},
		{
			label: $t('page.moderator.submissions.header.dateReviewed'),
			textAlign: 'center',
			class: 'whitespace-pre-wrap',
		},
		{ label: $t('page.moderator.submissions.header.status'), textAlign: 'center' },
		{
			label: $t('page.moderator.submissions.header.review'),
			textAlign: 'center',
			class: 'w-2 text-lg',
		},
	] satisfies (TableHeader | undefined)[];

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
	<Table pinRows size="sm" class="w-full" headers={headerDef}>
		{#each submissions as run}
			<tr class="hover">
				<td class="text-center font-bold">
					{run.runId}
				</td>
				<td class="text-center text-xs font-bold">
					{$t(`common.serverRegion.${run.serverRegion}`)}
				</td>
				<td class="text-center font-bold">
					{$t(`ngs.quests.${run.quest}`)}
				</td>
				<td class="break-all text-center font-bold">
					{$t(`ngs.categories.${run.category}`)}
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
					<PartySizeLabel size={run.party?.length} />
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
					<PatchLabel code={run.patch} />
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
				<td class="w-6 whitespace-pre-wrap text-center">
					{new Date(run.submissionDate).toLocaleString().replace(',', ',\n')}
				</td>
				<td class="w-6 whitespace-pre-wrap text-center">
					{#if !!run.dateReviewed}
						{new Date(run.dateReviewed).toLocaleString().replace(',', ',\n')}
						<br />
						{run.reviewedBy}
					{:else}
						-
					{/if}
				</td>
				<td class="text-center">
					<RunApprovalStatus submissionStatus={run.submissionStatus} />
				</td>
				<td class="text-center">
					{#if run.submissionStatus === RunSubmissionStatus.AwaitingApproval}
						<Button primary on:click={() => runInfoOpen(run.runId)}>Review</Button>
					{:else}
						<Button primary on:click={() => runInfoOpen(run.runId)}>
							<i class="bi bi-sticky" />
						</Button>
					{/if}
				</td>
			</tr>
		{/each}
	</Table>
{/if}
<SubmissionInfoModal bind:this={modal} on:submissionChanged={submissionsUpdated} />
