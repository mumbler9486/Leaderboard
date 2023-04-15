<script lang="ts">
	import ClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import RankingBadge from '$lib/Components/RankingBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import VideoLink from '$lib/Components/VideoLink.svelte';
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';
	import type { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import type { RunTime } from '$lib/types/api/runTime';
	import type { Weapon } from '$lib/types/api/weapon';

	type IndomitableRun = {
		rank: 1;
		server: 'Global' | 'Japan';
		playerName: string;
		mainClass: NgsPlayerClass;
		subClass: NgsPlayerClass;
		weapons: Weapon[];
		time: RunTime;
		videoUrl: string;
		notes: string;
	};

	export let runs: IndomitableRun[];
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
					<th class="bg-neutral text-center text-neutral-content"
						>IGT <div
							class="tooltip tooltip-bottom tooltip-info font-semibold normal-case"
							data-tip="In-Game Time"
						>
							<i class="bi-question-circle ms-2" />
						</div></th
					>
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
						<td class="font-bold">{run.playerName}</td>
						<td class="text-center font-bold">-</td>
						<td class="text-center">
							<ClassIcon combatClass={run.mainClass} showLabel />
						</td>
						<td class="text-center">
							<ClassIcon combatClass={run.subClass} showLabel />
						</td>
						<td class="text-center">
							{#each run.weapons as weapon}
								<div class="inline w-[16px] object-none">
									<WeaponIcon {weapon} />
								</div>
							{/each}
						</td>
						<td class="text-center">
							<TimeDisplay time={run.time} />
						</td>
						<td class="text-center">
							<VideoLink url={run.videoUrl} />
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
