import type { PlayerProfile } from '$lib/types/api/players/player';
import { ServerRegion } from '$lib/types/api/serverRegions';

export const mockPlayer: PlayerProfile = {
	playerId: 123,
	playerName: 'Mock User',
	ship: 1,
	flag: undefined,
	characterName: 'Mock',
	preferredName: 0,
	server: ServerRegion.Global,
	nameType: 1,
	nameColor1: 'ff0000',
	nameColor2: '00ffff',
	bio: 'Profile description',
	youtube: '',
	twitch: '',
	twitter: '',
	discord: '',
	trophies: ['ranger4']
};
