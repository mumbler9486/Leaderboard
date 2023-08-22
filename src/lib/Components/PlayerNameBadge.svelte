<script context="module" lang="ts">
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
		nameColor2: undefined
	});
</script>

<script lang="ts">
	import { countriesMap } from '$lib/types/api/countries';
	import { NameStyle } from '$lib/types/api/players/nameStyle';
	import { PreferredName } from '$lib/types/api/players/preferredName';
	import { ServerRegion } from '$lib/types/api/serverRegions';
	import Tooltip from './Tooltip.svelte';

	export let player: PlayerNameDisplay | string | undefined;
	export let showLink: boolean = false;
	export let showShipFlag: boolean = true;

	let primaryName: string;
	let secondaryName: string;

	const unknownPlayerName = '<Unknown>';

	$: isPlayerAnon = !player || typeof player === 'string' || (!player.playerId ? true : false);
	$: playerNameDisplay = (() => {
		if (!player) {
			return stringToNameDisplay(unknownPlayerName);
		} else if (typeof player === 'string') {
			return stringToNameDisplay(player);
		}
		return player;
	})();
	$: playerLink = `/users/${playerNameDisplay.playerId}`;

	$: flagClass = playerNameDisplay.flag ? `fi fi-${playerNameDisplay.flag}` : '';
	$: countryName = playerNameDisplay?.flag
		? countriesMap[playerNameDisplay.flag.toUpperCase()].name ?? '<Unknown>'
		: undefined;
	$: shipImageUrl =
		playerNameDisplay.ship &&
		playerNameDisplay.serverRegion &&
		playerNameDisplay.serverRegion != ServerRegion.Unknown
			? `/icons/ships/ship${playerNameDisplay.ship}-${playerNameDisplay.serverRegion}.png`
			: '';

	$: nameColor1 = playerNameDisplay.nameColor1 ?? 'ffffff';
	$: nameColor2 = playerNameDisplay.nameColor2 ?? 'ffffff';
	$: playerNameStyle = getNameColorStyle(playerNameDisplay);
	$: setPlayerNames(playerNameDisplay);

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
</script>

<div class="flex items-center">
	{#if playerNameDisplay?.flag}
		<Tooltip class="flex" tip={countryName}>
			<span class="flag {flagClass}" />
		</Tooltip>
	{/if}
	{#if showShipFlag && playerNameDisplay.serverRegion && playerNameDisplay.ship}
		<img
			src={shipImageUrl}
			class="mr-1 object-none p-0"
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
			on:click
			on:keyup
		>
			{primaryName}
			{#if secondaryName && secondaryName != primaryName}
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
