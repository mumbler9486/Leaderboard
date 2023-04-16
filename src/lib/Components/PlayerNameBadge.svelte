<script context="module" lang="ts">
	export interface PlayerNameDisplay {
		playerId: number;
		flag: string | undefined;
		ship: number;
		region: string;
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
	export let player: PlayerNameDisplay;
	export let showLink: boolean = false;

	let primaryName: string;
	let secondaryName: string;

	$: flagClass = player.flag ? `fi fi-${player.flag}` : '';
	$: shipImageUrl =
		player.ship && player.region ? `/icons/ships/ship${player.ship}-${player.region}.png` : '';

	// TODO Refactor anon system
	const anonPlayerIds = [106, 107];
	$: isPlayerAnon = anonPlayerIds.includes(player.playerId);

	$: playerNameStyle = playerNameColor(player);

	const playerNameColor = (...update: any[]) => {
		let style = 'font-weight: bold; ';

		switch (player.namePreference) {
			// Main Character Name
			case 1:
				primaryName = player.characterName ?? '';
				secondaryName = player.runCharacterName;
				break;
			// Run Character Name
			case 2:
				primaryName = player.runCharacterName;
				secondaryName = player.playerName;
				break;
			// Player Name
			default:
				primaryName = player.playerName;
				secondaryName = player.runCharacterName;
				break;
		}

		if (!isPlayerAnon) {
			let nameColor1 = player.nameColor1 ?? 'ffffff';
			let nameColor2 = player.nameColor2 ?? 'ffffff';
			switch (player.nameType) {
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
		{#if player.flag}
			<span class={flagClass} style="max-height:16px;min-width: 25px;" />
		{/if}
		{#if player.region && player.ship}
			<img
				src={shipImageUrl}
				class="mr-1 inline object-none object-center"
				alt="ship{player.ship}-{player.region}"
			/>
		{/if}
		{#if showLink}
			<a
				href="/users?id={player.playerId}"
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
