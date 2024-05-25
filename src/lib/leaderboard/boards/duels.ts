import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { boolean, object, string } from 'yup';
import { LeaderboardDefinition } from '../leaderboard';
import { Game } from '$lib/types/api/game';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { PartySize } from '$lib/types/api/partySizes';
import { createDetailedRunSearchSchema } from '../runSearchSchema';
import { createDetailedRunSubmissionSchema } from '../submissionSchema';
import type { RunAttributeFilter } from '$lib/server/types/db/runs/runAttributeFilter';

const rules = [
	'Do not abuse bugs or exploits.',
	'A run is considered to have used a Duel Augment if any duel specific augments (e.g., Defi-series) have been affixed to any equipment used during the run.',
];

const duelDetailsSchema = object({
	augments: boolean().required(),
});

const augmentOptions = ['yes', 'no', 'no_filter', null];

const convertFilterToBoolean = (filter: string | null) => {
	switch (filter) {
		case 'yes':
			return true;
		case 'no':
			return false;
		case 'no_filter':
			return null;
		default:
			return undefined;
	}
};

const duelSearchSchema = (category: NgsRunCategories) =>
	createDetailedRunSearchSchema(
		NgsQuests.Duels,
		category,
		1,
		1,
		object({
			augments: string().lowercase().nullable().oneOf(augmentOptions),
		})
	);

