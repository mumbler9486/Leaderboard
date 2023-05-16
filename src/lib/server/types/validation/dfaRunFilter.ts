import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { type InferType, string, number, object, boolean } from 'yup';

const regions = [null, 'global', 'japan'];
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

const buffs = [null, 'ilma', 'ainamanon', 'nadereh', 'glen'];
const questType = ['trigger', 'urgent'];

export const dfaSoloSearchFilterSchema = object({
	region: string().lowercase().nullable().oneOf(regions),
	class: string().lowercase().nullable().oneOf(classes),
	buff: string().lowercase().nullable().oneOf(buffs),
	trigger: string().lowercase().default('urgent').oneOf(questType)
});

export type DfaSoloSearchFilter = InferType<typeof dfaSoloSearchFilterSchema>;

export const dfaPartySearchFilterSchema = object({
	region: string().lowercase().nullable().oneOf(regions),
	buff: string().lowercase().nullable().oneOf(buffs),
	trigger: string().lowercase().default('urgent').oneOf(questType)
});

export type DfaPartySearchFilter = InferType<typeof dfaPartySearchFilterSchema>;
