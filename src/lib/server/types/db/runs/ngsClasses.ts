import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';

export enum NgsClassDbValue {
	Hunter = 'ngs_hunter',
	Fighter = 'ngs_fighter',
	Ranger = 'ngs_ranger',
	Gunner = 'ngs_gunner',
	Force = 'ngs_force',
	Techter = 'ngs_techter',
	Braver = 'ngs_braver',
	Bouncer = 'ngs_bouncer',
	Waker = 'ngs_waker',
	Slayer = 'ngs_slayer'
}

const dbToNgsClassMap: Record<NgsClassDbValue, NgsPlayerClass> = {
	[NgsClassDbValue.Hunter]: NgsPlayerClass.Hunter,
	[NgsClassDbValue.Fighter]: NgsPlayerClass.Fighter,
	[NgsClassDbValue.Ranger]: NgsPlayerClass.Ranger,
	[NgsClassDbValue.Gunner]: NgsPlayerClass.Gunner,
	[NgsClassDbValue.Force]: NgsPlayerClass.Force,
	[NgsClassDbValue.Techter]: NgsPlayerClass.Techter,
	[NgsClassDbValue.Braver]: NgsPlayerClass.Braver,
	[NgsClassDbValue.Bouncer]: NgsPlayerClass.Bouncer,
	[NgsClassDbValue.Waker]: NgsPlayerClass.Waker,
	[NgsClassDbValue.Slayer]: NgsPlayerClass.Slayer
};

const ngsClassToDbMap: Record<NgsPlayerClass, NgsClassDbValue | undefined> = {
	[NgsPlayerClass.Hunter]: NgsClassDbValue.Hunter,
	[NgsPlayerClass.Fighter]: NgsClassDbValue.Fighter,
	[NgsPlayerClass.Ranger]: NgsClassDbValue.Ranger,
	[NgsPlayerClass.Gunner]: NgsClassDbValue.Gunner,
	[NgsPlayerClass.Force]: NgsClassDbValue.Force,
	[NgsPlayerClass.Techter]: NgsClassDbValue.Techter,
	[NgsPlayerClass.Braver]: NgsClassDbValue.Braver,
	[NgsPlayerClass.Bouncer]: NgsClassDbValue.Bouncer,
	[NgsPlayerClass.Waker]: NgsClassDbValue.Waker,
	[NgsPlayerClass.Slayer]: NgsClassDbValue.Slayer,
	[NgsPlayerClass.Unknown]: undefined
};

export const mapDbValToNgsClass = (dbWeapon: NgsClassDbValue | undefined) =>
	!dbWeapon ? undefined : dbToNgsClassMap[dbWeapon];

export const mapNgsClassToDbVal = (weapon: NgsPlayerClass | undefined) =>
	!weapon ? undefined : ngsClassToDbMap[weapon];
