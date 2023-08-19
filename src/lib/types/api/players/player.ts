import type { ServerRegion } from '../serverRegions';
import type { NameStyle } from './nameStyle';
import type { PreferredName } from './preferredName';

export interface Player {
	playerId: number;
	playerName: string;
	ship?: number;
	flag?: string;
	characterName: string;
	preferredName: PreferredName;
	server?: ServerRegion;
	nameType: NameStyle;
	nameColor1: string;
	nameColor2: string;
	bio: string;
	youtube: string;
	twitch: string;
	twitter: string;
	discord: string;
	trophies: string[];
}
