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

const buffs = [null, 'ilma', 'ainamanon', 'nadereh', 'glen'];
const questType = ['trigger', 'urgent'];

export const dfaSoloSearchFilterSchema = object({
	server: string().lowercase().nullable().oneOf(servers),
	class: string().lowercase().nullable().oneOf(classes),
	buff: string().lowercase().nullable().oneOf(buffs),
	trigger: string().lowercase().default('urgent').oneOf(questType)
});

export type DfaSoloSearchFilter = InferType<typeof dfaSoloSearchFilterSchema>;

export const dfaPartySearchFilterSchema = object({
	server: string().lowercase().nullable().oneOf(servers),
	buff: string().lowercase().nullable().oneOf(buffs),
	trigger: string().lowercase().default('urgent').oneOf(questType)
});

export type DfaPartySearchFilter = InferType<typeof dfaPartySearchFilterSchema>;
