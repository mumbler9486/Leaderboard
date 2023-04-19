<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data;

	let parsedWeapons;
	let notes;
	let time;

	let playerCustomizationHolder = {
		Player: {}
	};
	let PInfo = playerCustomizationHolder['Player'];

	const classIconMap = {
		['hunter']: '/icons/class/class-hunter.png',
		['fighter']: '/icons/class/class-fighter.png',
		['ranger']: '/icons/class/class-ranger.png',
		['gunner']: '/icons/class/class-gunner.png',
		['force']: '/icons/class/class-force.png',
		['techter']: '/icons/class/class-techter.png',
		['braver']: '/icons/class/class-braver.png',
		['bouncer']: '/icons/class/class-bouncer.png',
		['waker']: '/icons/class/class-waker.png',
		['slayer']: '/icons/class/class-slayer.png',
		['?']: '/icons/class/class-unknown.png'
	} as { [id: string]: string };

	const classNameMap = {
		['hunter']: 'Hunter',
		['fighter']: 'Fighter',
		['ranger']: 'Ranger',
		['gunner']: 'Gunner',
		['force']: 'Force',
		['techter']: 'Techter',
		['braver']: 'Braver',
		['bouncer']: 'Bouncer',
		['waker']: 'Waker',
		['slayer']: 'Slayer',
		['?']: 'Unknown'
	} as { [id: string]: string };

	const weaponIconMap = {
		['sword']: '/icons/weapon/weapon-sword.png',
		['wl']: '/icons/weapon/weapon-wire.png',
		['partisan']: '/icons/weapon/weapon-partisan.png',
		['td']: '/icons/weapon/weapon-daggers.png',
		['ds']: '/icons/weapon/weapon-saber.png',
		['knuckles']: '/icons/weapon/weapon-knux.png',
		['katana']: '/icons/weapon/weapon-katana.png',
		['sb']: '/icons/weapon/weapon-blades.png',
		['rifle']: '/icons/weapon/weapon-rifle.png',
		['launcher']: '/icons/weapon/weapon-launcher.png',
		['tmg']: '/icons/weapon/weapon-tmg.png',
		['bow']: '/icons/weapon/weapon-bow.png',
		['rod']: '/icons/weapon/weapon-rod.png',
		['talis']: '/icons/weapon/weapon-talis.png',
		['wand']: '/icons/weapon/weapon-wand.png',
		['jb']: '/icons/weapon/weapon-boots.png',
		['takt']: '/icons/weapon/weapon-takt.png',
		['gb']: '/icons/weapon/weapon-gunblade.png'
	} as { [id: string]: string };

	const weaponNameMap = {
		['sword']: 'Sword',
		['wl']: 'Wired Lance',
		['partisan']: 'Partisan',
		['td']: 'Twin Daggers',
		['ds']: 'Double Saber',
		['knuckles']: 'Knuckles',
		['katana']: 'Katana',
		['sb']: 'Soaring Blades',
		['rifle']: 'Assault Rifle',
		['launcher']: 'Launcher',
		['tmg']: 'Twin Machine Guns',
		['bow']: 'Bow',
		['rod']: 'Rod',
		['talis']: 'Talis',
		['wand']: 'Wand',
		['jb']: 'Jet Boots',
		['takt']: 'Harmonizer',
		['gb']: 'Gunblade'
	} as { [id: string]: string };

	const patchCodes = {
		['60r']: '+60 Release',
		['slayer']: 'Slayer',
		['pot6r']: 'Potential Lv6. Release'
	} as { [id: string]: string };

	const regionCodes = {
		['stia']: 'Stia',
		['aelio']: 'Aelio',
		['retem']: 'Retem',
		['kvaris']: 'Kvaris'
	} as { [id: string]: string };

	const triggerTypeMap = {
		['0']: 'UQ',
		['1']: 'Trigger'
	} as { [id: string]: string };

	const buffName = {
		glen: 'Glen',
		ilma: 'Ilma',
		ainamanon: 'Aina & Manon',
		nadereh: 'Nadereh'
	};
	const buffIcon = {
		glen: '/icons/dfa/glen.png',
		ilma: '/icons/dfa/ilma.png',
		ainamanon: '/icons/dfa/ainamanon.png',
		nadereh: '/icons/dfa/nadereh.png'
	};

	let donePreparing = false;

	let mainClassAlt;
	let mainClass;
	let subClassAlt;
	let subClass;
	let subTime;

	onMount(async () => {
		var timeSplit = data.Time.split(':');
		generateNames(
			'Player1',
			data.PlayerID,
			data.PlayerName,
			data.PlayerCName,
			data.RunCharacter,
			data.PlayerPrefN,
			data.PlayerNameColor1,
			data.PlayerNameColor2,
			data.PlayerNameType
		);
		generateNames(
			'Submitter',
			data.SubmitterID,
			data.SubmitterName,
			data.SubmitterCName,
			data.SubmitterCName,
			data.SubmitterPrefN,
			data.SubmitterNameColor1,
			data.SubmitterNameColor2,
			data.SubmitterNameType
		);
		generateWeaponImages(data.WeaponInfo);
		notes = noteGenerate(data.Notes);
		time = timeSplit[0] + 'h ' + timeSplit[1] + 'm ' + timeSplit[2] + 's';
		subTime =
			new Date(data.SubmissionTime).toDateString() +
			' @ ' +
			new Date(data.SubmissionTime).toTimeString().slice(0, 8);
		mainClassAlt = pickClassName(data.MainClass);
		mainClass = generateClassImages(data.MainClass);
		subClassAlt = pickClassName(data.SubClass);
		subClass = generateClassImages(data.SubClass);
		donePreparing = true;
	});

	function openRunMessage() {
		dispatch('openRunInfo', {
			Data: data
		});
	}

	function noteGenerate(note) {
		var smile = '';
		if (note != null && note != '') {
			smile = `<i class="bi bi-sticky"></i>`;
		}
		return smile;
	}

	function generateWeaponImages(input) {
		input = input.split(' ');
		//console.log(input)
		let result = '';
		input.forEach((weapon) => {
			if (weapon != null && weapon != '') {
				result =
					result +
					'<div class="tooltip tooltip-info font-semibold" data-tip="' +
					weaponNameMap[weapon] +
					'"><img src="' +
					weaponIconMap[weapon] +
					'" class="inline object-none w-[16px]"></div>' +
					' ';
			}
		});
		parsedWeapons = result;
	}

	function generateNames(playerID, pid, player, character, run, pref, c1, c2, ntype) {
		playerCustomizationHolder['Player'][playerID] = {};
		let primaryNameOutput;
		let secondaryNameOutput;
		let cssOutput;

		switch (pref) {
			// Main Character Name
			case 1:
				primaryNameOutput = character;
				secondaryNameOutput = run;
				break;
			// Run Character Name
			case 2:
				primaryNameOutput = run;
				secondaryNameOutput = player;
				break;
			// Player Name
			default:
				primaryNameOutput = player;
				secondaryNameOutput = run;
				break;
		}
		if (pid != 106 && pid != 107) {
			cssOutput = `font-weight: bold; `;
			switch (ntype) {
				case 1:
					cssOutput += `color: #` + c1 + `;`;
					break;
				case 2:
					cssOutput +=
						`background: -webkit-linear-gradient(0deg, #` +
						c1 +
						`, #` +
						c2 +
						`);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
					break;
				case 3:
					cssOutput +=
						`color: #` +
						c2 +
						`; text-shadow: 0px 0px 5px #` +
						c1 +
						`, 0px 0px 5px #` +
						c1 +
						`, 0px 0px 5px #` +
						c1 +
						`;`;
					break;
				default:
					break;
			}
		} else {
			cssOutput = ``;
		}
		if (primaryNameOutput == secondaryNameOutput) {
			secondaryNameOutput = null;
		}
		cssOutput += `cursor: pointer;`;

		playerCustomizationHolder['Player'][playerID].PrimaryName = primaryNameOutput;
		playerCustomizationHolder['Player'][playerID].SecondaryName = secondaryNameOutput;
		playerCustomizationHolder['Player'][playerID].CSS = cssOutput;

		//console.log(playerCustomizationHolder);
	}

	function generateClassImages(input: string) {
		const input2 = input.toLowerCase();
		return classIconMap[input2];
	}

	function pickClassName(input: string) {
		const input2 = input.toLowerCase();
		return classNameMap[input2];
	}
