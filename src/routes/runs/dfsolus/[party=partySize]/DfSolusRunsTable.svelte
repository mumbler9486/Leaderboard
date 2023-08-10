<script lang="ts">
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import RankingBadge from '$lib/Components/RankingBadge.svelte';
	import RunInfoModal from '$lib/Components/RunInfoModal.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import VideoLink from '$lib/Components/VideoLink.svelte';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import type { PlayerInfo } from '$lib/types/api/playerInfo';
	import type { DfSolusRun } from '$lib/types/api/runs/run';

	let modal: RunInfoModal;
	let viewRun: DfSolusRun | undefined;

	export let runs: DfSolusRun[];
	export let solo: boolean;

	$: mappedRuns = tempMapRuns(runs);
	$: viewRunMapped = !!viewRun ? tempMapRuns([viewRun])[0] : undefined;

	const runInfoOpen = (runId: number) => {
		const run = runs.find((r) => r.runId == runId);
		if (!run) {
			console.error(`RunId=${runId} does not exist.`);
			return;
		}

		viewRun = run;
		modal.showModal();
	};

	const tempMapRuns = (runs: DfSolusRun[]) => {
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
					<th class="bg-neutral text-center text-neutral-content">
						IGT <InfoTooltip below tip={'In-Game Time'} />
					</th>
					<th class="bg-neutral text-center text-neutral-content">Video</th>
					<th class="w-2 bg-neutral text-center text-neutral-content" />
				</tr>
			</thead>
			<tbody>
				{#each mappedRuns as run}
					<tr class="hover border-t border-t-secondary/20">
						<td class="text-center font-bold">
							<RankingBadge rank={run.rank} />
						</td>
						<td class="font-bold">
							{#each run.players as player}
								<PlayerNameBadge
									player={run.players[0] ? mapToNamePref(player) : undefined}
									on:click={() => runInfoOpen(run.runId)}
									on:keyup={() => runInfoOpen(run.runId)}
								/>
							{/each}
						</td>
						<td class="text-center">
							{#each run.players as player}
								<p>
									<NgsClassIcon showTooltip combatClass={player.mainClass} />
									<NgsClassIcon showTooltip combatClass={player.subClass} />
								</p>
							{/each}
						</td>
						<td class="text-center">
							<TimeDisplay time={run.time} />
						</td>
						<td class="text-center">
							{#each run.players as player}
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

<RunInfoModal
	videoUrl={viewRunMapped?.players[0].linkPov ?? ''}
	players={viewRunMapped?.players ?? []}
	submitter={viewRunMapped?.submitter}
	notes={viewRunMapped?.notes ?? ''}
	bind:this={modal}
/>
