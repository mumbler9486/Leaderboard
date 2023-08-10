import type { Game } from '../game';
import type { NgsPlayerClass } from '../ngsPlayerClass';
import type { RunTime } from '../runTime';
import type { ServerRegion } from '../serverRegions';
import type { Weapon } from '../weapon';

export interface Run {
	rank: number;
	runId: number;
	game: Game;
	serverRegion: ServerRegion;
	quest: string;
	category: string;
	patch: string;
	party: PartyMember[];
	time: RunTime;
	notes?: string;
	modNotes?: string;
	questRank: number;
	submitter: PlayerInfo2;
	submissionDate: string;
	submissionStatus: number;
	dateApproved?: string;
}

export interface PartyMember {
	playerId?: number;
	playerName: string;
	runCharacterName: string;
	mainClass: NgsPlayerClass;
	subClass: NgsPlayerClass;
	linkPov?: string;
	weapons: Weapon[];
	playerInfo: PlayerInfo2;
}

export interface PlayerInfo2 {
	playerId: number;
	ship?: number;
	flag?: string;
	name: string;
	characterName: string;
	preferredNameType: number;
	nameEffectType: number;
	nameColor1: string;
	nameColor2: string;
}

export interface DfSolusRun extends Run {}
