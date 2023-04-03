<script lang="ts">
	import { Weapon } from '$lib/types/api/weapon';
	import Tooltip from './Tooltip.svelte';

	export let weapon: Weapon | undefined;
	export let showLabel: boolean = false;

	const weaponsMap = {
		[Weapon.Sword]: { name: 'Sword', icon: '/icons/weapon/weapon-sword.png' },
		[Weapon.WiredLance]: { name: 'Wired Lance', icon: '/icons/weapon/weapon-wire.png' },
		[Weapon.Partisan]: { name: 'Partisan', icon: '/icons/weapon/weapon-partisan.png' },
		[Weapon.TwinDaggers]: { name: 'Twin Daggers', icon: '/icons/weapon/weapon-daggers.png' },
		[Weapon.DoubleSabers]: { name: 'Double Saber', icon: '/icons/weapon/weapon-saber.png' },
		[Weapon.Knuckles]: { name: 'Knuckles', icon: '/icons/weapon/weapon-knux.png' },
		[Weapon.Katana]: { name: 'Katana', icon: '/icons/weapon/weapon-katana.png' },
		[Weapon.SoaringBlades]: { name: 'Soaring Blades', icon: '/icons/weapon/weapon-blades.png' },
		[Weapon.AssaultRifle]: { name: 'Assault Rifle', icon: '/icons/weapon/weapon-rifle.png' },
		[Weapon.Launcher]: { name: 'Launcher', icon: '/icons/weapon/weapon-launcher.png' },
		[Weapon.TwinMachineGuns]: { name: 'Twin Machine Guns', icon: '/icons/weapon/weapon-tmg.png' },
		[Weapon.Bow]: { name: 'Bow', icon: '/icons/weapon/weapon-bow.png' },
		[Weapon.Rod]: { name: 'Rod', icon: '/icons/weapon/weapon-rod.png' },
		[Weapon.Talis]: { name: 'Talis', icon: '/icons/weapon/weapon-talis.png' },
		[Weapon.Wand]: { name: 'Wand', icon: '/icons/weapon/weapon-wand.png' },
		[Weapon.JetBoots]: { name: 'Jet Boots', icon: '/icons/weapon/weapon-boots.png' },
		[Weapon.Harmonizer]: { name: 'Harmonizer', icon: '/icons/weapon/weapon-takt.png' },
		[Weapon.Gunblade]: { name: 'Gunblade', icon: '/icons/weapon/weapon-gunblade.png' },
		[Weapon.Unknown]: { name: 'Unknown', icon: '' }
	};

	$: weaponInfo = weaponsMap[weapon ?? Weapon.Unknown];
</script>

<Tooltip tip={weaponInfo.name}>
	<img src={weaponInfo.icon} class="inline w-[16px] object-none" alt={weaponInfo.name} />
	{#if showLabel}
		{weaponInfo.name}
	{/if}
</Tooltip>
