<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import { planetfallStrikeRunForm } from '../forms/planetfallStrikeForm';
	import { questForm } from '../forms/questForm';

	export let currentBoard: LeaderboardDefinition<any, any>;

	$: selectableOptions = new Array(getMaxRank(currentBoard, $planetfallStrikeRunForm.stage))
		.fill(0)
		.map((_, i) => ({ label: (i + 1).toString(), value: i + 1 }));

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
</script>

<Select
	label="Rank"
	placeholder="Select a rank"
	options={selectableOptions}
	bind:value={$questForm.questRank}
	on:change
/>
