import { stringEnumValuesToMap } from '$lib/utils/enum';

export enum ServerRegion {
	Global = 'global',
	Japan = 'japan',
	Unknown = 'unknown'
}

const weaponMap = stringEnumValuesToMap<ServerRegion>(ServerRegion);
export const parseServerRegion = (str: string | undefined) =>
	!str ? ServerRegion.Unknown : weaponMap[str.toLowerCase()] ?? ServerRegion.Unknown;
