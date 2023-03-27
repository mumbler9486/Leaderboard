<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let time: string;
	var timeMapped: string;
	export let runID: number;
	export let notes: string;
	export let buff: string;
	export let myRank: number;
	export let player1;
	export let player2;
	export let player3;
	export let player4;
	export let player5;
	export let player6;
	export let player7;
	export let player8;

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
		generatePlayer(player3);
		generatePlayer(player4);
		generatePlayer(player5);
		generatePlayer(player6);
		generatePlayer(player7);
		generatePlayer(player8);
		notes = noteGenerate(notes);

		timeMapped = timeSplit[0] == '00' ? '' : timeSplit[0] + 'h ';
		timeMapped += timeSplit[1] + 'm ' + timeSplit[2] + 's';
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
		if (player.NameColor1 == null) {
			player.NameColor1 == 'ffffff';
		}
		if (player.NameColor2 == null) {
			player.NameColor2 == 'ffffff';
		}
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
</script>

{#if player1.Ready && player2.Ready && player3.Ready && player4.Ready && player5.Ready && player6.Ready && player7.Ready && player8.Ready}
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
			<p class="mt-1">
				<span class="flex items-center"
					>{@html player3.FlagImage}{@html player3.ShipImage}<span
						style={player3.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{player3.PrimaryName}</span
					>{#if player3.SecondaryName != null && player3.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({player3.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					>{@html player4.FlagImage}{@html player4.ShipImage}<span
						style={player4.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{player4.PrimaryName}</span
					>{#if player4.SecondaryName != null && player4.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({player4.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					>{@html player5.FlagImage}{@html player5.ShipImage}<span
						style={player5.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{player5.PrimaryName}</span
					>{#if player5.SecondaryName != null && player5.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({player5.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					>{@html player6.FlagImage}{@html player6.ShipImage}<span
						style={player6.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{player6.PrimaryName}</span
					>{#if player6.SecondaryName != null && player6.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({player6.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					>{@html player7.FlagImage}{@html player7.ShipImage}<span
						style={player7.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{player7.PrimaryName}</span
					>{#if player7.SecondaryName != null && player7.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({player7.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					>{@html player8.FlagImage}{@html player8.ShipImage}<span
						style={player8.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{player8.PrimaryName}</span
					>{#if player8.SecondaryName != null && player8.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({player8.SecondaryName})
						</p>{/if}</span
				>
			</p>
		</td>
		<td class="text-center font-bold"
			><img class="mr-1 inline" src={buffIcon[buff]} alt={buffName[buff]} />{buffName[buff]}</td
		>
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
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player3.MainClass.toLowerCase()]}
					alt={classNameMap[player3.MainClass.toLowerCase()]}
				/>{classNameMap[player3.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player4.MainClass.toLowerCase()]}
					alt={classNameMap[player4.MainClass.toLowerCase()]}
				/>{classNameMap[player4.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player5.MainClass.toLowerCase()]}
					alt={classNameMap[player5.MainClass.toLowerCase()]}
				/>{classNameMap[player5.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player6.MainClass.toLowerCase()]}
					alt={classNameMap[player6.MainClass.toLowerCase()]}
				/>{classNameMap[player6.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player7.MainClass.toLowerCase()]}
					alt={classNameMap[player7.MainClass.toLowerCase()]}
				/>{classNameMap[player7.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player8.MainClass.toLowerCase()]}
					alt={classNameMap[player8.MainClass.toLowerCase()]}
				/>{classNameMap[player8.MainClass.toLowerCase()]}
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
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player3.SubClass.toLowerCase()]}
					alt={classNameMap[player3.SubClass.toLowerCase()]}
				/>{classNameMap[player3.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player4.SubClass.toLowerCase()]}
					alt={classNameMap[player4.SubClass.toLowerCase()]}
				/>{classNameMap[player4.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player5.SubClass.toLowerCase()]}
					alt={classNameMap[player5.SubClass.toLowerCase()]}
				/>{classNameMap[player5.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player6.SubClass.toLowerCase()]}
					alt={classNameMap[player6.SubClass.toLowerCase()]}
				/>{classNameMap[player6.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player7.SubClass.toLowerCase()]}
					alt={classNameMap[player7.SubClass.toLowerCase()]}
				/>{classNameMap[player7.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[player8.SubClass.toLowerCase()]}
					alt={classNameMap[player8.SubClass.toLowerCase()]}
				/>{classNameMap[player8.SubClass.toLowerCase()]}
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
				{#if player3.LinkPOV != null && player3.LinkPOV != ''}
					{@html player3.LinkReference}
				{:else}
					<span class="text-base-content/50">No POV</span>
				{/if}
			</p>
			<p class="mt-1">
				{#if player4.LinkPOV != null && player4.LinkPOV != ''}
					{@html player4.LinkReference}
				{:else}
					<span class="text-base-content/50">No POV</span>
				{/if}
			</p>
			<p class="mt-1">
				{#if player5.LinkPOV != null && player5.LinkPOV != ''}
					{@html player5.LinkReference}
				{:else}
					<span class="text-base-content/50">No POV</span>
				{/if}
			</p>
			<p class="mt-1">
				{#if player6.LinkPOV != null && player6.LinkPOV != ''}
					{@html player6.LinkReference}
				{:else}
					<span class="text-base-content/50">No POV</span>
				{/if}
			</p>
			<p class="mt-1">
				{#if player7.LinkPOV != null && player7.LinkPOV != ''}
					{@html player7.LinkReference}
				{:else}
					<span class="text-base-content/50">No POV</span>
				{/if}
			</p>
			<p class="mt-1">
				{#if player7.LinkPOV != null && player7.LinkPOV != ''}
					{@html player7.LinkReference}
				{:else}
					<span class="text-base-content/50">No POV</span>
				{/if}
			</p>
			<p class="mt-1">
				{#if player8.LinkPOV != null && player8.LinkPOV != ''}
					{@html player8.LinkReference}
				{:else}
					<span class="text-base-content/50">No POV</span>
				{/if}
			</p>
		</td>
		<td class="text-center">{@html notes}</td>
	</tr>
{/if}
