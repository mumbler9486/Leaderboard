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

export const indomitableRunSearchFilterSchema = object({
	server: string().lowercase().nullable().oneOf(servers),
	class: string().lowercase().nullable().oneOf(classes),
	augmentations: string().lowercase().nullable().oneOf(augmentations)
});

export type IndomitableRunSearchFilter = InferType<typeof indomitableRunSearchFilterSchema>;
