import type { PlayersDbModel2 } from '$lib/server/types/db/users/players';
import type { PlayerProfile } from '$lib/types/api/players/player';
import type { PlayerInfoAutoFill } from '$lib/types/api/players/playerInfoAutoFill';
import { parseServerRegion } from '$lib/types/api/serverRegions';
import { isNullOrEmpty } from '$lib/utils/string';

export const mapPlayerAutoFillList = (players: PlayersDbModel2[]) => {
	return players.map(
		(p) =>
			({
				playerId: p.id,
				playerName: p.player_name,
				characterName: p.character_name,
			}) as PlayerInfoAutoFill
	);
};

export const mapPlayer = (player: PlayersDbModel2) => {
	let trophies: string[] = [];
	if (!isNullOrEmpty(player.trophies)) {
		trophies = player.trophies.split('/').map((t) => {
			const trophyInfo = t.split(',');
			return trophyInfo[0];
		});
	}

	return {
		playerId: player.id,
		playerName: player.player_name,
		characterName: player.character_name,
		preferredName: player.preferred_name_type,
		flag: player.flag,
		ship: player.ship,
		server: parseServerRegion(player.server),
		nameType: player.name_effect_type,
		nameColor1: player.name_color1,
		nameColor2: player.name_color2,
		bio: player.bio,
		youtube: player.youtube,
		twitch: player.twitch,
		twitter: player.twitter,
		discord: player.discord,
		trophies: trophies,
	} satisfies PlayerProfile;
};
