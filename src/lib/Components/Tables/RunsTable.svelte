<script lang="ts" generics="T">
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import type { Run } from '$lib/types/api/runs/run';
	import NgsClassIcon from '../NgsClassIcon.svelte';
	import PlayerNameBadge from '../PlayerNameBadge.svelte';
	import RankingBadge from '../RankingBadge.svelte';
	import RunInfoModal from '../RunInfoModal.svelte';
	import TimeDisplay from '../TimeDisplay.svelte';
	import VideoLink from '../VideoLink.svelte';
	import WeaponIcon from '../WeaponIcon.svelte';
	import Table, { type TableHeader } from './Table.svelte';

	export let runs: Run<T>[];
	export let solosOnly: boolean = false;
	export let detailsColumn: TableHeader | undefined = undefined;
	let modal: RunInfoModal;

	$: headerDef = (
		[
			{ label: '#', textAlign: 'center', class: 'w-2' },
			{ label: 'Player', textAlign: 'default' },
			detailsColumn,
			{ label: 'Class', textAlign: 'center' },
			{ label: 'Weapons', textAlign: 'center' },
			{ label: 'IGT', textAlign: 'center', tooltip: 'In-Game Time' },
			{ label: 'Video', textAlign: 'center' },
			{ label: '', textAlign: 'center', class: 'w-2' }
		] satisfies (TableHeader | undefined)[]
	).filter((h): h is TableHeader => !!h);

	$: headers = solosOnly ? headerDef : headerDef.filter((x, i) => i !== 3);

	const runInfoOpen = (runId: number) => {
		const run = runs.find((r) => r.runId == runId);
		if (!run) {
			console.error(`RunId=${runId} does not exist.`);
			return;
		}

		modal.showModal(run);
	};
</script>

{#if runs.length <= 0}
	<span class="flex justify-center">There are no runs that match the selected filters.</span>
{:else}
	<Table pinRows class="w-full" {headers}>
		{#each runs as run}
			<tr class="hover">
				<td class="text-center font-bold">
					<RankingBadge rank={run.rank} />
				</td>
				<td class="font-bold">
					{#each run.party as player}
						<PlayerNameBadge
							player={mapPartyMemberToNamePref(player)}
							on:click={() => runInfoOpen(run.runId)}
							on:keyup={() => runInfoOpen(run.runId)}
						/>
					{/each}
				</td>
				{#if $$slots.detailsItem}
					<td
						class="text-center font-bold"
						class:text-right={detailsColumn?.textAlign === 'right'}
						class:text-center={detailsColumn?.textAlign === 'center'}
					>
						<slot name="detailsItem" {run} />
					</td>
				{/if}
				<td class="text-center">
					{#each run.party as player}
						<p>
							<NgsClassIcon showTooltip combatClass={player.mainClass} />
							<NgsClassIcon showTooltip combatClass={player.subClass} />
						</p>
					{/each}
				</td>
				{#if solosOnly}
					<td class="text-center">
						{#each run.party[0].weapons as weapon}
							<div class="inline w-[16px] object-none">
								<WeaponIcon {weapon} />
							</div>
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
	</Table>
{/if}
<RunInfoModal bind:this={modal} />
