import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';

export const dbValToClassMap: { [key: string]: NgsPlayerClass } = {
	['hunter']: NgsPlayerClass.Hunter,
	['fighter']: NgsPlayerClass.Fighter,
	['ranger']: NgsPlayerClass.Ranger,
	['gunner']: NgsPlayerClass.Gunner,
	['force']: NgsPlayerClass.Force,
	['techter']: NgsPlayerClass.Techter,
	['braver']: NgsPlayerClass.Braver,
	['bouncer']: NgsPlayerClass.Bouncer,
	['waker']: NgsPlayerClass.Waker,
	['slayer']: NgsPlayerClass.Slayer,
	['unknown']: NgsPlayerClass.Unknown
};
