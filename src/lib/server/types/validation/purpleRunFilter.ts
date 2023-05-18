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

const regions = ['aelio', 'retem', 'kvaris', 'stia'];

export const purpleSoloSearchFilterSchema = object({
	server: string().lowercase().nullable().oneOf(serverRegions),
	class: string().lowercase().nullable().oneOf(classes),
	region: string().required().lowercase().oneOf(regions),
	rank: number().required(),
});

export type PurpleSoloSearchFilter = InferType<typeof purpleSoloSearchFilterSchema>;

export const purplePartySearchFilterSchema = object({
	server: string().lowercase().nullable().oneOf(serverRegions),
	region: string().required().lowercase().oneOf(regions),
	rank: number()
});

export type PurplePartySearchFilter = InferType<typeof purplePartySearchFilterSchema>;
