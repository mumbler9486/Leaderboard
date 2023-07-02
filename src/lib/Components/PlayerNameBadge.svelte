<script context="module" lang="ts">
	export interface PlayerNameDisplay {
		playerId: number;
		flag: string | undefined;
		ship: number | undefined;
		region: string | undefined;
		playerName: string;
		runCharacterName: string;
		characterName: string | undefined;
		namePreference: number | undefined;
		nameType: number | undefined;
		nameColor1: string | undefined;
		nameColor2: string | undefined;
	}

	const stringToNameDisplay = (name: string): PlayerNameDisplay => ({
		playerId: 0,
		flag: '',
		ship: 0,
		region: '',
		playerName: name,
		runCharacterName: '',
		characterName: '',
		namePreference: 0,
		nameType: 0,
		nameColor1: '',
		nameColor2: ''
	});
</script>

<script lang="ts">
	export let player: PlayerNameDisplay | string | undefined;
	export let showLink: boolean = false;
	export let showShipFlag: boolean = true;

	let primaryName: string;
	let secondaryName: string;

	const unknownPlayerName = '<Unknown>';

	$: isGenericPlayer = !player || typeof player === 'string';
	$: playerNameDisplay =
		!player || typeof player === 'string'
			? stringToNameDisplay(player ?? unknownPlayerName)
			: player;
	$: playerLink = `/users?id=${playerNameDisplay.playerId}`;

	$: flagClass = playerNameDisplay.flag ? `fi fi-${playerNameDisplay.flag}` : '';
	$: shipImageUrl =
		playerNameDisplay.ship && playerNameDisplay.region
			? `/icons/ships/ship${playerNameDisplay.ship}-${playerNameDisplay.region}.png`
			: '';

	// TODO Refactor anon system
	const anonPlayerIds = [106, 107];
	$: isPlayerAnon = anonPlayerIds.includes(playerNameDisplay.playerId);

	$: nameColor1 = playerNameDisplay.nameColor1 ?? 'ffffff';
	$: nameColor2 = playerNameDisplay.nameColor2 ?? 'ffffff';
	$: playerNameStyle = getNameColorStyle(playerNameDisplay);
	$: setPlayerNames(playerNameDisplay);

	const setPlayerNames = (playerNameDisplay: PlayerNameDisplay) => {
		switch (playerNameDisplay.namePreference) {
			// Main Character Name
			case 1:
				primaryName = playerNameDisplay.characterName ?? '';
				secondaryName = playerNameDisplay.runCharacterName;
				break;
			// Run Character Name
			case 2:
				primaryName = playerNameDisplay.runCharacterName;
				secondaryName = playerNameDisplay.playerName;
				break;
			// Player Name
			default:
				primaryName = playerNameDisplay.playerName;
				secondaryName = playerNameDisplay.runCharacterName;
				break;
		}
	};

	const getNameColorStyle = (playerNameDisplay: PlayerNameDisplay) => {
		if (isPlayerAnon) {
			return '';
		}

		switch (playerNameDisplay.nameType) {
			case 1:
				return `color: #${nameColor1};`;
			case 2:
				return `background: -webkit-linear-gradient(0deg, #${nameColor1}, #${nameColor2});
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;`;
			case 3:
				return `color: #${nameColor2};
						text-shadow: 0px 0px 5px #${nameColor1}, 0px 0px 5px #${nameColor1}, 0px 0px 5px #${nameColor1};`;
			default:
				return '';
		}
	};
</script>

<div class="flex flex-row">
	{#if playerNameDisplay.flag}
		<span class="flag {flagClass}" />
	{/if}
	{#if showShipFlag && playerNameDisplay.region && playerNameDisplay.ship}
		<img
			src={shipImageUrl}
			class="mr-1 inline object-none object-center"
			alt="ship{playerNameDisplay.ship}-{playerNameDisplay.region}"
		/>
	{/if}
	{#if showLink && !isGenericPlayer}
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
			{#if (secondaryName && secondaryName != primaryName) || isPlayerAnon}
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
