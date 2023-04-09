import { stringEnumValuesToMap } from '$lib/utils/enum';

export enum NgsPlayerClass {
	Hunter = 'hunter',
	Fighter = 'fighter',
	Ranger = 'ranger',
	Gunner = 'gunner',
	Force = 'force',
	Techter = 'techter',
	Braver = 'braver',
	Bouncer = 'bouncer',
	Waker = 'waker',
	Slayer = 'slayer',
	Unknown = 'unknown'
}

const playerClassMap = stringEnumValuesToMap<NgsPlayerClass>(NgsPlayerClass);

export const parseNgsPlayerClass = (str: string) =>
	!str ? undefined : playerClassMap[str.toLowerCase()];
