import type { NgsPlayerClass } from './ngsPlayerClass';
import type { Weapon } from './weapon';

export interface PlayerInfo {
	playerId: number;
	playerName: string;
	characterName: string;
	preferredName: string;
	runCharacterName: string;
	mainClass: NgsPlayerClass;
	subClass: NgsPlayerClass;
	linkPov: string;
	server: string;
	nameType: number;
	nameColor1: string;
	nameColor2: string;
	weapons: Weapon[];
}
