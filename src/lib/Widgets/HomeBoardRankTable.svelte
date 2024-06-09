<script lang="ts">
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import RankingBadge from '$lib/Components/RankingBadge.svelte';
	import Table, { type TableHeader } from '$lib/Components/Tables/Table.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { lookupBoard } from '$lib/leaderboard/boards';
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import type { Run } from '$lib/types/api/runs/run';
	import { t } from 'svelte-i18n';

	export let runs: Run<unknown>[] = [];

	const headers: TableHeader[] = [
		{
			label: '#',
			textAlign: 'center',
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
</script>

<Table size="xs" zebra {headers}>
	{#each runs as run}
		<tr class="hover">
			<td class="text-center font-bold">
				<RankingBadge rank={run.rank} />
			</td>
			<td>
				<PlayerNameBadge
					size="xs"
					showInGameName={false}
					showShipFlag
					player={mapPartyMemberToNamePref(run.party[0])}
				/>
			</td>
			<td>
				<TimeDisplay time={run.time} />
			</td>
			<td>{getQuestLabel(run)}</td>
		</tr>
	{/each}
</Table>
