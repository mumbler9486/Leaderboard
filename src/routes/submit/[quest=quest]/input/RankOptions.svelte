<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import { planetfallStrikeRunForm } from '../forms/planetfallStrikeForm';
	import { questForm } from '../forms/questForm';

	interface Props {
		currentBoard: LeaderboardDefinition<any, any>;
	}

	let { currentBoard }: Props = $props();

	const getMaxRank = (board: LeaderboardDefinition<any, any>, ...watchForms: unknown[]) => {
		if (
			board.quest === NgsQuests.ExtraDuels &&
			board.category === NgsRunCategories.PlanetfallStrike &&
			$planetfallStrikeRunForm.stage === 11 // High Agni only has Rank 1
		) {
			if ($questForm.questRank !== 1) {
				// Reset rank to 1 and prevent svelte looping
				$questForm.questRank = 1;
			}
			return 1;
		}

		return board.maxQuestRank;
	};
	let selectableOptions = $derived(
		new Array(getMaxRank(currentBoard, $planetfallStrikeRunForm.stage))
			.fill(0)
			.map((_, i) => ({ label: (i + 1).toString(), value: i + 1 }))
	);
</script>

<Select
	label="Rank"
	placeholder="Select a rank"
	options={selectableOptions}
	bind:value={$questForm.questRank}
	on:change
/>
