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
</script>

<script lang="ts">
	export let player: PlayerNameDisplay | string | undefined;
	export let showLink: boolean = false;

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

	$: playerNameStyle = playerNameColor(player);

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

	const playerNameColor = (...update: any[]) => {
		let style = 'font-weight: bold; ';

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

		if (!isPlayerAnon) {
			let nameColor1 = playerNameDisplay.nameColor1 ?? 'ffffff';
			let nameColor2 = playerNameDisplay.nameColor2 ?? 'ffffff';
			switch (playerNameDisplay.nameType) {
				case 1:
					style += `color: #` + nameColor1 + `;`;
					break;
				case 2:
					style +=
						`background: -webkit-linear-gradient(0deg, #` +
						nameColor1 +
						`, #` +
						nameColor2 +
						`);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;`;
					break;
				case 3:
					style +=
						`color: #` +
						nameColor2 +
						`; text-shadow: 0px 0px 5px #` +
						nameColor1 +
						`, 0px 0px 5px #` +
						nameColor1 +
						`, 0px 0px 5px #` +
						nameColor1 +
						`;`;
					break;
				default:
					break;
			}
		}

		return style;
	};
</script>

<div>
	<span class="flex items-center">
		{#if playerNameDisplay.flag}
			<span class={flagClass} style="max-height:16px;min-width: 25px;" />
		{/if}
		{#if playerNameDisplay.region && playerNameDisplay.ship}
			<img
				src={shipImageUrl}
				class="mr-1 inline object-none object-center"
				alt="ship{playerNameDisplay.ship}-{playerNameDisplay.region}"
			/>
		{/if}
		{#if showLink && !isGenericPlayer}
			<a
				href={playerLink}
				target="_blank"
				rel="noreferrer noopener"
				class="flex place-content-center"
				><p style={playerNameStyle} class="inline place-self-center">
					{primaryName}
				</p>
			</a>
		{:else}
			<span
				style={playerNameStyle}
				class="cursor-pointer truncate transition ease-in-out hover:brightness-125"
				on:click
				on:keyup
			>
				{primaryName}
				{#if secondaryName && isPlayerAnon}
					<p class="ml-1 truncate text-xs">
						({secondaryName})
					</p>
				{/if}
			</span>
		{/if}
	</span>
</div>
