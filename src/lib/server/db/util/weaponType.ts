import { Weapon } from '$lib/types/api/weapon';

export const weaponsToDbValMap: { [key: string]: string } = {
	[Weapon.Sword]: 'sword',
	[Weapon.WiredLance]: 'wl',
	[Weapon.Partisan]: 'partisan',
	[Weapon.TwinDaggers]: 'td',
	[Weapon.DoubleSabers]: 'ds',
	[Weapon.Knuckles]: 'knuckles',
	[Weapon.Katana]: 'katana',
	[Weapon.SoaringBlades]: 'sb',
	[Weapon.AssaultRifle]: 'rifle',
	[Weapon.Launcher]: 'launcher',
	[Weapon.TwinMachineGuns]: 'tmg',
	[Weapon.Bow]: 'bow',
	[Weapon.Rod]: 'rod',
	[Weapon.Talis]: 'talis',
	[Weapon.Wand]: 'wand',
	[Weapon.JetBoots]: 'jb',
	[Weapon.Harmonizer]: 'takt',
	[Weapon.Gunblade]: 'gb'
};
