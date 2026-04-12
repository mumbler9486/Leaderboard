import type { PlayersDbModel } from '$lib/server/types/db/users/players';
import type { PlayerProfile } from '$lib/types/api/players/player';
import type { PlayerSearchResult as PlayerSearchResult } from '$lib/types/api/players/playerInfoAutoFill';
import { parseServerRegion } from '$lib/types/api/serverRegions';
import { isNullOrEmpty } from '$lib/utils/string';

export const mapPlayerSearch = (players: PlayersDbModel[]) => {
	return players.map(
		(p) =>
			({
				playerId: parseInt(p.Id),
				playerName: p.PlayerName,
				playerInfo: {
					playerId: parseInt(p.Id),
					ship: parseInt(p.Ship),
					flag: p.Flag,
					server: parseServerRegion(p.Server),
					name: p.PlayerName,
					characterName: p.CharacterName,
					preferredNameType: parseInt(p.PreferredNameType),
					nameEffectType: parseInt(p.NameEffectType),
					nameColor1: p.NameColor1,
					nameColor2: p.NameColor2,
				},
			}) satisfies PlayerSearchResult
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
		server: parseServerRegion(player.Server),
		nameType: parseInt(player.NameEffectType),
		nameColor1: player.NameColor1,
		nameColor2: player.NameColor2,
		bio: player.Bio,
		youtube: player.Youtube,
		twitch: player.Twitch,
		twitter: player.Twitter,
		discord: player.Discord,
		trophies: trophies,
	} satisfies PlayerProfile;
};
