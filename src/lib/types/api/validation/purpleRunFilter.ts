import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { type InferType, string, number, object, boolean } from 'yup';

const serverRegions = [null, 'global', 'japan'];
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

const regions = [null, 'aelio', 'retem', 'kvaris', 'stia'];
const sortOrders = [null, 'ranking', 'recent'];

export const purpleSoloSearchFilterSchema = object({
	server: string().lowercase().nullable().oneOf(serverRegions),
	class: string().lowercase().nullable().oneOf(classes),
	region: string().lowercase().nullable().oneOf(regions),
	rank: number().nullable(),
	page: number().min(0).max(30000).default(0).nullable(),
	take: number().min(1).max(1000).nullable(),
	sort: string().lowercase().nullable().default('ranking').oneOf(sortOrders)
});

export type PurpleSoloSearchFilter = InferType<typeof purpleSoloSearchFilterSchema>;

export const purplePartySearchFilterSchema = object({
	server: string().lowercase().nullable().oneOf(serverRegions),
	region: string().lowercase().nullable().oneOf(regions),
	rank: number(),
	page: number().min(0).max(30000).default(0).nullable(),
	take: number().min(1).max(1000).nullable(),
	sort: string().lowercase().nullable().default('ranking').oneOf(sortOrders)
});

export type PurplePartySearchFilter = InferType<typeof purplePartySearchFilterSchema>;
