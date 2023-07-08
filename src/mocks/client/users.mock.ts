import type { Player } from '$lib/types/api/player';

export const mockPlayer: Player = {
	playerId: 123,
	playerName: 'Mock User',
	ship: 1,
	flag: undefined,
	characterName: 'Mock',
	preferredName: 0,
	server: 'global',
	nameType: 1,
	nameColor1: 'ff0000',
	nameColor2: '00ffff',
	description: 'Profile description',
	youtube: '',
	twitch: '',
	twitter: '',
	discord: '',
	trophies: ['ranger4']
};
