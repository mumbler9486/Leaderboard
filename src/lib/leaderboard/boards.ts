import type { NgsRunCategories } from '$lib/types/api/runs/categories';
import type { NgsQuests } from '$lib/types/api/runs/quests';
import { dfAegisQuest, dfAegisTrigger, dfAegisUrgentQuest } from './boards/dfAegis';
import { dfDalionQuest, dfDalionUrgentQuest } from './boards/dfSolus';
import {
	duelNexAelioBoard,
	duelRenusRetemBoard,
	duelAmsKvarisBoard,
	duelNilsStiaBoard,
	duelHalvaldiBoard,
	duelZelvinBoard,
	duelRingwedgeBoard,
} from './boards/duels';
import type { LeaderboardDefinition } from './leaderboard';

export const allLeaderboards: LeaderboardDefinition<any, any>[] = [
	dfDalionQuest,
	dfDalionUrgentQuest,

	dfAegisQuest,
	dfAegisUrgentQuest,
	dfAegisTrigger,

	duelNexAelioBoard,
	duelRenusRetemBoard,
	duelAmsKvarisBoard,
	duelNilsStiaBoard,
	duelHalvaldiBoard,
	duelZelvinBoard,
	duelRingwedgeBoard,
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
