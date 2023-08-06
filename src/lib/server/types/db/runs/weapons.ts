import { Weapon } from '$lib/types/api/weapon';

export enum NgsWeaponDbValue {
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
	Harmonizer = 'ngs_harmonizer'
}

const dbToWeaponMap: Record<string, Weapon> = {
	[NgsWeaponDbValue.Sword]: Weapon.Sword,
	[NgsWeaponDbValue.WiredLance]: Weapon.WiredLance,
	[NgsWeaponDbValue.Partisan]: Weapon.Partisan,
	[NgsWeaponDbValue.TwinDaggers]: Weapon.TwinDaggers,
	[NgsWeaponDbValue.DoubleSabers]: Weapon.DoubleSabers,
	[NgsWeaponDbValue.Knuckles]: Weapon.Knuckles,
	[NgsWeaponDbValue.Katana]: Weapon.Katana,
	[NgsWeaponDbValue.SoaringBlades]: Weapon.SoaringBlades,
	[NgsWeaponDbValue.Gunblade]: Weapon.Gunblade,
	[NgsWeaponDbValue.AssaultRifle]: Weapon.AssaultRifle,
	[NgsWeaponDbValue.Launcher]: Weapon.Launcher,
	[NgsWeaponDbValue.TwinMachineGuns]: Weapon.TwinMachineGuns,
	[NgsWeaponDbValue.Bow]: Weapon.Bow,
	[NgsWeaponDbValue.Rod]: Weapon.Rod,
	[NgsWeaponDbValue.Talis]: Weapon.Talis,
	[NgsWeaponDbValue.Wand]: Weapon.Wand,
	[NgsWeaponDbValue.JetBoots]: Weapon.JetBoots,
	[NgsWeaponDbValue.Harmonizer]: Weapon.Harmonizer
};

const weaponToDbMap: Record<Weapon, NgsWeaponDbValue | undefined> = {
	[Weapon.Sword]: NgsWeaponDbValue.Sword,
	[Weapon.WiredLance]: NgsWeaponDbValue.WiredLance,
	[Weapon.Partisan]: NgsWeaponDbValue.Partisan,
	[Weapon.TwinDaggers]: NgsWeaponDbValue.TwinDaggers,
	[Weapon.DoubleSabers]: NgsWeaponDbValue.DoubleSabers,
	[Weapon.Knuckles]: NgsWeaponDbValue.Knuckles,
	[Weapon.Katana]: NgsWeaponDbValue.Katana,
	[Weapon.SoaringBlades]: NgsWeaponDbValue.SoaringBlades,
	[Weapon.Gunblade]: NgsWeaponDbValue.Gunblade,
	[Weapon.AssaultRifle]: NgsWeaponDbValue.AssaultRifle,
	[Weapon.Launcher]: NgsWeaponDbValue.Launcher,
	[Weapon.TwinMachineGuns]: NgsWeaponDbValue.TwinMachineGuns,
	[Weapon.Bow]: NgsWeaponDbValue.Bow,
	[Weapon.Rod]: NgsWeaponDbValue.Rod,
	[Weapon.Talis]: NgsWeaponDbValue.Talis,
	[Weapon.Wand]: NgsWeaponDbValue.Wand,
	[Weapon.JetBoots]: NgsWeaponDbValue.JetBoots,
	[Weapon.Harmonizer]: NgsWeaponDbValue.Harmonizer,
	[Weapon.Unknown]: undefined
};

export const mapDbValToWeapon = (dbWeapon: string | undefined) =>
	!dbWeapon ? Weapon.Unknown : dbToWeaponMap[dbWeapon] ?? Weapon.Unknown;

export const mapWeaponToDbVal = (weapon: Weapon | undefined) =>
	!weapon ? undefined : weaponToDbMap[weapon];
