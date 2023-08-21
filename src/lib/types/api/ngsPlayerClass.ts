import { stringEnumValuesToMap } from '$lib/utils/enum';

export enum NgsPlayerClass {
	Hunter = 'ngs_hunter',
	Fighter = 'ngs_fighter',
	Ranger = 'ngs_ranger',
	Gunner = 'ngs_gunner',
	Force = 'ngs_force',
	Techter = 'ngs_techter',
	Braver = 'ngs_braver',
	Bouncer = 'ngs_bouncer',
	Waker = 'ngs_waker',
	Slayer = 'ngs_slayer',
	Unknown = 'ngs_unknown'
}

const playerClassMap = stringEnumValuesToMap<NgsPlayerClass>(NgsPlayerClass);

export const parseNgsPlayerClass = (str: string) =>
	!str ? undefined : playerClassMap[str.toLowerCase()];
