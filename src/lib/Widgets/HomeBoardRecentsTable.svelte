<script lang="ts">
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import Table, { type TableHeader } from '$lib/Components/Tables/Table.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { lookupBoard } from '$lib/leaderboard/boards';
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import { getPartySize, partySizeTranslationMap } from '$lib/types/api/partySizes';
	import type { Run } from '$lib/types/api/runs/run';
	import { t } from 'svelte-i18n';

	export let runs: Run<unknown>[] = [];

	const headers: TableHeader[] = [
		{
			label: 'Date',
		},
		{
			label: 'Player',
		},
		{
			label: 'Time',
		},
		{
			label: 'Category',
		},
	];

	const getQuestLabel = (run: Run<unknown>) => {
		const board = lookupBoard(run.quest, run.category);
		const boardName = !board?.name ? '<unknown_quest>' : $t(board.name);
		const questLabel = `${$t(boardName)} R${run.questRank}`;
		return questLabel;
	};

	const getPartySizeLabel = (partySize: number) => {
		const tKey = getPartySize(partySize);
		if (!tKey) return '';
		return $t(partySizeTranslationMap[tKey]);
	};
</script>

<Table size="xs" zebra {headers}>
	{#each runs as run}
		<tr class="hover">
			<td>{new Date(run.submissionDate).toLocaleDateString()}</td>
			<td class="flex flex-wrap gap-2 break-words">
				{#each run.party.slice(0, 2) as player}
					<PlayerNameBadge
						size="xs"
						showInGameName={false}
						showShipFlag
						player={mapPartyMemberToNamePref(player)}
					/>
				{/each}
				{#if run.party.length > 2}
					+{run.party.length - 2}
				{/if}
			</td>
			<td>
				<TimeDisplay time={run.time} />
			</td>
			<td class="break-words">[{getPartySizeLabel(run.party.length)}] {getQuestLabel(run)}</td>
		</tr>
	{/each}
</Table>
