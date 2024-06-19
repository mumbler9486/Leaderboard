import { Game } from '$lib/types/api/game';
import { PartySize } from '$lib/types/api/partySizes';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { LeaderboardDefinition } from '../leaderboard';
import { createRunSearchSchema } from '../runSearchSchema';
import { createRunSubmissionSchema } from '../submissionSchema';

export const dfSolusQuest = new LeaderboardDefinition({
	name: 'leaderboard.dfSolus',
	questRoute: 'dfsolus',
	categoryRoute: 'quest',
	icon: '/icons/submit/dfsolus.jpg',
	game: Game.Ngs,
	quest: NgsQuests.DfSolus,
	category: NgsRunCategories.Quest,
	maxQuestRank: 2,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party],
	maxSeconds: 15 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.DfSolus,
		NgsRunCategories.Quest,
		2,
		4,
		15 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.DfSolus, NgsRunCategories.Quest, 2, 4),
		filterDefaults: (f) => {
			f.quest = NgsQuests.DfSolus;
			f.category = f.category ?? NgsRunCategories.Quest;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const dfSolusUrgentQuest = new LeaderboardDefinition({
	name: 'leaderboard.dfSolus',
	questRoute: 'dfsolus',
	categoryRoute: 'urgent-quest',
	icon: '/icons/submit/dfsolus.jpg',
	game: Game.Ngs,
	quest: NgsQuests.DfSolus,
	category: NgsRunCategories.UrgentQuest,
	maxQuestRank: 1,
	playerCap: 8,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party, PartySize.MultiParty],
	maxSeconds: 60 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.DfSolus,
		NgsRunCategories.UrgentQuest,
		1,
		8,
		60 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.DfSolus, NgsRunCategories.UrgentQuest, 1, 8),
		filterDefaults: (f) => {
			f.quest = NgsQuests.DfSolus;
			f.category = f.category ?? NgsRunCategories.UrgentQuest;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const dfSolusBoards = [dfSolusQuest, dfSolusUrgentQuest];
