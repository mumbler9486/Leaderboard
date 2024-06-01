import type { NgsRunCategories } from '$lib/types/api/runs/categories';
import { error } from '@sveltejs/kit';
import { validQuestCategories } from '../../../../params/category';
import { lookupBoard } from '$lib/leaderboard/boards';
import type { NgsQuests } from '$lib/types/api/runs/quests';

// TODO remove
export function load({ params }) {
	const quest = params.quest as NgsQuests;
	const category = validQuestCategories[params.category?.toLowerCase()] as NgsRunCategories;
	const boardInfo = lookupBoard(quest, category)!;

	if (!boardInfo) {
		throw error(404, 'Unknown leaderboard');
	}
}
