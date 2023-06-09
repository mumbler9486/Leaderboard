import type { PlayerInformationDbModel } from '$lib/server/types/db/users/playerInformation';
import type { PlayerInfoAutoFill } from '$lib/types/api/players/playerInfoAutoFill';

export const mapPlayers = (players: PlayerInformationDbModel[]) => {
	return players.map(
		(p) =>
			({
				playerId: parseInt(p.PlayerID),
				playerName: p.PlayerName,
				characterName: p.CharacterName
			} as PlayerInfoAutoFill)
	);
};
