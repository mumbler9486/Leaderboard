import { ServerRegion } from '$lib/types/api/serverRegions';

export enum ServerRegionDbValue {
	Global = 'global',
	Japan = 'japan'
}

const dbToServerRegionMap: Record<string, ServerRegion> = {
	[ServerRegionDbValue.Global]: ServerRegion.Global,
	[ServerRegionDbValue.Japan]: ServerRegion.Japan
};

const serverRegionToDbMap: Record<ServerRegion, ServerRegionDbValue | undefined> = {
	[ServerRegion.Global]: ServerRegionDbValue.Global,
	[ServerRegion.Japan]: ServerRegionDbValue.Japan,
	[ServerRegion.Unknown]: undefined
};

export const mapDbValToServerRegion = (dbWeapon: string | undefined) =>
	!dbWeapon ? ServerRegion.Unknown : dbToServerRegionMap[dbWeapon] ?? ServerRegion.Unknown;

export const mapServerRegionToDbVal = (weapon: ServerRegion | undefined) =>
	!weapon ? undefined : serverRegionToDbMap[weapon];
