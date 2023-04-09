import { stringEnumValuesToMap } from '$lib/utils/enum';

export enum Weapon {
	Sword = 'sword',
	WiredLance = 'wired lance',
	Partisan = 'partisan',
	TwinDaggers = 'twin daggers',
	DoubleSabers = 'double sabers',
	Knuckles = 'knuckles',
	Katana = 'katana',
	SoaringBlades = 'soaring blades',
	Gunblade = 'gunblade',
	AssaultRifle = 'assault rifle',
	Launcher = 'launcher',
	TwinMachineGuns = 'twin machine guns',
	Bow = 'bow',
	Rod = 'rod',
	Talis = 'talis',
	Wand = 'wand',
	JetBoots = 'jet boots',
	Harmonizer = 'harmonizer',
	Unknown = 'unknown'
}

export const weaponMap = stringEnumValuesToMap<Weapon>(Weapon);
export const parseWeapon = (str: string) => (!str ? undefined : weaponMap[str.toLowerCase()]);
