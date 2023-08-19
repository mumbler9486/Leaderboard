<script lang="ts">
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import ClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import RankingBadge from '$lib/Components/RankingBadge.svelte';
	import RunInfoModal from '$lib/Components/RunInfoModal.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import VideoLink from '$lib/Components/VideoLink.svelte';
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import type { DuelRun } from '$lib/types/api/runs/run';

	let modal: RunInfoModal;

	export let runs: DuelRun[];

	const runInfoOpen = (runId: number) => {
		const run = runs.find((r) => r.runId == runId);
		if (!run) {
			console.error(`RunId=${runId} does not exist.`);
			return;
		}

		modal.showModal(run);
	};
</script>

{#if !runs || runs.length == 0}
	<span class="flex justify-center">There are no runs that match the selected filters.</span>
{:else if runs.length > 0}
	<div class="-mx-6 overflow-x-auto overflow-y-hidden md:mx-0">
		<table class="table-zebra table-compact table w-full">
			<thead>
				<tr>
					<th class="w-2 bg-neutral text-center text-neutral-content">#</th>
					<th class="bg-neutral text-neutral-content">Player</th>
					<th class="bg-neutral text-center text-neutral-content">Augments</th>
					<th class="bg-neutral text-center text-neutral-content">Main Class</th>
					<th class="bg-neutral text-center text-neutral-content">Sub-Class</th>
					<th class="bg-neutral text-center text-neutral-content">Weapon(s)</th>
					<th class="bg-neutral text-center text-neutral-content">
						IGT <InfoTooltip below tip={'In-Game Time'} />
					</th>
					<th class="bg-neutral text-center text-neutral-content">Video</th>
					<th class="w-2 bg-neutral text-center text-neutral-content" />
				</tr>
			</thead>
			<tbody>
				{#each runs as run}
					<tr class="hover border-t border-t-secondary/20">
						<td class="text-center font-bold">
							<RankingBadge rank={run.rank} />
						</td>
						<td class="font-bold">
							<PlayerNameBadge
								player={run.party[0] ? mapPartyMemberToNamePref(run.party[0]) : undefined}
								on:click={() => runInfoOpen(run.runId)}
								on:keyup={() => runInfoOpen(run.runId)}
							/>
						</td>
						<td class="text-center font-bold">{run.details.augments ? 'Yes' : 'No'}</td>
						<td class="text-center">
							<ClassIcon combatClass={run.party[0].mainClass} showLabel />
						</td>
						<td class="text-center">
							<ClassIcon combatClass={run.party[0].subClass} showLabel />
						</td>
						<td class="text-center">
							{#each run.party[0].weapons as weapon}
								<div class="inline w-[16px] object-none">
									<WeaponIcon {weapon} />
								</div>
							{/each}
						</td>
						<td class="text-center">
							<TimeDisplay time={run.time} />
						</td>
						<td class="text-center">
							<VideoLink url={run.party[0].linkPov} />
						</td>
						<td class="text-center">
							{#if run.notes != undefined}
								<i class="bi bi-sticky" />
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<RunInfoModal bind:this={modal} />
