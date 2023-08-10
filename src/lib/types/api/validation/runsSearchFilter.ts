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

const servers = [null, 'global', 'japan'];
const quests = [null, 'dfsolus'];
const sortOrders = [null, 'ranking', 'recent'];
const ranks = [null, 1, 2];

export const runsSearchFilterSchema = object({
	quest: string().nullable().oneOf(quests),
	server: string().lowercase().nullable().oneOf(servers),
	class: string().lowercase().nullable().oneOf(classes),
	rank: number().nullable().oneOf(ranks),
	page: number().min(0).max(30000).default(0).nullable(),
	take: number().min(1).max(1000).nullable(),
	sort: string().lowercase().nullable().default('ranking').oneOf(sortOrders),
	partySize: number().min(1).max(24).nullable(),
	approved: string().strip()
});

export type RunsSearchFilter = InferType<typeof runsSearchFilterSchema>;
