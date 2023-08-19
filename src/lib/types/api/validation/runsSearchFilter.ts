import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { type InferType, string, number, object, boolean, mixed } from 'yup';
import { IndomitableBoss } from '../duels/indomitableBoss';
import { NgsRunCategories } from '../runs/categories';
import { NgsQuests } from '../runs/quests';
import { ServerRegion } from '../serverRegions';
import { RunSortOption } from '../runs/sortOptions';

const classes = [
	null,
	NgsPlayerClass.Hunter,
	NgsPlayerClass.Fighter,
	NgsPlayerClass.Ranger,
	NgsPlayerClass.Gunner,
	NgsPlayerClass.Force,
	NgsPlayerClass.Techter,
	NgsPlayerClass.Braver,
	NgsPlayerClass.Bouncer,
	NgsPlayerClass.Waker,
	NgsPlayerClass.Slayer
];

const validCategories: Record<NgsQuests, string[]> = {
	[NgsQuests.Purples]: [
		NgsRunCategories.Aelio,
		NgsRunCategories.Retem,
		NgsRunCategories.Kvaris,
		NgsRunCategories.Stia
	],
	[NgsQuests.DfSolus]: [NgsRunCategories.Quest],
	[NgsQuests.DfAegis]: [NgsRunCategories.UrgentQuest, NgsRunCategories.Trigger],
	[NgsQuests.Duels]: [
		NgsRunCategories.NexAelio,
		NgsRunCategories.RenusRetem,
		NgsRunCategories.AmsKvaris,
		NgsRunCategories.NilsStia,
		NgsRunCategories.Halvaldi
	]
};

const servers = [null, ServerRegion.Global, ServerRegion.Japan];
const quests = [null, NgsQuests.Purples, NgsQuests.DfSolus, NgsQuests.DfAegis, NgsQuests.Duels];
const sortOrders = [null, RunSortOption.Ranking, RunSortOption.Recent];
const ranks = [null, 1, 2, 3];

export const runsSearchFilterSchema = object({
	quest: string().nullable().oneOf(quests),
	category: string()
		.nullable()
		.test(
			'valid_quest_category',
			(category) => `Quest category is invalid for the selected quest.`,
			(category, ctx) => {
				if (!category) {
					return true;
				}

				const validQuestCategories = validCategories[ctx.parent.quest] ?? [];
				const isValid = validQuestCategories.includes(category) ?? false;
				if (!isValid) {
					return ctx.createError({
						message: `Quest category is invalid. Must be one of: ${validQuestCategories.join(',')}`
					});
				}
				return isValid;
			}
		),
	server: string().lowercase().nullable().oneOf(servers),
	class: string().lowercase().nullable().oneOf(classes),
	rank: number().nullable().oneOf(ranks),
	page: number().min(0).max(30000).default(0).nullable(),
	take: number().min(1).max(1000).nullable(),
	sort: string().lowercase().nullable().default('ranking').oneOf(sortOrders),
	partySize: number().min(1).max(24).nullable()
});

export type RunsSearchFilter = InferType<typeof runsSearchFilterSchema>;
