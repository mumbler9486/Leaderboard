<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data;
	var timeMapped: string;
	let notes;
	let subTime;

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

	const patchCodes = {
		['60r']: '+60 Release',
		['slayer']: 'Slayer'
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
		generatePlayer(data.sub);
		subTime =
			new Date(data.shared.SubmissionTime).toDateString() +
			' @ ' +
			new Date(data.shared.SubmissionTime).toTimeString().slice(0, 8);
		notes = noteGenerate(data.shared.notes);
		timeMapped = timeSplit[0] + 'h ' + timeSplit[1] + 'm ' + timeSplit[2] + 's';
	});

	function openRunMessage() {
		dispatch('openRunInfo', {
			Data: data
		});
	}

	function generatePlayer(player) {
		generateNames(player);
		player.Ready = true;
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
			case 1:
				player.PrimaryName = player.CharacterName;
				player.SecondaryName = player.RunCharacterName;
				break;
			// Run Character Name
			case 2:
				player.PrimaryName = player.RunCharacterName;
				player.SecondaryName = player.PlayerName;
				break;
			// Player Name
			default:
				player.PrimaryName = player.PlayerName;
				player.SecondaryName = player.RunCharacterName;
				break;
		}
		if (player.PlayerID != ('107' || '106')) {
			player.CSS = `font-weight: bold; `;
			switch (player.NameType) {
				case 1:
					player.CSS += `color: #` + player.NameColor1 + `;`;
					break;
				case 2:
					player.CSS +=
						`background: -webkit-linear-gradient(0deg, #` +
						player.NameColor1 +
						`, #` +
						player.NameColor2 +
						`);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
					break;
				case 3:
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

{#if data.p1.Ready && data.p2.Ready && data.p3.Ready && data.p4.Ready && data.p5.Ready && data.p6.Ready && data.p7.Ready && data.p8.Ready}
	<tr class="hover border-t border-t-secondary/20">
		<th>
			<p>
				<span class="flex items-center"
					><span
						style={data.p1.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{data.p1.PrimaryName}</span
					>{#if data.p1.SecondaryName != null && data.p1.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({data.p1.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					><span
						style={data.p2.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{data.p2.PrimaryName}</span
					>{#if data.p2.SecondaryName != null && data.p2.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({data.p2.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					><span
						style={data.p3.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{data.p3.PrimaryName}</span
					>{#if data.p3.SecondaryName != null && data.p3.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({data.p3.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					><span
						style={data.p4.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{data.p4.PrimaryName}</span
					>{#if data.p4.SecondaryName != null && data.p4.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({data.p4.SecondaryName})
						</p>{/if}</span
				>
			</p>

			<p class="mt-1">
				<span class="flex items-center"
					><span
						style={data.p5.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{data.p5.PrimaryName}</span
					>{#if data.p5.SecondaryName != null && data.p5.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({data.p5.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					><span
						style={data.p6.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{data.p6.PrimaryName}</span
					>{#if data.p6.SecondaryName != null && data.p6.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({data.p6.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					><span
						style={data.p7.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{data.p7.PrimaryName}</span
					>{#if data.p7.SecondaryName != null && data.p7.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({data.p7.SecondaryName})
						</p>{/if}</span
				>
			</p>
			<p class="mt-1">
				<span class="flex items-center"
					><span
						style={data.p8.CSS}
						class="truncate transition ease-in-out hover:brightness-125"
						on:click={openRunMessage}>{data.p8.PrimaryName}</span
					>{#if data.p8.SecondaryName != null && data.p8.PlayerID != ('106' || '107')}<p
							class="ml-1 truncate text-xs"
						>
							({data.p8.SecondaryName})
						</p>{/if}</span
				>
			</p>
		</th>
		<td class="text-center">{triggerTypeMap[data.shared.Drill]}</td>
		<td class="text-center"
			><img
				class="mr-1 inline"
				src={buffIcon[data.shared.Buff]}
				alt={buffName[data.shared.Buff]}
			/>{buffName[data.shared.Buff]}</td
		>
		<td class="text-center">{patchCodes[data.shared.Patch.toLowerCase()]}</td>
		<td class="text-center">
			<p>
				<img
					class="mr-1 inline"
					src={classIconMap[data.p1.MainClass.toLowerCase()]}
					alt={classNameMap[data.p1.MainClass.toLowerCase()]}
				/>{classNameMap[data.p1.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p2.MainClass.toLowerCase()]}
					alt={classNameMap[data.p2.MainClass.toLowerCase()]}
				/>{classNameMap[data.p2.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p3.MainClass.toLowerCase()]}
					alt={classNameMap[data.p3.MainClass.toLowerCase()]}
				/>{classNameMap[data.p3.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p4.MainClass.toLowerCase()]}
					alt={classNameMap[data.p4.MainClass.toLowerCase()]}
				/>{classNameMap[data.p4.MainClass.toLowerCase()]}
			</p>

			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p5.MainClass.toLowerCase()]}
					alt={classNameMap[data.p5.MainClass.toLowerCase()]}
				/>{classNameMap[data.p5.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p6.MainClass.toLowerCase()]}
					alt={classNameMap[data.p6.MainClass.toLowerCase()]}
				/>{classNameMap[data.p6.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p7.MainClass.toLowerCase()]}
					alt={classNameMap[data.p7.MainClass.toLowerCase()]}
				/>{classNameMap[data.p7.MainClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p8.MainClass.toLowerCase()]}
					alt={classNameMap[data.p8.MainClass.toLowerCase()]}
				/>{classNameMap[data.p8.MainClass.toLowerCase()]}
			</p>
		</td>
		<td class="text-center">
			<p>
				<img
					class="mr-1 inline"
					src={classIconMap[data.p1.SubClass.toLowerCase()]}
					alt={classNameMap[data.p1.SubClass.toLowerCase()]}
				/>{classNameMap[data.p1.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p2.SubClass.toLowerCase()]}
					alt={classNameMap[data.p2.SubClass.toLowerCase()]}
				/>{classNameMap[data.p2.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p3.SubClass.toLowerCase()]}
					alt={classNameMap[data.p3.SubClass.toLowerCase()]}
				/>{classNameMap[data.p3.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p4.SubClass.toLowerCase()]}
					alt={classNameMap[data.p4.SubClass.toLowerCase()]}
				/>{classNameMap[data.p4.SubClass.toLowerCase()]}
			</p>

			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p5.SubClass.toLowerCase()]}
					alt={classNameMap[data.p5.SubClass.toLowerCase()]}
				/>{classNameMap[data.p5.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p6.SubClass.toLowerCase()]}
					alt={classNameMap[data.p6.SubClass.toLowerCase()]}
				/>{classNameMap[data.p6.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p7.SubClass.toLowerCase()]}
					alt={classNameMap[data.p7.SubClass.toLowerCase()]}
				/>{classNameMap[data.p7.SubClass.toLowerCase()]}
			</p>
			<p class="mt-1">
				<img
					class="mr-1 inline"
					src={classIconMap[data.p8.SubClass.toLowerCase()]}
					alt={classNameMap[data.p8.SubClass.toLowerCase()]}
				/>{classNameMap[data.p8.SubClass.toLowerCase()]}
			</p>
		</td>
		<td class="text-center">{timeMapped}</td>
		<td
			><span class="flex items-center"
				><span
					style={data.sub.CSS}
					class="truncate transition ease-in-out hover:brightness-125"
					on:click={openRunMessage}>{data.sub.PrimaryName}</span
				></span
			>{#if data.sub.SecondaryName != null && Number(data.SubmitterID) != 106 && Number(data.SubmitterID) != 107}<p
					class="mt-1 text-xs"
				>
					{data.sub.SecondaryName}
				</p>{/if}</td
		>
		<td class="text-center">{subTime}</td>
		<td class="text-center">{@html notes}</td>
	</tr>
{/if}
