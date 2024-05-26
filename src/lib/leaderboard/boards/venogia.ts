import { Game } from '$lib/types/api/game';
import { PartySize } from '$lib/types/api/partySizes';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { LeaderboardDefinition } from '../leaderboard';
import { createRunSearchSchema } from '../runSearchSchema';
import { createRunSubmissionSchema } from '../submissionSchema';

export const venogiaUrgentQuest = new LeaderboardDefinition({
	name: 'leaderboard.venogia',
	route: 'venogia',
	icon: '/icons/submit/venogia.jpg',
	game: Game.Ngs,
	quest: NgsQuests.Venogia,
	category: NgsRunCategories.UrgentQuest,
	maxQuestRank: 1,
	playerCap: 8,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party, PartySize.MultiParty],
	maxSeconds: 30 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.Venogia,
		NgsRunCategories.UrgentQuest,
		1,
		8,
		30 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.Venogia, NgsRunCategories.UrgentQuest, 1, 8),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Venogia;
			f.category = f.category ?? NgsRunCategories.UrgentQuest;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const venogiaBoards = [venogiaUrgentQuest];
