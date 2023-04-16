import type { PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
import type { SubmissionPlayerInfo } from '$lib/types/api/submissions/submissions';

export const mapToNamePref = (player: SubmissionPlayerInfo): PlayerNameDisplay => {
	return {
		region: player.server,
		ship: 1,
		playerId: player.playerId,
		flag: undefined,
		playerName: player.playerName,
		runCharacterName: player.runCharacterName,
		characterName: player.characterName,
		namePreference: player.nameType,
		nameType: player.nameType,
		nameColor1: player.nameColor1,
		nameColor2: player.nameColor2
	};
};