</script>

{#if donePreparing}
	<tr class="hover border-t border-t-secondary/20">
		<th
			><span class="flex items-center"
				><span
					style={PInfo['Player1'].CSS}
					class="truncate transition ease-in-out hover:brightness-125"
					on:click={openRunMessage}>{PInfo['Player1'].PrimaryName}</span
				></span
			>{#if PInfo['Player1'].SecondaryName != null && Number(data.PlayerID) != 106 && Number(data.PlayerID) != 107}<p
					class="mt-1 text-xs"
				>
					{PInfo['Player1'].SecondaryName}
				</p>{/if}</th
		>
		<td class="text-center">{triggerTypeMap[data.Drill]}</td>
		<td class="text-center"
			><img
				class="mr-1 inline"
				src={buffIcon[data.Support]}
				alt={buffName[data.Support]}
			/>{buffName[data.Support]}</td
		>
		<td class="text-center">{patchCodes[data.Patch.toLowerCase()]}</td>
		<td class="text-center"
			><img class="mr-1 inline" src={mainClass} alt={mainClassAlt} />{mainClassAlt}</td
		>
		<td class="text-center"
			><img class="mr-1 inline" src={subClass} alt={subClassAlt} />{subClassAlt}</td
		>
		<td class="text-center">{@html parsedWeapons}</td>
		<td class="text-center">{time}</td>
		<td
			><span class="flex items-center"
				><span
					style={PInfo['Submitter'].CSS}
					class="truncate transition ease-in-out hover:brightness-125"
					on:click={openRunMessage}>{PInfo['Submitter'].PrimaryName}</span
				></span
			>{#if PInfo['Submitter'].SecondaryName != null && Number(data.SubmitterID) != 106 && Number(data.SubmitterID) != 107}<p
					class="mt-1 text-xs"
				>
					{PInfo['Submitter'].SecondaryName}
				</p>{/if}</td
		>
		<td class="text-center">{subTime}</td>
		<td class="text-center">{@html notes}</td>
	</tr>
{/if}
