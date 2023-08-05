import { ServerRegion } from '$lib/types/api/serverRegions';

export enum ServerRegionDbValue {
	Global = 'global',
	Japan = 'japan'
}

const dbToServerRegionMap: Record<ServerRegionDbValue, ServerRegion> = {
	[ServerRegionDbValue.Global]: ServerRegion.Global,
	[ServerRegionDbValue.Japan]: ServerRegion.Japan
};

const serverRegionToDbMap: Record<ServerRegion, ServerRegionDbValue | undefined> = {
	[ServerRegion.Global]: ServerRegionDbValue.Global,
	[ServerRegion.Japan]: ServerRegionDbValue.Japan
};

export const mapDbValToServerRegion = (dbWeapon: ServerRegionDbValue | undefined) =>
	!dbWeapon ? undefined : dbToServerRegionMap[dbWeapon];

export const mapServerRegionToDbVal = (weapon: ServerRegion | undefined) =>
	!weapon ? undefined : serverRegionToDbMap[weapon];
