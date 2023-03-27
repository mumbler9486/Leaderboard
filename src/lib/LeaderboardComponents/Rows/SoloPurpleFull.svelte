<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let runID: number;
	export let playerName: string;
	export let characterName: string;
	export let runCharacterName: string;
	export let time: string;
	export let mainClass: string;
	export let subClass: string;
	let mainClassAlt: string;
	let subClassAlt: string;
	export let namePref: number;
	export let nameType: number;
	export let nameC1: string;
	export let nameC2: string;
	export let PID: number;
	export let weapons: string;
	let parsedWeapons: string;
	export let flag: string;
	export let myRank: string;
	export let notes: string;
	let videoAlert: string;
	export let link: string;
	export let ship: string;
	export let inServer: string;
	export let videoTag: string;

	let shipOutput: string;

	let linkOutput: string;

	let cssOutput: string;

	let primaryNameOutput: string;
	let secondaryNameOutput: string | null;
	let rankOutput: string;

	onMount(async () => {
		const timeSplit = time.split(':');
		generateNames();
		generateRanking();
		generateWeaponImages(weapons, PID);
		notes = noteGenerate(notes);
		flag = flagGenerate(flag);
		videoAlert = videoAlertGenerate(videoTag);
		linkOutput = linkGenerate(link);
		shipOutput = shipGenerate(ship);
		time = timeSplit[0] + 'm ' + timeSplit[1] + 's';
		mainClassAlt = pickClassName(mainClass);
		mainClass = generateClassImages(mainClass);
		subClassAlt = pickClassName(subClass);
		subClass = generateClassImages(subClass);
	});

	function openRunMessage() {
		dispatch('openRunInfo', {
			runID: runID
		});
	}

	function linkGenerate(link) {
		return (
			`<a href="` +
			link +
			`" target="_blank" rel="noreferrer noopener" class="link link-accent no-underline"><i class="bi bi-youtube"></i> Link</a>`
		);
	}

	function generateRanking() {
		if (myRank === 1) {
			rankOutput = `<img class="max-w-none inline object-none w-[16px]" src="/icons/leaderboard/gold-1.png" alt="1">`;
		}
		if (myRank === 2) {
			rankOutput = `<img class="max-w-none inline object-none w-[16px]" src="/icons/leaderboard/silver-2.png" alt="2">`;
		}
		if (myRank === 3) {
			rankOutput = `<img class="max-w-none inline object-none w-[16px]" src="/icons/leaderboard/bronze-3.png" alt="3">`;
		}
		if (myRank > 3) {
			rankOutput = myRank;
		}
	}

	function shipGenerate(ship) {
		var smile = '';
		if (ship != null && ship != '' && inServer != null && inServer != '') {
			var serverref = inServer.toLowerCase();
			if (serverref != 'global') {
				switch (serverref) {
					case 'jp':
						serverref = 'japan';
						break;
					case 'japan':
						break;
					case 'jpn':
						serverref = 'japan';
						break;
				}
			}
			var iconref = 'ship' + ship + '-' + serverref;
			smile =
				'<img src="/icons/ships/' +
				iconref +
				'.png" class="mr-1 inline object-center object-none">';
		}
		return smile;
	}

	function flagGenerate(flag) {
		var smile = '';
		// If we do have a flag, go ahead and generate.
		if (flag != null && flag != '') {
			smile = `<span class="fi fi-` + flag + `" style="max-height:16px;min-width: 25px;"></span>`;
		}

		return smile;
	}

	function noteGenerate(note) {
		var smile = '';
		if (note != null && note != '') {
			smile = `<i class="bi bi-sticky"></i>`;
		}
		return smile;
	}

	function videoAlertGenerate(videoMod) {
		//console.log(videoMod);
		var smile = '';
		if (videoMod != null && videoMod != '' && videoMod != 'none') {
			if (videoMod == 'partial') {
				smile = `<div class="tooltip tooltip-warning tooltip-left font-semibold" data-tip="Footage Incomplete"><i class="bi bi-scissors"></i></div>`;
			}
			if (videoMod == 'novideo') {
				smile = `<div class="tooltip tooltip-error tooltip-left font-semibold" data-tip="Video Unavailable"><i class="bi bi-camera-video-off"></i></div>`;
			}
			if (videoMod == 'lowquality') {
				smile = `<div class="tooltip tooltip-warning tooltip-left font-semibold" data-tip="Low Video Quality"><i class="bi bi-film"></i></div>`;
			}
		}
		return smile;
	}

	function generateWeaponImages(input, id) {
		const input2 = input.toLowerCase();
		var inputArray = input2.split(' ');
		////console.log(inputArray);
		let result = '';
		inputArray.forEach((weapon) => {
			switch (weapon) {
				case 'sword':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.sword') +
						'"><img src="/icons/weapon/weapon-sword.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'wl':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.wired_lance') +
						'"><img src="/icons/weapon/weapon-wire.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'partisan':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.partisan') +
						'"><img src="/icons/weapon/weapon-partisan.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'td':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.twin_daggers') +
						'"><img src="/icons/weapon/weapon-daggers.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'ds':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.double_saber') +
						'"><img src="/icons/weapon/weapon-saber.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'knuckles':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.knuckles') +
						'"><img src="/icons/weapon/weapon-knux.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'katana':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.katana') +
						'"><img src="/icons/weapon/weapon-katana.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'sb':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.soaring_blades') +
						'"><img src="/icons/weapon/weapon-blades.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'rifle':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.rifle') +
						'"><img src="/icons/weapon/weapon-rifle.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'launcher':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.launcher') +
						'"><img src="/icons/weapon/weapon-launcher.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'tmg':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.tmgs') +
						'"><img src="/icons/weapon/weapon-tmg.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'bow':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.bow') +
						'"><img src="/icons/weapon/weapon-bow.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'rod':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.rod') +
						'"><img src="/icons/weapon/weapon-rod.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'talis':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.talis') +
						'"><img src="/icons/weapon/weapon-talis.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'wand':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.wand') +
						'"><img src="/icons/weapon/weapon-wand.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'jb':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.jet_boots') +
						'"><img src="/icons/weapon/weapon-boots.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'takt':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.takt') +
						'"><img src="/icons/weapon/weapon-takt.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				case 'gunblade':
					result =
						result +
						'<div class="tooltip tooltip-info font-semibold" data-tip="' +
						$t('common.weapons.gunblade') +
						'"><img src="/icons/weapon/weapon-gunblade.png" class="inline object-none w-[16px]"></div>' +
						' ';
					break;
				default:
					return '';
					break;
			}
		});
		parsedWeapons = result;
	}

	function generateNames() {
		switch (namePref) {
			// Main Character Name
			case 1:
				primaryNameOutput = characterName;
				secondaryNameOutput = runCharacterName;
				break;
			// Run Character Name
			case 2:
				primaryNameOutput = runCharacterName;
				secondaryNameOutput = playerName;
				break;
			// Player Name
			default:
				primaryNameOutput = playerName;
				secondaryNameOutput = runCharacterName;
				break;
		}
		if (PID != (106 || 107)) {
			cssOutput = `font-weight: bold; `;
			switch (nameType) {
				case 1:
					cssOutput += `color: #` + nameC1 + `;`;
					break;
				case 2:
					cssOutput +=
						`background: -webkit-linear-gradient(0deg, #` +
						nameC1 +
						`, #` +
						nameC2 +
						`);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
					break;
				case 3:
					cssOutput +=
						`color: #` +
						nameC2 +
						`; text-shadow: 0px 0px 5px #` +
						nameC1 +
						`, 0px 0px 5px #` +
						nameC1 +
						`, 0px 0px 5px #` +
						nameC1 +
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
	}

	function generateClassImages(input: string) {
		const input2 = input.toLowerCase();
		switch (input2) {
			case 'hunter':
				return '/icons/class/class-hunter.png';
				break;
			case 'fighter':
				return '/icons/class/class-fighter.png';
				break;
			case 'ranger':
				return '/icons/class/class-ranger.png';
				break;
			case 'gunner':
				return '/icons/class/class-gunner.png';
				break;
			case 'force':
				return '/icons/class/class-force.png';
				break;
			case 'techter':
				return '/icons/class/class-techter.png';
				break;
			case 'braver':
				return '/icons/class/class-braver.png';
				break;
			case 'bouncer':
				return '/icons/class/class-bouncer.png';
				break;
			case 'waker':
				return '/icons/class/class-waker.png';
				break;
			case 'gunblade-placeholder':
				return '/icons/class/class-gunblade.png';
				break;
			case '?':
				return '/icons/class/class-unknown.png';
				break;
			default:
				return '';
				break;
		}
	}

	function pickClassName(input: string) {
		const input2 = input.toLowerCase();
		switch (input2) {
			case 'hunter':
				return $t('common.classes.hunter');
				break;
			case 'fighter':
				return $t('common.classes.fighter');
				break;
			case 'ranger':
				return $t('common.classes.ranger');
				break;
			case 'gunner':
				return $t('common.classes.gunner');
				break;
			case 'force':
				return $t('common.classes.force');
				break;
			case 'techter':
				return $t('common.classes.techter');
				break;
			case 'braver':
				return $t('common.classes.braver');
				break;
			case 'bouncer':
				return $t('common.classes.bouncer');
				break;
			case 'waker':
				return $t('common.classes.waker');
				break;
			case 'gunblade-placeholder':
				return $t('common.classes.placeholder_gunblade');
				break;
			case '?':
				return $t('shared.unknown');
				break;
			default:
				return '';
				break;
		}
	}
</script>

<tr class="hover border-t border-t-secondary/20">
	<th class="text-center font-bold">{@html rankOutput}</th>
	<td
		><span class="flex items-center"
			>{@html flag}{@html shipOutput}<span
				style={cssOutput}
				class="truncate transition ease-in-out hover:brightness-125"
				on:click={openRunMessage}>{primaryNameOutput}</span
			></span
		>{#if secondaryNameOutput != null && PID != (106 || 107)}<p class="mt-1 text-xs">
				{secondaryNameOutput}
			</p>{/if}</td
	>
	<td class="text-center"
		><img class="mr-1 inline" src={mainClass} alt={mainClassAlt} />{mainClassAlt}</td
	>
	<td class="text-center"
		><img class="mr-1 inline" src={subClass} alt={subClassAlt} />{subClassAlt}</td
	>
	<td class="text-center">{@html parsedWeapons}</td>
	<td class="text-center">{time}</td>
	<td class="text-center">{@html linkOutput}</td>
	<td class="text-center">{@html videoAlert}</td>
	<td class="text-center">{@html notes}</td>
</tr>
