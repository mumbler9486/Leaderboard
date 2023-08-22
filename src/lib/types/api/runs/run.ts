import type { DfAegisSupport } from '../dfAegis/dfAegisSupports';
import type { Game } from '../game';
import type { NgsPlayerClass } from '../ngsPlayerClass';
import type { RunTime } from '../runTime';
import type { ServerRegion } from '../serverRegions';
import type { NgsWeapon } from '../weapon';

export interface Run<T = void> {
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
	submitter: PlayerInfo;
	submissionDate: string;
	submissionStatus: number;
	dateApproved?: string;
	details: T;
}

export interface PartyMember {
	playerId?: number;
	playerName: string;
	runCharacterName: string;
	mainClass: NgsPlayerClass;
	subClass: NgsPlayerClass;
	linkPov?: string;
	weapons: NgsWeapon[];
	playerInfo: PlayerInfo;
}

export interface PlayerInfo {
	playerId: number;
	ship?: number;
	server?: ServerRegion;
	flag?: string;
	name: string;
	characterName: string;
	preferredNameType: number;
	nameEffectType: number;
	nameColor1: string;
	nameColor2: string;
}

export interface DfSolusRun extends Run {}

export interface PurpleRun2 extends Run {}

export interface DfAegisRunDetails {
	support: DfAegisSupport;
}
export interface DfAegisRun extends Run<DfAegisRunDetails> {}

export interface DuelRunDetails {
	augments: DfAegisSupport;
}
export interface DuelRun extends Run<DuelRunDetails> {}
