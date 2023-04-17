import type { NgsPlayerClass } from '../ngsPlayerClass';
import type { PlayerInfo } from '../playerInfo';
import type { RunTime } from '../runTime';
import type { Weapon } from '../weapon';

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
};

export type IndomitableSearchFilter = {
	server: string;
	class: string;
	augmentation: string;
};
