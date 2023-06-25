import type { PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import type { Player } from './player';

export const mapToNamePref = (
	player: PlayerInfo | Player | undefined
): PlayerNameDisplay | undefined => {
	if (!player) return undefined;

	return {
		playerId: player.playerId,
		flag: player.flag,
		ship: player.ship,
		region: player.server,
		playerName: player.playerName,
		runCharacterName: 'runCharacterName' in player ? player.runCharacterName : '',
		characterName: player.characterName,
		namePreference: player.preferredName,
		nameType: player.nameType,
		nameColor1: player.nameColor1,
		nameColor2: player.nameColor2
	};
};
