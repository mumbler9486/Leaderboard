import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { type InferType, string, number, object } from 'yup';
import { NgsRunCategories } from '../runs/categories';
import { NgsQuests } from '../runs/quests';
import { ServerRegion } from '../serverRegions';
import { RunSortOption } from '../runs/sortOptions';
import { listEnumValues, stringEnumValuesToList } from '$lib/utils/enum';

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
	NgsPlayerClass.Slayer,
];

const validCategories: Record<string, string[]> = {
	[NgsQuests.Purples]: [
		NgsRunCategories.Aelio,
		NgsRunCategories.Retem,
		NgsRunCategories.Kvaris,
		NgsRunCategories.Stia,
		NgsRunCategories.AelioIntruders,
	],
	[NgsQuests.DfSolus]: [NgsRunCategories.Quest, NgsRunCategories.UrgentQuest],
	[NgsQuests.DfAegis]: [
		NgsRunCategories.UrgentQuest,
		NgsRunCategories.Trigger,
		NgsRunCategories.Quest,
	],
	[NgsQuests.Duels]: [
		NgsRunCategories.NexAelio,
		NgsRunCategories.RenusRetem,
		NgsRunCategories.AmsKvaris,
		NgsRunCategories.NilsStia,
		NgsRunCategories.Halvaldi,
		NgsRunCategories.Zelvin,
		NgsRunCategories.Ringwedge,
	],
	[NgsQuests.Venogia]: [NgsRunCategories.UrgentQuest],
};

const servers = [null, ServerRegion.Global, ServerRegion.Japan];
const quests = [null, ...listEnumValues(NgsQuests)];
const sortOrders: (string | null)[] = [
	null,
	...stringEnumValuesToList<RunSortOption>(RunSortOption),
];

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
						message: `Quest category is invalid. Must be one of: ${validQuestCategories.join(',')}`,
					});
				}
				return isValid;
			}
		),
	server: string().lowercase().nullable().oneOf(servers),
	class: string()
		.lowercase()
		.nullable()
		.oneOf(classes)
		.test(
			'must_be_solo_search',
			`Main Class filter not supported on non-solo runs. Specify partySize=${1} to use this parameter.`,
			(mainClass, ctx) => {
				if (mainClass === null || mainClass === undefined) {
					return true;
				}

				if (ctx.parent.partySize !== 1 && ctx.parent.partySize !== '1') {
					return false;
				}
				return true;
			}
		),
	rank: number().integer().nullable().min(0).max(30),
	page: number().min(0).max(30000).default(0).nullable(),
	take: number().min(1).max(1000).nullable(),
	sort: string().lowercase().nullable().default('ranking').oneOf(sortOrders),
	partySize: number().min(1).max(24).nullable(),
	userId: number().min(1).nullable(),
});

export type RunsSearchFilter = InferType<typeof runsSearchFilterSchema>;
