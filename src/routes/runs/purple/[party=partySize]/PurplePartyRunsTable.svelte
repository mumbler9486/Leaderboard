<script lang="ts">
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import RankingBadge from '$lib/Components/RankingBadge.svelte';
	import RunInfoModal from '$lib/Components/RunInfoModal.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import VideoLink from '$lib/Components/VideoLink.svelte';
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import type { PurpleRun2 } from '$lib/types/api/runs/run';

	let modal: RunInfoModal;

	export let solo: boolean;
	export let runs: PurpleRun2[];

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
					<th class="bg-neutral text-center text-neutral-content">Classes</th>
					{#if solo}
						<th class="bg-neutral text-center text-neutral-content">Weapons</th>
					{/if}
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
							{#each run.party as player}
								<PlayerNameBadge
									player={run.party ? mapPartyMemberToNamePref(player) : undefined}
									on:click={() => runInfoOpen(run.runId)}
									on:keyup={() => runInfoOpen(run.runId)}
								/>
							{/each}
						</td>
						<td class="text-center">
							{#each run.party as player}
								<p>
									<NgsClassIcon showTooltip combatClass={player.mainClass} />
									<NgsClassIcon showTooltip combatClass={player.subClass} />
								</p>
							{/each}
						</td>
						{#if solo}
							<td class="text-center">
								{#each run.party[0].weapons as weapon}
									<WeaponIcon {weapon} />
								{/each}
							</td>
						{/if}
						<td class="text-center">
							<TimeDisplay time={run.time} />
						</td>
						<td class="text-center">
							{#each run.party as player}
								<p>
									{#if player?.linkPov}
										<VideoLink url={player?.linkPov} />
									{:else}
										<span class="text-base-content/50">No POV</span>
									{/if}
								</p>
							{/each}
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
