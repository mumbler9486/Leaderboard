import { Game } from '$lib/types/api/game';
import { PartySize } from '$lib/types/api/partySizes';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { LeaderboardDefinition } from '../leaderboard';
import { createRunSearchSchema } from '../runSearchSchema';
import { createRunSubmissionSchema } from '../submissionSchema';

export const dfVaelUrgentQuest = new LeaderboardDefinition({
	name: 'leaderboard.dfVael',
	questRoute: 'dfvael',
	categoryRoute: 'urgent-quest',
	icon: '/icons/submit/dfvael.jpg',
	game: Game.Ngs,
	quest: NgsQuests.DfVael,
	category: NgsRunCategories.UrgentQuest,
	maxQuestRank: 1,
	playerCap: 8,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party, PartySize.MultiParty],
	maxSeconds: 60 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.DfVael,
		NgsRunCategories.UrgentQuest,
		1,
		8,
		60 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.DfVael, NgsRunCategories.UrgentQuest, 1, 8),
		filterDefaults: (f) => {
			f.quest = NgsQuests.DfVael;
			f.category = f.category ?? NgsRunCategories.UrgentQuest;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const dfVaelBoards = [dfVaelUrgentQuest];
