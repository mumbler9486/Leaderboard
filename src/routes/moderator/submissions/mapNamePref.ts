import type { PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
import type { SubmissionPlayerInfo } from '$lib/types/api/submissions/submissions';

export const mapToNamePref = (player: SubmissionPlayerInfo): PlayerNameDisplay => {
	return {
		playerId: player.playerId,
		flag: undefined,
		ship: 1,
		region: player.server,
		playerName: player.playerName,
		runCharacterName: player.runCharacterName,
		characterName: player.characterName,
		namePreference: player.nameType,
		nameType: player.nameType,
		nameColor1: player.nameColor1,
		nameColor2: player.nameColor2
	};
};
