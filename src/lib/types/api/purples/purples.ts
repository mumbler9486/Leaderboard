import type { NgsPlayerClass } from '../ngsPlayerClass';
import type { Weapon } from '../weapon';

export interface PurpleSoloRunSubmission {
	runID: number;
	playerID: number;
	runCharacter: string;
	patch: string;
	region: string;
	rank: number;
	time: string;
	mainClass: NgsPlayerClass;
	subClass: NgsPlayerClass;
	weapons: Weapon[];
	weaponInfo: string;
	link: string;
	notes: string;
	submissionTime: string;
	submitterID: number;
	playerName: string;
	playerCName: string;
	playerNameType: number;
	playerNameColor1: string;
	playerNameColor2: string;
	playerServer: string;
	playerPrefN: number;
	submitterName: string;
	submitterCName: string;
	submitterNameType: number;
	submitterNameColor1: string;
	submitterNameColor2: string;
	submitterPrefN: number;
}
