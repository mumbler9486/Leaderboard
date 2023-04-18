import type { PlayerInfo } from '../playerInfo';
import type { RunTime } from '../runTime';

export type IndomitableRun = {
	runId: number;
	rank: number;
	server: string;
	time: RunTime;
	videoUrl: string;
	notes: string;
	modNotes: string;
	players: PlayerInfo[];
	submitter: PlayerInfo;
	augments: boolean;
};

export type IndomitableSearchFilter = {
	server: string;
	class: string;
	augmentations: string;
};
