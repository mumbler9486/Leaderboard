<script module lang="ts">
	export interface PlayerNameDisplay {
		playerId?: number;
		flag?: string;
		ship?: number;
		serverRegion?: ServerRegion;
		playerName: string;
		runCharacterName?: string;
		characterName: string | undefined;
		namePreference: PreferredName | undefined;
		nameEffectType: NameStyle | undefined;
		nameColor1?: string;
		nameColor2?: string;
	}

	const stringToNameDisplay = (name: string): PlayerNameDisplay => ({
		playerId: undefined,
		flag: undefined,
		ship: undefined,
		serverRegion: undefined,
		playerName: name,
		runCharacterName: '',
		characterName: '',
		namePreference: PreferredName.Player,
		nameEffectType: NameStyle.None,
		nameColor1: undefined,
		nameColor2: undefined,
	});
</script>

<script lang="ts">
	import { run, createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { countriesMap } from '$lib/types/api/countries';
	import { NameStyle } from '$lib/types/api/players/nameStyle';
	import { PreferredName } from '$lib/types/api/players/preferredName';
	import { ServerRegion } from '$lib/types/api/serverRegions';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		player: PlayerNameDisplay | string | undefined;
		showInGameName?: boolean;
		showLink?: boolean;
		showShipFlag?: boolean;
		size?: 'xs' | 'sm' | 'base' | 'lg';
	}

	let {
		player,
		showInGameName = true,
		showLink = false,
		showShipFlag = true,
		size = 'sm'
	}: Props = $props();

	let primaryName: string = $state();
	let secondaryName: string = $state();

	const unknownPlayerName = '<Unknown>';




	const setPlayerNames = (playerNameDisplay: PlayerNameDisplay) => {
		switch (playerNameDisplay.namePreference) {
			// Main Character Name
			case PreferredName.Character:
				primaryName = playerNameDisplay.characterName ?? '';
				secondaryName = playerNameDisplay.runCharacterName ?? '';
				break;
			// Player Name
			default:
				primaryName = playerNameDisplay.playerName;
				secondaryName = playerNameDisplay.runCharacterName ?? '';
				break;
		}
	};

	const getNameColorStyle = (playerNameDisplay: PlayerNameDisplay) => {
		switch (playerNameDisplay.nameEffectType) {
			case NameStyle.Solid:
				return `color: #${nameColor1};`;
			case NameStyle.Gradient:
				return `background: -webkit-linear-gradient(0deg, #${nameColor1}, #${nameColor2});
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;`;
			case NameStyle.Glow:
				return `color: #${nameColor2};
						text-shadow: 0px 0px 5px #${nameColor1}, 0px 0px 5px #${nameColor1}, 0px 0px 5px #${nameColor1};`;
			default:
				return '';
		}
	};
	let isPlayerAnon = $derived(!player || typeof player === 'string' || (!player.playerId ? true : false));
	let playerNameDisplay = $derived((() => {
		if (!player) {
			return stringToNameDisplay(unknownPlayerName);
		} else if (typeof player === 'string') {
			return stringToNameDisplay(player);
		}
		return player;
	})());
	let playerLink = $derived(`/users/${playerNameDisplay.playerId}`);
	let flagClass = $derived(playerNameDisplay.flag ? `fi fi-${playerNameDisplay.flag}` : '');
	let countryName = $derived(playerNameDisplay?.flag
		? countriesMap[playerNameDisplay.flag.toUpperCase()].name ?? '<Unknown>'
		: undefined);
	let shipImageUrl =
		$derived(playerNameDisplay.ship &&
		playerNameDisplay.serverRegion &&
		playerNameDisplay.serverRegion != ServerRegion.Unknown
			? `/icons/ships/ship${playerNameDisplay.ship}-${playerNameDisplay.serverRegion}.png`
			: '');
	let nameColor1 = $derived(playerNameDisplay.nameColor1 ?? 'ffffff');
	let nameColor2 = $derived(playerNameDisplay.nameColor2 ?? 'ffffff');
	let playerNameStyle = $derived(getNameColorStyle(playerNameDisplay));
	run(() => {
		setPlayerNames(playerNameDisplay);
	});
</script>

<div
	class="flex items-center"
	class:text-xs={size === 'xs'}
	class:text-sm={size === 'sm'}
	class:text-base={size === 'base'}
	class:text-lg={size === 'lg'}
>
	{#if playerNameDisplay?.flag}
		<Tooltip class="flex" tip={countryName}>
			<span class="flag {flagClass}"></span>
		</Tooltip>
	{/if}
	{#if showShipFlag && playerNameDisplay.serverRegion && playerNameDisplay.ship}
		<img
			src={shipImageUrl}
			class="pointer-events-none mr-1 object-none p-0"
			alt="ship{playerNameDisplay.ship}-{playerNameDisplay.serverRegion}"
		/>
	{/if}
	{#if showLink && !isPlayerAnon}
		<a href={playerLink} target="_blank" rel="noreferrer noopener" class="flex place-content-center"
			><p style={playerNameStyle} class="primary-name inline place-self-center">
				{primaryName}
			</p>
		</a>
	{:else}
		<span
			style={playerNameStyle}
			class="primary-name cursor-pointer truncate transition ease-in-out hover:brightness-125"
			onclick={bubble('click')}
			onkeyup={bubble('keyup')}
		>
			{primaryName}
			{#if showInGameName && secondaryName && secondaryName != primaryName}
				<p class="ml-1 truncate text-xs">
					({secondaryName})
				</p>
			{/if}
		</span>
	{/if}
</div>

<style scoped>
	.primary-name {
		font-weight: bold;
	}
	.flag {
		max-height: 16px;
		min-width: 25px;
	}
</style>
