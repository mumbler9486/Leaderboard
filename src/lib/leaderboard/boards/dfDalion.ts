import { Game } from '$lib/types/api/game';
import { PartySize } from '$lib/types/api/partySizes';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { LeaderboardDefinition } from '../leaderboard';
import { createRunSearchSchema } from '../runSearchSchema';
import { createRunSubmissionSchema } from '../submissionSchema';

export const dfDalionQuest = new LeaderboardDefinition({
	name: 'leaderboard.dfDalion',
	questRoute: 'dfdalion',
	categoryRoute: 'quest',
	icon: '/icons/submit/dfdalion.jpg',
	game: Game.Ngs,
	quest: NgsQuests.DfDalion,
	category: NgsRunCategories.Quest,
	maxQuestRank: 1,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party],
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

export const dfDalionUrgentQuest = new LeaderboardDefinition({
	name: 'leaderboard.dfDalion',
	questRoute: 'dfdalion',
	categoryRoute: 'urgent-quest',
	icon: '/icons/submit/dfdalion.jpg',
	game: Game.Ngs,
	quest: NgsQuests.DfDalion,
	category: NgsRunCategories.UrgentQuest,
	maxQuestRank: 1,
	playerCap: 8,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party, PartySize.MultiParty],
	maxSeconds: 20 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.DfDalion,
		NgsRunCategories.UrgentQuest,
		1,
		8,
		60 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.DfDalion, NgsRunCategories.UrgentQuest, 1, 8),
		filterDefaults: (f) => {
			f.quest = NgsQuests.DfDalion;
			f.category = f.category ?? NgsRunCategories.UrgentQuest;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const dfDalionBoards = [dfDalionQuest, dfDalionUrgentQuest];
