import { Game } from '$lib/types/api/game';
import { PartySize } from '$lib/types/api/partySizes';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { LeaderboardDefinition } from '../leaderboard';
import { createRunSearchSchema } from '../runSearchSchema';
import { createRunSubmissionSchema } from '../submissionSchema';

export const malignantRuineLutherQuest = new LeaderboardDefinition({
	name: 'leaderboard.malignantRuineLuther',
	questRoute: 'malignant-ruine-luther',
	categoryRoute: 'quest',
	icon: '/icons/submit/dfvael.jpg',
	game: Game.Ngs,
	quest: NgsQuests.MalignantRuineLuther,
	category: NgsRunCategories.Quest,
	maxQuestRank: 1,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party],
	maxSeconds: 60 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.MalignantRuineLuther,
		NgsRunCategories.Quest,
		1,
		4,
		60 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(
			NgsQuests.MalignantRuineLuther,
			NgsRunCategories.Quest,
			1,
			8
		),
		filterDefaults: (f) => {
			f.quest = NgsQuests.MalignantRuineLuther;
			f.category = f.category ?? NgsRunCategories.Quest;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const malignantRuineLutherBoards = [malignantRuineLutherQuest];
