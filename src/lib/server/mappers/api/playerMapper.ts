import type {
	PlayerCustomizationDbModel,
	PlayerInformationDbModel
} from '$lib/server/types/db/users/playerInformation';
import type { Player } from '$lib/types/api/player';
import type { PlayerInfoAutoFill } from '$lib/types/api/players/playerInfoAutoFill';

export const mapPlayerAutoFillList = (players: PlayerInformationDbModel[]) => {
	return players.map(
		(p) =>
			({
				playerId: parseInt(p.PlayerID),
				playerName: p.PlayerName,
				characterName: p.CharacterName
			} as PlayerInfoAutoFill)
	);
};

export const mapPlayer = (players: (PlayerInformationDbModel & PlayerCustomizationDbModel)[]) => {
	return players.map(
		(p) =>
			({
				playerId: parseInt(p.PlayerID),
				playerName: p.PlayerName,
				characterName: p.CharacterName,
				preferredName: parseInt(p.PreferredName),
				flag: p.Flag,
				ship: parseInt(p.Ship),
				server: p.Server,
				nameType: parseInt(p.NameType),
				nameColor1: p.NameColor1,
				nameColor2: p.NameColor2
			} as Player)
	);
};
