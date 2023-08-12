import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { type InferType, string, number, object, boolean } from 'yup';

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

const validCategories: Record<string, string[]> = {
	purples: ['aelio', 'retem', 'kvaris', 'stia'],
	dfsolus: ['quest']
};

const servers = [null, 'global', 'japan'];
const quests = [null, 'dfsolus', 'purples'];
const sortOrders = [null, 'ranking', 'recent'];
const ranks = [null, 1, 2];

export const runsSearchFilterSchema = object({
	quest: string().nullable().oneOf(quests),
	category: string()
		.nullable()
		.test(
			'valid_quest_category',
			(category) => `Quest category must be one of: ${validCategories[category]?.join(',')}`,
			(category, ctx) => {
				if (!category) {
					return true;
				}

				return validCategories[ctx.parent.quest]?.includes(category) ?? false;
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
