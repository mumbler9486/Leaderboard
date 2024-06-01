import type { NgsRunCategories } from '$lib/types/api/runs/categories';
import type { NgsQuests } from '$lib/types/api/runs/quests';
import { dfAegisBoards } from './boards/dfAegis';
import { dfDalionBoards } from './boards/dfDalion';
import { dfSolusBoards } from './boards/dfSolus';
import { duelBoards } from './boards/duels';
import { purpleBoards } from './boards/purples';
import { venogiaBoards } from './boards/venogia';
import type { LeaderboardDefinition } from './leaderboard';

export const allLeaderboards: LeaderboardDefinition<any, any>[] = [
	...dfDalionBoards,
	...dfAegisBoards,
	...duelBoards,
	...purpleBoards,
	...venogiaBoards,
	...dfSolusBoards,
];

/**
 * Look up a board by quest and category
 * @param quest Quest
 * @param category Category
 * @returns
 */
export const lookupBoard = (quest: NgsQuests, category: NgsRunCategories) => {
	return allLeaderboards.find((l) => l.quest === quest && l.category === category);
};

export const lookupQuestByRoute = (route: string) => {
	const matchingBoard = allLeaderboards.find((l) => l.route === route);
	return matchingBoard?.quest;
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
