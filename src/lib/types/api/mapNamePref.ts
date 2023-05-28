import type { PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
import type { PlayerInfo } from '$lib/types/api/playerInfo';

export const mapToNamePref = (player: PlayerInfo | undefined): PlayerNameDisplay | undefined => {
	if (!player) return undefined;

	return {
		playerId: player.playerId,
		flag: undefined,
		ship: player.ship,
		region: player.server,
		playerName: player.playerName,
		runCharacterName: player.runCharacterName,
		characterName: player.characterName,
		namePreference: player.preferredName,
		nameType: player.nameType,
		nameColor1: player.nameColor1,
		nameColor2: player.nameColor2
	};
};
