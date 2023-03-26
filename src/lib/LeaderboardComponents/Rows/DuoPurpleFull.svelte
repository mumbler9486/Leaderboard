<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let time: string;
	var timeMapped: string;
	export let runID: number;
	export let notes: string;
	export let myRank: number;
	export let player1;
	export let player2;

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
		['?']: 'Unknown'
	} as { [id: string]: string };

	let rankOutput: string;

	onMount(async () => {
		const timeSplit = time.split(':');
		generateRanking();
		generatePlayer(player1);
		generatePlayer(player2);
		notes = noteGenerate(notes);
		timeMapped = timeSplit[0] + 'm ' + timeSplit[1] + 's';
	});

	function openRunMessage() {
		dispatch('openRunInfo', {
			runID: runID
		});
	}

	function generatePlayer(player) {
		generateNames(player);
		player.FlagImage = flagGenerate(player.Flag);
		player.ShipImage = shipGenerate(player.Ship, player.Server);
		player.MainClassName = pickClassName(player.MainClass);
		player.MainClassImage = generateClassImages(player.MainClass);
		player.SubClassName = pickClassName(player.SubClass);
		player.SubClassImage = generateClassImages(player.SubClass);
		player.LinkReference = linkGenerate(player.LinkPOV);
		player.Ready = true;
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
			rankOutput = myRank.toString();
		}
	}

	function shipGenerate(ship, inServer) {
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

	function generateNames(player) {
		switch (player.PreferredName) {
			// Main Character Name
			case '1':
				player.PrimaryName = player.CharacterName;
				player.SecondaryName = player.RunCharacterName;
				break;
			// Run Character Name
			case '2':
				player.PrimaryName = player.RunCharacterName;
				player.SecondaryName = player.PlayerName;
				break;
			// Player Name
			default:
				player.PrimaryName = player.PlayerName;
				player.SecondaryName = player.RunCharacterName;
				break;
		}
		if (player.PlayerID != ('106' || '107')) {
			player.CSS = `font-weight: bold; `;
			switch (player.NameType) {
				case '1':
					player.CSS += `color: #` + player.NameColor1 + `;`;
					break;
				case '2':
					player.CSS +=
						`background: -webkit-linear-gradient(0deg, #` +
						player.NameColor1 +
						`, #` +
						player.NameColor2 +
						`);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
					break;
				case '3':
					player.CSS +=
						`color: #` +
						player.NameColor2 +
						`; text-shadow: 0px 0px 5px #` +
						player.NameColor1 +
						`, 0px 0px 5px #` +
						player.NameColor1 +
						`, 0px 0px 5px #` +
						player.NameColor1 +
						`;`;
					break;
				default:
					break;
			}
		} else {
			player.CSS = ``;
		}
		if (player.PrimaryName == player.SecondaryName) {
			player.SecondaryName = null;
		}
		player.CSS += `cursor: pointer;`;
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

{#if player1.Ready && player2.Ready}
	<tr class="hover border-t border-t-secondary/20">
		<th class="text-center font-bold">{@html rankOutput}</th>
		<td>
			<p>
				<span class="flex items-center"
					>{@html player1.FlagImage}{@html player1.ShipImage}<span
						style={player1.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{player1.PrimaryName}</span
					>{#if player1.SecondaryName != null && player1.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({player1.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					>{@html player2.FlagImage}{@html player2.ShipImage}<span
						style={player2.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{player2.PrimaryName}</span
					>{#if player2.SecondaryName != null && player2.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({player2.SecondaryName})
						</p>{/if}</span
				>
			</p>
		</td>
		<td class="text-center">
			<p>
				<img
					class="mr-1 inline"
					src={classIconMap[player1.MainClass.toLowerCase()]}
					alt={classNameMap[player1.MainClass.toLowerCase()]}
				/>{classNameMap[player1.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player2.MainClass.toLowerCase()]}
					alt={classNameMap[player2.MainClass.toLowerCase()]}
				/>{classNameMap[player2.MainClass.toLowerCase()]}
			</p>
		</td>
		<td class="text-center">
			<p>
				<img
					class="mr-1 inline"
					src={classIconMap[player1.SubClass.toLowerCase()]}
					alt={classNameMap[player1.SubClass.toLowerCase()]}
				/>{classNameMap[player1.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player2.SubClass.toLowerCase()]}
					alt={classNameMap[player2.SubClass.toLowerCase()]}
				/>{classNameMap[player2.SubClass.toLowerCase()]}
			</p>
		</td>
		<td class="text-center">{timeMapped}</td>
		<td class="text-center">
			<p>
				{#if player1.LinkPOV != null && player1.LinkPOV != ''}
					{@html player1.LinkReference}
				{:else}
					No POV
				{/if}
			</p>
			<p class="mt-1">
				{#if player2.LinkPOV != null && player2.LinkPOV != ''}
					{@html player2.LinkReference}
				{:else}
					<span class="text-base-content/50">No POV</span>
				{/if}
			</p>
		</td>
		<td class="text-center">{@html notes}</td>
	</tr>
{/if}
