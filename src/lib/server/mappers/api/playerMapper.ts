import type { PlayersDbModel } from '$lib/server/types/db/users/players';
import type { Player } from '$lib/types/api/player';
import type { PlayerInfoAutoFill } from '$lib/types/api/players/playerInfoAutoFill';
import { isNullOrEmpty } from '$lib/utils/string';

export const mapPlayerAutoFillList = (players: PlayersDbModel[]) => {
	return players.map(
		(p) =>
			({
				playerId: parseInt(p.Id),
				playerName: p.PlayerName,
				characterName: p.CharacterName
			} as PlayerInfoAutoFill)
	);
};

export const mapPlayer = (player: PlayersDbModel) => {
	let trophies: string[] = [];
	if (!isNullOrEmpty(player.Trophies)) {
		trophies = player.Trophies.split('/').map((t) => {
			const trophyInfo = t.split(',');
			return trophyInfo[0];
		});
	}

	return {
		playerId: parseInt(player.Id),
		playerName: player.PlayerName,
		characterName: player.CharacterName,
		preferredName: parseInt(player.PreferredNameType),
		flag: player.Flag,
		ship: parseInt(player.Ship),
		server: player.Server,
		nameType: parseInt(player.NameEffectType),
		nameColor1: player.NameColor1,
		nameColor2: player.NameColor2,
		bio: player.Bio,
		youtube: player.Youtube,
		twitch: player.Twitch,
		twitter: player.Twitter,
		discord: player.Discord,
		trophies: trophies
	} satisfies Player;
};
