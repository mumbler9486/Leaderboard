import { Game } from '$lib/types/api/game';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { runSubmissionRequestSchema } from '$lib/types/api/validation/runSubmission';
import { LeaderboardDefinition } from './leaderboard';

const defaultRules: string[] = ['Do not abuse bugs or exploits.'];

export const dfDalionQuest = new LeaderboardDefinition({
	name: 'leaderboard.dfDalion',
	route: 'dfdalion',
	game: Game.Ngs,
	quest: NgsQuests.DfDalion,
	category: NgsRunCategories.Quest,
	maxQuestRank: 1,
	playerCap: 4,
	maxMinutes: 20,
	rules: defaultRules,
	runSubmissionSchema: runSubmissionRequestSchema,
});

export const allLeaderboards = [dfDalionQuest];
