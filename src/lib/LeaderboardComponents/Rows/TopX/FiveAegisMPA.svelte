<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data: string;
	var timeMapped: string;

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
		const timeSplit = data.shared.Time.split(':');
		generatePlayer(data.p1);
		generatePlayer(data.p2);
		generatePlayer(data.p3);
		generatePlayer(data.p4);
		generatePlayer(data.p5);
		generatePlayer(data.p6);
		generatePlayer(data.p7);
		generatePlayer(data.p8);

		timeMapped = timeSplit[0] == '00' ? '' : timeSplit[0] + 'h ';
		timeMapped += timeSplit[1] + 'm ' + timeSplit[2] + 's';
	});

	function generatePlayer(player) {
		generateNames(player);
		player.Ready = true;
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
		player.CSS += ``;
	}
</script>

{#if data.p1.Ready && data.p2.Ready && data.p3.Ready && data.p4.Ready && data.p5.Ready && data.p6.Ready && data.p7.Ready && data.p8.Ready}
	<tr class="hover border-t border-t-secondary/20">
		<th>
			<p>
				<span class="flex items-center"
					><img
						class="mr-1 inline"
						src={classIconMap[data.p1.MainClass]}
						alt={classNameMap[data.p1.MainClass]}
					/><span style={data.p1.CSS} class="truncate">{data.p1.PrimaryName}</span></span
				>{#if data.p1.SecondaryName != null && data.p1.PlayerID != (106 || 107)}<p
						class="mt-1 text-xs"
					>
						{data.p1.SecondaryName}
					</p>{/if}
			</p>
			<p class="mt-2">
				<span class="flex items-center"
					><img
						class="mr-1 inline"
						src={classIconMap[data.p2.MainClass]}
						alt={classNameMap[data.p2.MainClass]}
					/><span style={data.p2.CSS} class="truncate">{data.p2.PrimaryName}</span></span
				>{#if data.p2.SecondaryName != null && data.p2.PlayerID != (106 || 107)}<p
						class="mt-1 text-xs"
					>
						{data.p2.SecondaryName}
					</p>{/if}
			</p>
			<p class="mt-2">
				<span class="flex items-center"
					><img
						class="mr-1 inline"
						src={classIconMap[data.p3.MainClass]}
						alt={classNameMap[data.p3.MainClass]}
					/><span style={data.p3.CSS} class="truncate">{data.p3.PrimaryName}</span></span
				>{#if data.p3.SecondaryName != null && data.p3.PlayerID != (106 || 107)}<p
						class="mt-1 text-xs"
					>
						{data.p3.SecondaryName}
					</p>{/if}
			</p>
			<p class="mt-2">
				<span class="flex items-center"
					><img
						class="mr-1 inline"
						src={classIconMap[data.p4.MainClass]}
						alt={classNameMap[data.p4.MainClass]}
					/><span style={data.p4.CSS} class="truncate">{data.p4.PrimaryName}</span></span
				>{#if data.p4.SecondaryName != null && data.p4.PlayerID != (106 || 107)}<p
						class="mt-1 text-xs"
					>
						{data.p4.SecondaryName}
					</p>{/if}
			</p>
			<p class="mt-2">
				<span class="flex items-center"
					><img
						class="mr-1 inline"
						src={classIconMap[data.p5.MainClass]}
						alt={classNameMap[data.p5.MainClass]}
					/><span style={data.p5.CSS} class="truncate">{data.p5.PrimaryName}</span></span
				>{#if data.p5.SecondaryName != null && data.p5.PlayerID != (106 || 107)}<p
						class="mt-1 text-xs"
					>
						{data.p5.SecondaryName}
					</p>{/if}
			</p>
			<p class="mt-2">
				<span class="flex items-center"
					><img
						class="mr-1 inline"
						src={classIconMap[data.p6.MainClass]}
						alt={classNameMap[data.p6.MainClass]}
					/><span style={data.p6.CSS} class="truncate">{data.p6.PrimaryName}</span></span
				>{#if data.p6.SecondaryName != null && data.p6.PlayerID != (106 || 107)}<p
						class="mt-1 text-xs"
					>
						{data.p6.SecondaryName}
					</p>{/if}
			</p>
			<p class="mt-2">
				<span class="flex items-center"
					><img
						class="mr-1 inline"
						src={classIconMap[data.p7.MainClass]}
						alt={classNameMap[data.p7.MainClass]}
					/><span style={data.p7.CSS} class="truncate">{data.p7.PrimaryName}</span></span
				>{#if data.p7.SecondaryName != null && data.p7.PlayerID != (106 || 107)}<p
						class="mt-1 text-xs"
					>
						{data.p7.SecondaryName}
					</p>{/if}
			</p>
			<p class="mt-2">
				<span class="flex items-center"
					><img
						class="mr-1 inline"
						src={classIconMap[data.p8.MainClass]}
						alt={classNameMap[data.p8.MainClass]}
					/><span style={data.p8.CSS} class="truncate">{data.p8.PrimaryName}</span></span
				>{#if data.p8.SecondaryName != null && data.p8.PlayerID != (106 || 107)}<p
						class="mt-1 text-xs"
					>
						{data.p8.SecondaryName}
					</p>{/if}
			</p>
		</th>
		<td class="text-center">{timeMapped}</td>
		<td class="text-center"
			><p>
				<img
					class="mr-1 inline"
					src={buffIcon[data.shared.Buff]}
					alt={buffName[data.shared.Buff]}
				/>
			</p>
			<p><span>{buffName[data.shared.Buff]}</span></p></td
		>
	</tr>
{/if}
