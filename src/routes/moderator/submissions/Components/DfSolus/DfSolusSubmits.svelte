<script lang="ts">
	import SubmissionInfoModal from '$lib/Components/SubmissionInfoModal.svelte';
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import DfSolusSubmitRow from './DfSolusSubmitRow.svelte';
	import type { Submission } from '$lib/types/api/submissions/submissions';
	import type { DfSolusRun } from '$lib/types/api/runs/run';
	import type { RunCategories } from '$lib/types/api/categories';
	import { fetchGetApi } from '$lib/utils/fetch';
	import type { PlayerInfo } from '$lib/types/api/playerInfo';
	import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';

	export let category: RunCategories;

	let submissions: DfSolusRun[] = [];
	let loading = true;

	let submissionModal: SubmissionInfoModal;
	let viewSubmission: Submission;

	$: workaroundViewSubmission = !viewSubmission
		? undefined
		: { ...viewSubmission, category: 'dfsolus' }; //TODO: temporary work around while refactoring Runs
	$: mappedSubmissions = tempMapSubmissions(submissions);

	$: reloadData(category);

	async function reloadData(...watch: any[]) {
		try {
			const submittedRuns = await fetchGetApi<DfSolusRun[]>(`/ngs-api/submissions/dfsolus`);
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
		const run = mappedSubmissions.find((r) => r.runId == runId);
		if (!run) {
			console.error(`RunId=${runId} does not exist.`);
			return;
		}

		viewSubmission = run;
		console.log({ ...viewSubmission, category: 'dfsolus' });
		submissionModal.showModal();
	};

	const tempMapSubmissions = (runs: DfSolusRun[]) => {
		return runs.map((r) => ({
			//TODO : Temporary mapping, remove when runs refactored
			...r,
			submissionTime: r.submissionDate,
			partySize: r.party.length,
			server: r.serverRegion,
			notes: r.notes ?? '',
			submitter: {
				playerId: r.submitter.playerId,
				playerName: r.submitter.name,
				ship: r.submitter.ship,
				flag: r.submitter.flag ?? '',
				characterName: r.submitter.characterName,
				preferredName: r.submitter.preferredNameType,
				runCharacterName: '',
				mainClass: NgsPlayerClass.Unknown,
				subClass: NgsPlayerClass.Unknown,
				linkPov: '',
				server: '',
				nameType: r.submitter.nameEffectType,
				nameColor1: r.submitter.nameColor1,
				nameColor2: r.submitter.nameColor2,
				weapons: []
			},
			players: r.party.map(
				(pm) =>
					({
						playerId: pm.playerId ?? 0,
						playerName: pm.playerName,
						ship: pm.playerInfo.ship,
						flag: pm.playerInfo.flag ?? '',
						characterName: pm.playerInfo.characterName,
						preferredName: pm.playerInfo.preferredNameType,
						runCharacterName: pm.runCharacterName,
						mainClass: pm.mainClass,
						subClass: pm.subClass,
						linkPov: pm.linkPov,
						server: '',
						nameType: pm.playerInfo.nameEffectType,
						nameColor1: pm.playerInfo.nameColor1,
						nameColor2: pm.playerInfo.nameColor2,
						weapons: pm.weapons
					} satisfies PlayerInfo)
			)
		}));
	};
</script>

<div class="-mx-6 overflow-x-auto overflow-y-hidden md:mx-0">
	<table class="table-zebra table-compact table w-full">
		<thead>
			<tr>
				<th class="bg-neutral text-neutral-content">Players</th>
				<th class="bg-neutral text-center text-neutral-content">Party</th>
				<th class="bg-neutral text-center text-neutral-content">Rank</th>
				<th class="bg-neutral text-center text-neutral-content">Class</th>
				<th class="bg-neutral text-center text-neutral-content">Weapons</th>
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
				{#each mappedSubmissions as submission}
					<DfSolusSubmitRow on:openRunInfo={runInfoOpen} {submission} />
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
	submission={workaroundViewSubmission}
	on:submissionChanged={reloadData}
/>
