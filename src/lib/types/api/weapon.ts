import { stringEnumValuesToMap } from '$lib/utils/enum';

export enum NgsWeapon {
	Sword = 'ngs_sword',
	WiredLance = 'ngs_wired_lance',
	Partisan = 'ngs_partisan',
	TwinDaggers = 'ngs_twin_daggers',
	DoubleSabers = 'ngs_double_sabers',
	Knuckles = 'ngs_knuckles',
	Katana = 'ngs_katana',
	SoaringBlades = 'ngs_soaring_blades',
	Gunblade = 'ngs_gunblade',
	AssaultRifle = 'ngs_assault_rifle',
	Launcher = 'ngs_launcher',
	TwinMachineGuns = 'ngs_twin_machine_guns',
	Bow = 'ngs_bow',
	Rod = 'ngs_rod',
	Talis = 'ngs_talis',
	Wand = 'ngs_wand',
	JetBoots = 'ngs_jet_boots',
	Harmonizer = 'ngs_harmonizer',
	Unknown = 'ngs_unknown'
}

const weaponMap = stringEnumValuesToMap<NgsWeapon>(NgsWeapon);
export const parseNgsWeapon = (str: string) =>
	!str ? NgsWeapon.Unknown : weaponMap[str.toLowerCase()] ?? NgsWeapon.Unknown;
