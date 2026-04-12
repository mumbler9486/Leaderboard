<script lang="ts" generics="T">
	import { patchCodeLabelMap } from '$lib/constants/patchCodes';
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import type { Run } from '$lib/types/api/runs/run';
	import { InformationCircle } from 'svelte-heros-v2';
	import Button from '../Button.svelte';
	import NgsClassIcon from '../NgsClassIcon.svelte';
	import NgsStyleClassIcon from '../NgsStyleClassIcon.svelte';
	import PlayerNameBadge from '../PlayerNameBadge.svelte';
	import RankingBadge from '../RankingBadge.svelte';
	import RunInfoModal from '../RunInfoModal.svelte';
	import TimeDisplay from '../TimeDisplay.svelte';
	import VideoLink from '../VideoLink.svelte';
	import WeaponIcon from '../WeaponIcon.svelte';
	import Table, { type TableHeader } from './Table.svelte';

	interface Props {
		runs: Run<T>[];
		solosOnly?: boolean;
		detailsColumn?: TableHeader | undefined;
		detailsItem?: import('svelte').Snippet<[any]>;
	}

	let {
		runs,
		solosOnly = false,
		detailsColumn = undefined,
		detailsItem
	}: Props = $props();
	let modal: RunInfoModal = $state();

	let headerDef = $derived((
		[
			{ label: '#', textAlign: 'center', class: 'w-2' },
			{ label: 'Player', textAlign: 'default' },
			detailsColumn,
			{ label: 'Class', textAlign: 'center' },
			{ label: 'Weapons', textAlign: 'center' },
			{ label: 'IGT', textAlign: 'center', tooltip: 'In-Game Time' },
			{ label: 'Patch', textAlign: 'center' },
			{ label: 'Video', textAlign: 'center' },
			{ label: '', textAlign: 'center', class: 'w-2' },
		] satisfies (TableHeader | undefined)[]
	).filter((h): h is TableHeader => !!h));

	let headers = $derived(solosOnly ? headerDef : headerDef.filter((x, i) => i !== 3));

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
				{#if !!detailsColumn && detailsItem}
					<td
						class="text-center font-bold"
						class:text-right={detailsColumn?.textAlign === 'right'}
						class:text-center={detailsColumn?.textAlign === 'center'}
					>
						{@render detailsItem?.({ run, })}
					</td>
				{/if}
				<td class="text-center">
					{#each run.party as player}
						<p>
							<NgsClassIcon showTooltip combatClass={player.mainClass} />
							<NgsClassIcon showTooltip combatClass={player.subClass} />
							<NgsStyleClassIcon showTooltip styleClass={player.styleClass} />
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
					{patchCodeLabelMap[run.patch]}
				</td>
				<td class="text-center">
					{#each run.party as player}
						<p class="flex flex-row justify-center">
							{#if player?.linkPov}
								<VideoLink url={player?.linkPov} />
							{:else}
								<span class="text-base-content/50">No POV</span>
							{/if}
						</p>
					{/each}
				</td>
				<td class="text-center">
					<Button size="sm" modifier="primary" on:click={() => runInfoOpen(run.runId)}>
						<InformationCircle size="20" />
					</Button>
				</td>
			</tr>
		{/each}
	</Table>
{/if}
<RunInfoModal bind:this={modal} />
