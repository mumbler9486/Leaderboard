import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { mixed, object, type InferType } from 'yup';
import { LeaderboardDefinition } from '../leaderboard';
import { Game } from '$lib/types/api/game';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { createDetailedRunSubmissionSchema } from '../submissionSchema';
import { createDetailedRunSearchSchema, createRunSearchSchema } from '../runSearchSchema';
import type { RunAttributeFilter } from '$lib/server/types/db/runs/runAttributeFilter';
import { PartySize } from '$lib/types/api/partySizes';

const supports = [
	DfAegisSupport.AinaManon,
	DfAegisSupport.Ilma,
	DfAegisSupport.Nadereh,
	DfAegisSupport.Glen,
	DfAegisSupport.None,
];

const dfAegisDetailsSchema = object({
	support: mixed<DfAegisSupport>()
		.required()
		.oneOf(supports)
		.test('valid_support', 'Support selection is invalid for this quest', (support, ctx) => {
			const category = ctx.from?.at(1)?.value?.category as NgsRunCategories | undefined;
			const isQuestCategory = category === NgsRunCategories.Quest;

			if (isQuestCategory && support === DfAegisSupport.None) {
				return true;
			} else if (!isQuestCategory && support !== DfAegisSupport.None) {
				return true;
			}
			return false;
		}),
});

const dfAegisPartyRunSearchSchema = createDetailedRunSearchSchema(
	NgsQuests.DfAegis,
	NgsRunCategories.Quest,
	1,
	4,
	object({
		support: mixed<DfAegisSupport>().nullable().oneOf(supports),
	})
);

export const dfAegisQuest = new LeaderboardDefinition({
	name: 'leaderboard.dfAegis',
	route: 'dfaegis',
	icon: '/icons/submit/dfaegis.jpg',
	game: Game.Ngs,
	quest: NgsQuests.DfAegis,
	category: NgsRunCategories.Quest,
	maxQuestRank: 1,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party],
	maxSeconds: 15 * 60,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.DfAegis,
		NgsRunCategories.Quest,
		1,
		4,
		15 * 60,
		dfAegisDetailsSchema
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.DfAegis, NgsRunCategories.Quest, 1, 4),
		filterDefaults: (f) => {
			f.quest = NgsQuests.DfAegis;
			f.category = f.category ?? NgsRunCategories.Quest;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
	detailsTableHeader: {
		label: 'Support',
		textAlign: 'center',
	},
});

export const dfAegisUrgentQuest = new LeaderboardDefinition({
	name: 'leaderboard.dfAegis',
	route: 'dfaegis',
	icon: '/icons/submit/dfaegis.jpg',
	game: Game.Ngs,
	quest: NgsQuests.DfAegis,
	category: NgsRunCategories.UrgentQuest,
	maxQuestRank: 1,
	playerCap: 8,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party, PartySize.MultiParty],
	maxSeconds: 20 * 60,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.DfAegis,
		NgsRunCategories.UrgentQuest,
		1,
		8,
		20 * 60,
		dfAegisDetailsSchema
	),
	runSearch: {
		runSearchSchema: createDetailedRunSearchSchema(
			NgsQuests.DfAegis,
			NgsRunCategories.Quest,
			1,
			8,
			object({
				support: mixed<DfAegisSupport>().nullable().oneOf(supports),
			})
		),
		filterDefaults: (f) => {
			f.quest = NgsQuests.DfAegis;
			f.category = f.category ?? NgsRunCategories.UrgentQuest;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => {
			return !f.support
				? undefined
				: ([
						{
							path: 'support',
							type: 'string',
							value: f.support as string,
						},
				  ] satisfies RunAttributeFilter[]);
		},
	},
	detailsTableHeader: {
		label: 'Support',
		textAlign: 'center',
	},
});

export const dfAegisTrigger = new LeaderboardDefinition({
	name: 'leaderboard.dfAegis',
	route: 'dfaegis',
	icon: '/icons/submit/dfaegis.jpg',
	game: Game.Ngs,
	quest: NgsQuests.DfAegis,
	category: NgsRunCategories.Trigger,
	maxQuestRank: 1,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party],
	maxSeconds: 20 * 60,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.DfAegis,
		NgsRunCategories.Trigger,
		1,
		4,
		20 * 60,
		dfAegisDetailsSchema
	),
	runSearch: {
		runSearchSchema: dfAegisPartyRunSearchSchema,
		filterDefaults: (f) => {
			f.quest = NgsQuests.DfAegis;
			f.category = f.category ?? NgsRunCategories.Trigger;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => {
			return !f.support
				? undefined
				: ([
						{
							path: 'support',
							type: 'string',
							value: f.support as string,
						},
				  ] satisfies RunAttributeFilter[]);
		},
	},
	detailsTableHeader: {
		label: 'Support',
		textAlign: 'center',
	},
});

export const dfAegisBoards = [dfAegisQuest, dfAegisUrgentQuest, dfAegisTrigger];
