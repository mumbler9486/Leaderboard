import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { type InferType, string, number, object, boolean } from 'yup';

const servers = [null, 'global', 'japan'];
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

const augmentations = [null, 'yes', 'no'];
const sortOrders = [null, 'ranking', 'recent'];

export const indomitableRunSearchFilterSchema = object({
	server: string().lowercase().nullable().oneOf(servers),
	class: string().lowercase().nullable().oneOf(classes),
	augmentations: string().lowercase().nullable().oneOf(augmentations),
	page: number().min(0).max(30000).default(0).nullable(),
	take: number().min(1).max(1000).default(30000).nullable(),
	sort: string().lowercase().nullable().default('ranking').oneOf(sortOrders)
});

export type IndomitableRunSearchFilter = InferType<typeof indomitableRunSearchFilterSchema>;
