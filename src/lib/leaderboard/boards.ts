import type { NgsRunCategories } from '$lib/types/api/runs/categories';
import type { NgsQuests } from '$lib/types/api/runs/quests';
import { dfAegisBoards } from './boards/dfAegis';
import { dfSolusBoards } from './boards/dfSolus';
import { duelBoards } from './boards/duels';
import type { LeaderboardDefinition } from './leaderboard';

export const allLeaderboards: LeaderboardDefinition<any, any>[] = [
	...dfSolusBoards,
	...dfAegisBoards,
	...duelBoards,
];

export const lookupBoard = (quest: NgsQuests, category: NgsRunCategories) => {
	return allLeaderboards.find((l) => l.quest === quest && l.category === category);
};

/**
 * Looks up all leaderboards by a quest. This primarily
 * is used to get all the categories for a given quest
 * @param quest Quest to search
 * @returns
 */
export const lookupBoardsByQuest = (quest: NgsQuests) => {
	return allLeaderboards.filter((l) => l.quest === quest);
};
