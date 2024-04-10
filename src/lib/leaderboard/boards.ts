import { Game } from '$lib/types/api/game';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { LeaderboardDefinition } from './leaderboard';
import { createRunSearchSchema } from './runSearchSchema';
import { createRunSubmissionSchema } from './submissionSchema';

export const dfDalionQuest = new LeaderboardDefinition({
	name: 'leaderboard.dfDalion',
	route: 'dfdalion',
	game: Game.Ngs,
	quest: NgsQuests.DfDalion,
	category: NgsRunCategories.Quest,
	maxQuestRank: 1,
	playerCap: 4,
	maxSeconds: 20 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.DfDalion,
		NgsRunCategories.Quest,
		1,
		4,
		20 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.DfDalion, NgsRunCategories.Quest, 1, 4),
		filterDefaults: (f) => {
			f.quest = NgsQuests.DfDalion;
			f.category = f.category ?? NgsRunCategories.Quest;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const allLeaderboards = [dfDalionQuest];

/**
 * Looks up all leaderboards by a quest. This primarily
 * is used to get all the categories for a given quest
 * @param quest Quest to search
 * @returns
 */
export const lookupBoardsByQuest = (quest: NgsQuests) => {
	return allLeaderboards.filter((l) => l.quest === quest);
};
