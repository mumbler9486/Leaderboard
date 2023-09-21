import { NameStyle } from '$lib/types/api/players/nameStyle';
import type { PlayerProfile } from '$lib/types/api/players/player';
import { PreferredName } from '$lib/types/api/players/preferredName';
import { ServerRegion } from '$lib/types/api/serverRegions';

export const mockNormalUser: PlayerProfile = {
	playerId: 5000000,
	playerName: 'mock_normal_user',
	ship: undefined,
	flag: undefined,
	characterName: 'mock_normal_user',
	preferredName: PreferredName.Player,
	server: ServerRegion.Global,
	nameType: NameStyle.None,
	nameColor1: 'ffffff',
	nameColor2: 'ffffff',
	bio: '',
	youtube: '',
	twitch: '',
	twitter: '',
	discord: '',
	trophies: []
};

export const mockModeratorUser: PlayerProfile = {
	playerId: 5000001,
	playerName: 'mock_moderator',
	ship: undefined,
	flag: undefined,
	characterName: 'mock_moderator',
	preferredName: PreferredName.Player,
	server: ServerRegion.Global,
	nameType: NameStyle.None,
	nameColor1: 'ffffff',
	nameColor2: 'ffffff',
	bio: '',
	youtube: '',
	twitch: '',
	twitter: '',
	discord: '',
	trophies: []
};
