<script lang="ts">
	import { onMount } from 'svelte';

	export let playerName: string;
	export let characterName: string;
	export let runCharacterName: string;
	export let time: string;
	export let mainClass: string;
	let mainClassAlt: string;
	export let category: string;
	export let rank: number;
	export let namePref: number;
	export let nameType: number;
	export let nameC1: string;
	export let nameC2: string;
	export let PID: number;

	let cssOutput: string;

	let primaryNameOutput: string;
	let secondaryNameOutput: string | null;

	onMount(async () => {
		const timeSplit = time.split(':');
		generateNames();
		time = timeSplit[0] + 'm ' + timeSplit[1] + 's';
		mainClassAlt = mainClass.charAt(0).toUpperCase() + mainClass.slice(1).toLowerCase();
		mainClass = generateClassImages(mainClass);
		category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
	});

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
		}
		if (primaryNameOutput == secondaryNameOutput) {
			secondaryNameOutput = null;
		}
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
</script>

<tr class="hover border-t border-t-secondary/20">
	<td
		><span class="flex items-center"
			><img class="mr-1 inline" src={mainClass} alt={mainClassAlt} /><span
				style={cssOutput}
				class="truncate">{primaryNameOutput}</span
			></span
		>{#if secondaryNameOutput != null && PID != (106 || 107)}<p class="mt-1 text-xs">
				{secondaryNameOutput}
			</p>{/if}</td
	>
	<td class="text-center">{time}</td>
	<td class="text-center">{category} (R.{rank})</td>
</tr>
