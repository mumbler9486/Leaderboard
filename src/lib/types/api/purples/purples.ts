import type { PlayerInfo } from '../playerInfo';
import type { RunTime } from '../runTime';

export interface PurpleRun {
	region: string;
	runId: number;
	rank: number;
	runRank: number;
	server: string;
	time: RunTime;
	notes: string;
	modNotes: string;
	players: PlayerInfo[];
	submitter: PlayerInfo;
	submissionTime: string;
}
