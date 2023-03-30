<script context="module" lang="ts">
	export type Weapons =
		| 'sword'
		| 'wired lance'
		| 'partisan'
		| 'twin daggers'
		| 'double saber'
		| 'knuckles'
		| 'katana'
		| 'soaring blades'
		| 'assault rifle'
		| 'launcher'
		| 'twin machine guns'
		| 'bow'
		| 'rod'
		| 'talis'
		| 'wand'
		| 'jet boots'
		| 'harmonizer'
		| 'gunblade'
		| 'unknown';
	export const parseCombatClass = (str: string) => {};
</script>

<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	export let weapon: Weapons;
	export let showLabel: boolean = false;

	const weaponsMap = {
		sword: { name: 'Sword', icon: '/icons/weapon/weapon-sword.png' },
		'wired lance': { name: 'Wired Lance', icon: '/icons/weapon/weapon-wire.png' },
		partisan: { name: 'Partisan', icon: '/icons/weapon/weapon-partisan.png' },
		'twin daggers': { name: 'Twin Daggers', icon: '/icons/weapon/weapon-daggers.png' },
		'double saber': { name: 'Double Saber', icon: '/icons/weapon/weapon-saber.png' },
		knuckles: { name: 'Knuckles', icon: '/icons/weapon/weapon-knux.png' },
		katana: { name: 'Katana', icon: '/icons/weapon/weapon-katana.png' },
		'soaring blades': { name: 'Soaring Blades', icon: '/icons/weapon/weapon-blades.png' },
		'assault rifle': { name: 'Assault Rifle', icon: '/icons/weapon/weapon-rifle.png' },
		launcher: { name: 'Launcher', icon: '/icons/weapon/weapon-launcher.png' },
		'twin machine guns': { name: 'Twin Machine Guns', icon: '/icons/weapon/weapon-tmg.png' },
		bow: { name: 'Bow', icon: '/icons/weapon/weapon-bow.png' },
		rod: { name: 'Rod', icon: '/icons/weapon/weapon-rod.png' },
		talis: { name: 'Talis', icon: '/icons/weapon/weapon-talis.png' },
		wand: { name: 'Wand', icon: '/icons/weapon/weapon-wand.png' },
		'jet boots': { name: 'Jet Boots', icon: '/icons/weapon/weapon-boots.png' },
		harmonizer: { name: 'Harmonizer', icon: '/icons/weapon/weapon-takt.png' },
		gunblade: { name: 'Gunblade', icon: '/icons/weapon/weapon-gunblade.png' },
		unknown: { name: 'Unknown', icon: '' }
	};

	$: weaponInfo = weapon != 'unknown' ? weaponsMap[weapon] : weaponsMap['unknown'];
</script>

<Tooltip tip={weaponInfo.name}>
	<img src={weaponInfo.icon} class="inline w-[16px] object-none" alt={weaponInfo.name} />
	{#if showLabel}
		{weaponInfo.name}
	{/if}
</Tooltip>
