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

export const dbValToWeaponsMap: { [key: string]: Weapon } = {
	['sword']: Weapon.Sword,
	['wl']: Weapon.WiredLance,
	['partisan']: Weapon.Partisan,
	['td']: Weapon.TwinDaggers,
	['ds']: Weapon.DoubleSabers,
	['knuckles']: Weapon.Knuckles,
	['katana']: Weapon.Katana,
	['sb']: Weapon.SoaringBlades,
	['rifle']: Weapon.AssaultRifle,
	['launcher']: Weapon.Launcher,
	['tmg']: Weapon.TwinMachineGuns,
	['bow']: Weapon.Bow,
	['rod']: Weapon.Rod,
	['talis']: Weapon.Talis,
	['wand']: Weapon.Wand,
	['jb']: Weapon.JetBoots,
	['takt']: Weapon.Harmonizer,
	['gb']: Weapon.Gunblade
};
