<script lang="ts">
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import RankingBadge from '$lib/Components/RankingBadge.svelte';
	import RunInfoModal from '$lib/Components/RunInfoModal.svelte';
	import Table, { type TableHeader } from '$lib/Components/Tables/Table.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { lookupBoard } from '$lib/leaderboard/boards';
	import { planetfallStageBossNameMappings } from '$lib/leaderboard/boards/duelPlanetfall';
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import { getPartySize, partySizeTranslationMap } from '$lib/types/api/partySizes';
	import { ngsCategoryTranslationMap, NgsRunCategories } from '$lib/types/api/runs/categories';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import type {
		MasqDuelRunDetails,
		PlanetfallStrikeRunDetails,
		Run,
	} from '$lib/types/api/runs/run';
	import { formatString } from '$lib/utils/string';
	import { t } from 'svelte-i18n';

	interface Props {
		runs?: Run<unknown>[];
	}

	let { runs = [] }: Props = $props();

	let modal: RunInfoModal = $state();

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
		const planetfallStageNumber =
			run.quest === NgsQuests.ExtraDuels && run.category === NgsRunCategories.PlanetfallStrike
				? (run.details as PlanetfallStrikeRunDetails).stage
				: -1;
		const planetfallStageName = planetfallStageBossNameMappings[planetfallStageNumber] ?? '';

		return formatString(nameTemplate, {
			boardName,
			category: categoryName,
			partySize: partySizeName,
			questRank: run.questRank.toString(),
			masqDepth: masqDepth,
			planetfallStage: `${planetfallStageNumber}: ${planetfallStageName}`,
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
			<td class="break-words">{getQuestLabel(run)}</td>
			<td>
				<button
					class="link text-primary"
					onclick={() => modal.showModal(run)}
					onkeyup={() => modal.showModal(run)}
				>
					Link
				</button>
			</td>
		</tr>
	{/each}
</Table>
<RunInfoModal bind:this={modal} />
