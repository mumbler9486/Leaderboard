import type { NgsPlayerClass } from '../ngsPlayerClass';
import type { RunTime } from '../runTime';
import type { Weapon } from '../weapon';

export interface Submission {
	runId: number;
	time: RunTime;
	notes: string;
	patch: string;
	submissionTime: string;
	partySize: number;
	server: string;
	players: SubmissionPlayerInfo[];
	submitter: SubmissionPlayerInfo;
}

export interface SubmissionPlayerInfo {
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

export interface PurpleSubmission extends Submission {
	region: string;
	rank: number;
}

export interface DfaSubmission extends Submission {
	drill: string;
	buff: string;
}
