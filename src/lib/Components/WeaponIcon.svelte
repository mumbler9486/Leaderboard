<script lang="ts">
	import { NgsWeapon } from '$lib/types/api/weapon';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		weapon: NgsWeapon | undefined;
		showLabel?: boolean;
	}

	let { weapon, showLabel = false }: Props = $props();

	const weaponsMap = {
		[NgsWeapon.Sword]: { name: 'Sword', icon: '/icons/weapon/weapon-sword.png' },
		[NgsWeapon.WiredLance]: { name: 'Wired Lance', icon: '/icons/weapon/weapon-wire.png' },
		[NgsWeapon.Partisan]: { name: 'Partisan', icon: '/icons/weapon/weapon-partisan.png' },
		[NgsWeapon.TwinDaggers]: { name: 'Twin Daggers', icon: '/icons/weapon/weapon-daggers.png' },
		[NgsWeapon.DoubleSabers]: { name: 'Double Saber', icon: '/icons/weapon/weapon-saber.png' },
		[NgsWeapon.Knuckles]: { name: 'Knuckles', icon: '/icons/weapon/weapon-knux.png' },
		[NgsWeapon.Katana]: { name: 'Katana', icon: '/icons/weapon/weapon-katana.png' },
		[NgsWeapon.SoaringBlades]: { name: 'Soaring Blades', icon: '/icons/weapon/weapon-blades.png' },
		[NgsWeapon.AssaultRifle]: { name: 'Assault Rifle', icon: '/icons/weapon/weapon-rifle.png' },
		[NgsWeapon.Launcher]: { name: 'Launcher', icon: '/icons/weapon/weapon-launcher.png' },
		[NgsWeapon.TwinMachineGuns]: {
			name: 'Twin Machine Guns',
			icon: '/icons/weapon/weapon-tmg.png',
		},
		[NgsWeapon.Bow]: { name: 'Bow', icon: '/icons/weapon/weapon-bow.png' },
		[NgsWeapon.Rod]: { name: 'Rod', icon: '/icons/weapon/weapon-rod.png' },
		[NgsWeapon.Talis]: { name: 'Talis', icon: '/icons/weapon/weapon-talis.png' },
		[NgsWeapon.Wand]: { name: 'Wand', icon: '/icons/weapon/weapon-wand.png' },
		[NgsWeapon.JetBoots]: { name: 'Jet Boots', icon: '/icons/weapon/weapon-boots.png' },
		[NgsWeapon.Harmonizer]: { name: 'Harmonizer', icon: '/icons/weapon/weapon-takt.png' },
		[NgsWeapon.Gunblade]: { name: 'Gunblade', icon: '/icons/weapon/weapon-gunblade.png' },
		[NgsWeapon.Unknown]: { name: 'Unknown', icon: '' },
	};

	let weaponInfo = $derived(weaponsMap[weapon ?? NgsWeapon.Unknown]);
</script>

<Tooltip tip={weaponInfo.name}>
	<img
		src={weaponInfo.icon}
		class="pointer-events-none inline w-[16px] object-none"
		alt={weaponInfo.name}
	/>
	{#if showLabel}
		{weaponInfo.name}
	{/if}
</Tooltip>