export const duelNexAelioBoard = new LeaderboardDefinition({
	name: 'leaderboard.duels.nexAelio',
	route: 'duels',
	icon: '/icons/submit/duel_nils_stia.png',
	game: Game.Ngs,
	quest: NgsQuests.Duels,
	category: NgsRunCategories.NexAelio,
	maxQuestRank: 1,
	playerCap: 1,
	allowedPartySizes: [PartySize.Solo],
	maxSeconds: 10 * 60,
	rules: rules,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.Duels,
		NgsRunCategories.NexAelio,
		1,
		1,
		10 * 60,
		duelDetailsSchema
	),
	detailsTableHeader: {
		label: 'Augments',
		textAlign: 'center',
	},
	runSearch: {
		runSearchSchema: duelSearchSchema(NgsRunCategories.NexAelio),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Duels;
			f.partySize = 1;
		},
		attributeFilter: (f) => {
			const augmentFilterValue = convertFilterToBoolean(f.augments as string);
			return augmentFilterValue === null || augmentFilterValue === undefined
				? undefined
				: ([
						{
							path: 'augments',
							type: 'boolean',
							value: augmentFilterValue,
						},
				  ] satisfies RunAttributeFilter[]);
		},
	},
});
export const duelRenusRetemBoard = new LeaderboardDefinition({
	name: 'leaderboard.duels.renusRetem',
	route: 'duels',
	icon: '/icons/submit/duel_nils_stia.png',
	game: Game.Ngs,
	quest: NgsQuests.Duels,
	category: NgsRunCategories.RenusRetem,
	maxQuestRank: 1,
	playerCap: 1,
	allowedPartySizes: [PartySize.Solo],
	maxSeconds: 10 * 60,
	rules: rules,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.Duels,
		NgsRunCategories.RenusRetem,
		1,
		1,
		10 * 60,
		duelDetailsSchema
	),
	detailsTableHeader: {
		label: 'Augments',
		textAlign: 'center',
	},
	runSearch: {
		runSearchSchema: duelSearchSchema(NgsRunCategories.RenusRetem),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Duels;
			f.partySize = 1;
		},
		attributeFilter: (f) => {
			const augmentFilterValue = convertFilterToBoolean(f.augments as string);
			return augmentFilterValue === null || augmentFilterValue === undefined
				? undefined
				: ([
						{
							path: 'augments',
							type: 'boolean',
							value: augmentFilterValue,
						},
				  ] satisfies RunAttributeFilter[]);
		},
	},
});
export const duelAmsKvarisBoard = new LeaderboardDefinition({
	name: 'leaderboard.duels.amsKvaris',
	route: 'duels',
	icon: '/icons/submit/duel_nils_stia.png',
	game: Game.Ngs,
	quest: NgsQuests.Duels,
	category: NgsRunCategories.AmsKvaris,
	maxQuestRank: 1,
	playerCap: 1,
	allowedPartySizes: [PartySize.Solo],
	maxSeconds: 10 * 60,
	rules: rules,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.Duels,
		NgsRunCategories.AmsKvaris,
		1,
		1,
		10 * 60,
		duelDetailsSchema
	),
	detailsTableHeader: {
		label: 'Augments',
		textAlign: 'center',
	},
	runSearch: {
		runSearchSchema: duelSearchSchema(NgsRunCategories.AmsKvaris),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Duels;
			f.partySize = 1;
		},
		attributeFilter: (f) => {
			const augmentFilterValue = convertFilterToBoolean(f.augments as string);
			return augmentFilterValue === null || augmentFilterValue === undefined
				? undefined
				: ([
						{
							path: 'augments',
							type: 'boolean',
							value: augmentFilterValue,
						},
				  ] satisfies RunAttributeFilter[]);
		},
	},
});
export const duelNilsStiaBoard = new LeaderboardDefinition({
	name: 'leaderboard.duels.nilsStia',
	route: 'duels',
	icon: '/icons/submit/duel_nils_stia.png',
	game: Game.Ngs,
	quest: NgsQuests.Duels,
	category: NgsRunCategories.NilsStia,
	maxQuestRank: 1,
	playerCap: 1,
	allowedPartySizes: [PartySize.Solo],
	maxSeconds: 10 * 60,
	rules: rules,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.Duels,
		NgsRunCategories.NilsStia,
		1,
		1,
		10 * 60,
		duelDetailsSchema
	),
	detailsTableHeader: {
		label: 'Augments',
		textAlign: 'center',
	},
	runSearch: {
		runSearchSchema: duelSearchSchema(NgsRunCategories.NilsStia),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Duels;
			f.partySize = 1;
		},
		attributeFilter: (f) => {
			const augmentFilterValue = convertFilterToBoolean(f.augments as string);
			return augmentFilterValue === null || augmentFilterValue === undefined
				? undefined
				: ([
						{
							path: 'augments',
							type: 'boolean',
							value: augmentFilterValue,
						},
				  ] satisfies RunAttributeFilter[]);
		},
	},
});
export const duelHalvaldiBoard = new LeaderboardDefinition({
	name: 'leaderboard.duels.halvaldi',
	route: 'duels',
	icon: '/icons/submit/duel_nils_stia.png',
	game: Game.Ngs,
	quest: NgsQuests.Duels,
	category: NgsRunCategories.Halvaldi,
	maxQuestRank: 1,
	playerCap: 1,
	allowedPartySizes: [PartySize.Solo],
	maxSeconds: 10 * 60,
	rules: rules,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.Duels,
		NgsRunCategories.Halvaldi,
		1,
		1,
		10 * 60,
		duelDetailsSchema
	),
	detailsTableHeader: {
		label: 'Augments',
		textAlign: 'center',
	},
	runSearch: {
		runSearchSchema: duelSearchSchema(NgsRunCategories.Halvaldi),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Duels;
			f.partySize = 1;
		},
		attributeFilter: (f) => {
			const augmentFilterValue = convertFilterToBoolean(f.augments as string);
			return augmentFilterValue === null || augmentFilterValue === undefined
				? undefined
				: ([
						{
							path: 'augments',
							type: 'boolean',
							value: augmentFilterValue,
						},
				  ] satisfies RunAttributeFilter[]);
		},
	},
});
export const duelZelvinBoard = new LeaderboardDefinition({
	name: 'leaderboard.duels.zelvin',
	route: 'duels',
	icon: '/icons/submit/duel_nils_stia.png',
	game: Game.Ngs,
	quest: NgsQuests.Duels,
	category: NgsRunCategories.Zelvin,
	maxQuestRank: 1,
	playerCap: 1,
	allowedPartySizes: [PartySize.Solo],
	maxSeconds: 10 * 60,
	rules: rules,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.Duels,
		NgsRunCategories.Zelvin,
		1,
		1,
		10 * 60,
		duelDetailsSchema
	),
	detailsTableHeader: {
		label: 'Augments',
		textAlign: 'center',
	},
	runSearch: {
		runSearchSchema: duelSearchSchema(NgsRunCategories.Zelvin),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Duels;
			f.partySize = 1;
		},
		attributeFilter: (f) => {
			const augmentFilterValue = convertFilterToBoolean(f.augments as string);
			return augmentFilterValue === null || augmentFilterValue === undefined
				? undefined
				: ([
						{
							path: 'augments',
							type: 'boolean',
							value: augmentFilterValue,
						},
				  ] satisfies RunAttributeFilter[]);
		},
	},
});
export const duelRingwedgeBoard = new LeaderboardDefinition({
	name: 'leaderboard.duels.ringwedge',
	route: 'duels',
	icon: '/icons/submit/duel_nils_stia.png',
	game: Game.Ngs,
	quest: NgsQuests.Duels,
	category: NgsRunCategories.Ringwedge,
	maxQuestRank: 1,
	playerCap: 1,
	allowedPartySizes: [PartySize.Solo],
	maxSeconds: 10 * 60,
	rules: rules,
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.Duels,
		NgsRunCategories.Ringwedge,
		1,
		1,
		10 * 60,
		duelDetailsSchema
	),
	detailsTableHeader: {
		label: 'Augments',
		textAlign: 'center',
	},
	runSearch: {
		runSearchSchema: duelSearchSchema(NgsRunCategories.Ringwedge),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Duels;
			f.partySize = 1;
		},
		attributeFilter: (f) => {
			const augmentFilterValue = convertFilterToBoolean(f.augments as string);
			return augmentFilterValue === null || augmentFilterValue === undefined
				? undefined
				: ([
						{
							path: 'augments',
							type: 'boolean',
							value: augmentFilterValue,
						},
				  ] satisfies RunAttributeFilter[]);
		},
	},
});
