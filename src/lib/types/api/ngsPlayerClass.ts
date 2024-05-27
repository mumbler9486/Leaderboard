import { stringEnumValuesToMap } from '$lib/utils/enum';
import { NgsWeapon } from './weapon';

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
	Unknown = 'ngs_unknown',
}

export const equippableWeaponsMap: Record<NgsPlayerClass, NgsWeapon[]> = {
	[NgsPlayerClass.Hunter]: [NgsWeapon.Sword, NgsWeapon.WiredLance, NgsWeapon.Partisan],
	[NgsPlayerClass.Fighter]: [NgsWeapon.TwinDaggers, NgsWeapon.DoubleSabers, NgsWeapon.Knuckles],
	[NgsPlayerClass.Ranger]: [NgsWeapon.AssaultRifle, NgsWeapon.Launcher],
	[NgsPlayerClass.Gunner]: [NgsWeapon.TwinMachineGuns, NgsWeapon.AssaultRifle],
	[NgsPlayerClass.Force]: [NgsWeapon.Rod, NgsWeapon.Talis],
	[NgsPlayerClass.Techter]: [NgsWeapon.Wand, NgsWeapon.Talis],
	[NgsPlayerClass.Braver]: [NgsWeapon.Katana, NgsWeapon.Bow],
	[NgsPlayerClass.Bouncer]: [NgsWeapon.SoaringBlades, NgsWeapon.JetBoots],
	[NgsPlayerClass.Waker]: [NgsWeapon.Harmonizer],
	[NgsPlayerClass.Slayer]: [NgsWeapon.Gunblade],
	[NgsPlayerClass.Unknown]: [],
};

const playerClassMap = stringEnumValuesToMap<NgsPlayerClass>(NgsPlayerClass);

export const parseNgsPlayerClass = (str: string) =>
	!str ? undefined : playerClassMap[str.toLowerCase()];
