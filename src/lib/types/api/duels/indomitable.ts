import type { NgsPlayerClass } from '../ngsPlayerClass';
import type { RunTime } from '../runTime';
import type { Weapon } from '../weapon';

export type IndomitableRun = {
	rank: 1;
	server: 'Global' | 'Japan';
	playerName: string;
	mainClass: NgsPlayerClass;
	subClass: NgsPlayerClass;
	weapons: Weapon[];
	time: RunTime;
	videoUrl: string;
	notes: string;
};

export type IndomitableSearchFilter = {
	server: string;
	class: string;
};
