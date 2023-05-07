import type { PlayerInfo } from '../playerInfo';
import type { RunTime } from '../runTime';

export interface Submission {
	category: string;
	runId: number;
	time: RunTime;
	notes: string;
	patch: string;
	submissionTime: string;
	partySize: number;
	server: string;
	players: PlayerInfo[];
	submitter: PlayerInfo;
}

export interface PurpleSubmission extends Submission {
	region: string;
	rank: number;
}

export interface DfaSubmission extends Submission {
	drill: string;
	buff: string;
}

export interface IndomitableSubmission extends Submission {
	boss: string;
	rank: number;
	augments: boolean;
}
