import type { PlayerInfo } from '../playerInfo';
import type { RunTime } from '../runTime';

export interface DfaRun {
	rank: number;
	runId: number;
	patch: string;
	players: PlayerInfo[];
	support: string;
	time: RunTime;
	notes: string;
	drill: string;
	submitter: PlayerInfo;
	submissionTime: string;
}
