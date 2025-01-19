<script lang="ts">
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import RunInfoModal from '$lib/Components/RunInfoModal.svelte';
	import Table, { type TableHeader } from '$lib/Components/Tables/Table.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { lookupBoard } from '$lib/leaderboard/boards';
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import { getPartySize, partySizeTranslationMap } from '$lib/types/api/partySizes';
	import { ngsCategoryTranslationMap, NgsRunCategories } from '$lib/types/api/runs/categories';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import type { MasqDuelRunDetails, Run } from '$lib/types/api/runs/run';
	import { formatString } from '$lib/utils/string';
	import { t } from 'svelte-i18n';

	export let runs: Run<unknown>[] = [];

	let modal: RunInfoModal;

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
			label: 'Quest',
		},
		{
			label: '',
		},
	];

	const getQuestLabel = (run: Run<unknown>) => {
		const board = lookupBoard(run.quest, run.category);
		if (!board) {
			return '<unknown_quest>';
		}
		const boardName = !board?.name ? '<unknown_quest>' : $t(board.name);
		const nameTemplate = board.discordNotifyTemplate ?? '{boardName} [{category}] ({partySize})';
		const partySizeName = getPartySizeLabel(run.party.length);
		const categoryName = $t(ngsCategoryTranslationMap[board.category]);
		const masqDepth =
			run.quest === NgsQuests.ExtraDuels && run.category === NgsRunCategories.Masquerade
				? (run.details as MasqDuelRunDetails).depth?.toString()
				: '';

		return formatString(nameTemplate, {
			boardName,
			category: categoryName,
			partySize: partySizeName,
			questRank: run.questRank.toString(),
			masqDepth: masqDepth,
		});
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
			<td class="break-words">{getQuestLabel(run)}</td>
			<td>
				<button
					class="link text-primary"
					on:click={() => modal.showModal(run)}
					on:keyup={() => modal.showModal(run)}
				>
					Link
				</button>
			</td>
		</tr>
	{/each}
</Table>
<RunInfoModal bind:this={modal} />
