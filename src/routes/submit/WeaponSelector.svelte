<script lang="ts">
	import { Weapon } from '$lib/types/api/weapon';
	import { partyForm } from './partyFormStore';

	export let playerIndex: number;
	export let maxSelections: number = 6;

	let selectedWeapons: { [weaponKey: string]: boolean } = {};
	let selectionHistory: string[] = [];

	$: updateForm(selectedWeapons);
	const updateForm = (...watch: any) => {
		partyForm.update((p) => {
			p[playerIndex].weapons = selectionHistory;
			return p;
		});
	};

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
		[Weapon.Gunblade]: { name: 'Gunblade', icon: '/icons/weapon/weapon-gunblade.png' },
		[Weapon.Rod]: { name: 'Rod', icon: '/icons/weapon/weapon-rod.png' },
		[Weapon.Talis]: { name: 'Talis', icon: '/icons/weapon/weapon-talis.png' },
		[Weapon.Wand]: { name: 'Wand', icon: '/icons/weapon/weapon-wand.png' },
		[Weapon.JetBoots]: { name: 'Jet Boots', icon: '/icons/weapon/weapon-boots.png' },
		[Weapon.Harmonizer]: { name: 'Harmonizer', icon: '/icons/weapon/weapon-takt.png' }
	};

	const maintainMaximum = (weaponKey: string) => {
		if (!selectionHistory.includes(weaponKey) && selectedWeapons[weaponKey]) {
			selectionHistory.push(weaponKey);
		}
		if (selectionHistory.includes(weaponKey) && !selectedWeapons[weaponKey]) {
			selectionHistory.splice(
				selectionHistory.findIndex((w) => w == weaponKey),
				1
			);
		}

		if (selectionHistory.length > maxSelections) {
			const lastAdded = selectionHistory.shift();
			if (lastAdded) selectedWeapons[lastAdded] = false;
		}
	};
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
	{#each Object.entries(weaponsMap) as [weaponKey, weapon]}
		<label
			class="label cursor-pointer rounded border border-secondary/50 bg-base-100 p-2"
			class:bg-secondary={selectedWeapons[weaponKey]}
			for={`player${playerIndex}-${weapon.name}-select`}
		>
			<img src={weapon.icon} alt={weapon.name} />
			<span class="label-text">{weapon.name}</span>
			<input
				id={`player${playerIndex}-${weapon.name}-select`}
				type="checkbox"
				value={weaponKey}
				class="checkbox rounded"
				bind:checked={selectedWeapons[weaponKey]}
				on:change={() => maintainMaximum(weaponKey)}
			/>
		</label>
	{/each}
</div>
