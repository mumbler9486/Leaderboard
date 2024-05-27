<script lang="ts">
	import { equippableWeaponsMap } from '$lib/types/api/ngsPlayerClass';
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

	const weaponsMap: Partial<
		Record<NgsWeapon, { name: string; icon: string; equippable: boolean }>
	> = {
		[NgsWeapon.Sword]: { name: 'Sword', icon: '/icons/weapon/weapon-sword.png', equippable: false },
		[NgsWeapon.WiredLance]: {
			name: 'Wired Lance',
			icon: '/icons/weapon/weapon-wire.png',
			equippable: false,
		},
		[NgsWeapon.Partisan]: {
			name: 'Partisan',
			icon: '/icons/weapon/weapon-partisan.png',
			equippable: false,
		},
		[NgsWeapon.TwinDaggers]: {
			name: 'Twin Daggers',
			icon: '/icons/weapon/weapon-daggers.png',
			equippable: false,
		},
		[NgsWeapon.DoubleSabers]: {
			name: 'Double Saber',
			icon: '/icons/weapon/weapon-saber.png',
			equippable: false,
		},
		[NgsWeapon.Knuckles]: {
			name: 'Knuckles',
			icon: '/icons/weapon/weapon-knux.png',
			equippable: false,
		},
		[NgsWeapon.Katana]: {
			name: 'Katana',
			icon: '/icons/weapon/weapon-katana.png',
			equippable: false,
		},
		[NgsWeapon.SoaringBlades]: {
			name: 'Soaring Blades',
			icon: '/icons/weapon/weapon-blades.png',
			equippable: false,
		},
		[NgsWeapon.AssaultRifle]: {
			name: 'Assault Rifle',
			icon: '/icons/weapon/weapon-rifle.png',
			equippable: false,
		},
		[NgsWeapon.Launcher]: {
			name: 'Launcher',
			icon: '/icons/weapon/weapon-launcher.png',
			equippable: false,
		},
		[NgsWeapon.TwinMachineGuns]: {
			name: 'Twin Machine Guns',
			icon: '/icons/weapon/weapon-tmg.png',
			equippable: false,
		},
		[NgsWeapon.Bow]: { name: 'Bow', icon: '/icons/weapon/weapon-bow.png', equippable: false },
		[NgsWeapon.Gunblade]: {
			name: 'Gunblade',
			icon: '/icons/weapon/weapon-gunblade.png',
			equippable: false,
		},
		[NgsWeapon.Rod]: { name: 'Rod', icon: '/icons/weapon/weapon-rod.png', equippable: false },
		[NgsWeapon.Talis]: { name: 'Talis', icon: '/icons/weapon/weapon-talis.png', equippable: false },
		[NgsWeapon.Wand]: { name: 'Wand', icon: '/icons/weapon/weapon-wand.png', equippable: false },
		[NgsWeapon.JetBoots]: {
			name: 'Jet Boots',
			icon: '/icons/weapon/weapon-boots.png',
			equippable: false,
		},
		[NgsWeapon.Harmonizer]: {
			name: 'Harmonizer',
			icon: '/icons/weapon/weapon-takt.png',
			equippable: false,
		},
	};

	const updateWeaponSelection = (equippableWeapons?: NgsWeapon[]) => {
		if (!equippableWeapons || equippableWeapons.length === 0) {
			return Object.entries(weaponsMap);
		}

		return Object.entries(weaponsMap)
			.map((w) => {
				w[1].equippable = equippableWeapons.includes(w[0] as NgsWeapon);
				return w;
			})
			.sort((w1, w2) => {
				const w1Equippable = w1[1].equippable;
				const w2Equippable = w2[1].equippable;
				if (w1Equippable === w2Equippable) {
					return 0;
				} else if (w1Equippable && !w2Equippable) {
					return -1;
				} else if (!w1Equippable && w2Equippable) {
					return 1;
				}

				return 0; // Neither are equippable
			});
	};

	let selectableWeapons = updateWeaponSelection();

	partyForm.subscribe((p) => {
		const mainClass = p[playerIndex].mainClass;
		const subClass = p[playerIndex].subClass;
		const mainClassEquippableWeapons = equippableWeaponsMap[mainClass] ?? [];
		const subClassEquippableWeapons = equippableWeaponsMap[subClass] ?? [];
		const equippableWeapons = mainClassEquippableWeapons.concat(subClassEquippableWeapons);
		selectableWeapons = updateWeaponSelection(equippableWeapons);
	});

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
	{#each selectableWeapons as [weaponKey, weapon]}
		<label
			class="label cursor-pointer rounded border border-secondary/50 bg-base-100 p-2"
			class:opacity-40={!weapon.equippable}
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
