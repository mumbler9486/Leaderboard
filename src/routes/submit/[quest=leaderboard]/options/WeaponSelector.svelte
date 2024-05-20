<script lang="ts">
	import { NgsWeapon } from '$lib/types/api/weapon';
	import { partyForm } from '../forms/partyForm';

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
		[NgsWeapon.Gunblade]: { name: 'Gunblade', icon: '/icons/weapon/weapon-gunblade.png' },
		[NgsWeapon.Rod]: { name: 'Rod', icon: '/icons/weapon/weapon-rod.png' },
		[NgsWeapon.Talis]: { name: 'Talis', icon: '/icons/weapon/weapon-talis.png' },
		[NgsWeapon.Wand]: { name: 'Wand', icon: '/icons/weapon/weapon-wand.png' },
		[NgsWeapon.JetBoots]: { name: 'Jet Boots', icon: '/icons/weapon/weapon-boots.png' },
		[NgsWeapon.Harmonizer]: { name: 'Harmonizer', icon: '/icons/weapon/weapon-takt.png' },
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
			<img class="pointer-events-none" src={weapon.icon} alt={weapon.name} />
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
