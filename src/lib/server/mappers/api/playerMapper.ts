import type {
	PlayerCustomizationDbModel,
	PlayerInformationDbModel
} from '$lib/server/types/db/users/playerInformation';
import type { Player } from '$lib/types/api/player';
import type { PlayerInfoAutoFill } from '$lib/types/api/players/playerInfoAutoFill';
import { isNullOrEmpty } from '$lib/utils/string';

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

export const mapPlayer = (player: PlayerInformationDbModel & PlayerCustomizationDbModel) => {
	let trophies: string[] = [];
	if (!isNullOrEmpty(player.Trophies)) {
		trophies = player.Trophies.split('/').map((t) => {
			const trophyInfo = t.split(',');
			return trophyInfo[0];
		});
	}

	return {
		playerId: parseInt(player.PlayerID),
		playerName: player.PlayerName,
		characterName: player.CharacterName,
		preferredName: parseInt(player.PreferredName),
		flag: player.Flag,
		ship: parseInt(player.Ship),
		server: player.Server,
		nameType: parseInt(player.NameType),
		nameColor1: player.NameColor1,
		nameColor2: player.NameColor2,
		description: player.Description,
		youtube: player.Youtube,
		twitch: player.Twitch,
		twitter: player.Twitter,
		discord: player.Discord,
		trophies: trophies
	} satisfies Player;
};
