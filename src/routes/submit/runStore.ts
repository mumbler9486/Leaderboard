import { writable } from 'svelte/store';

export const runForm = writable({
	category: '',
	players: [] as PlayerInfo[],
	time: {}
} as Run);
export const dfaForm = writable({} as DfaRun);
export const purpleForm = writable({} as PurpleRun);

export interface DfaRun {
	mode: string;
	support: string;
}
export interface PurpleRun {
	region: string;
	rank: number;
}

export interface Run {
	category: string;
	players: PlayerInfo[];
	time: RunTime;
}

export interface RunTime {
	hours: number;
	minutes: number;
	seconds: number;
}

export interface PlayerInfo {
	playerName: string;
	inVideoName: string;
	playerServer: string;
	mainClass: string;
	subClass: string;
	weapons: string[];
}

export const resetForm = () => {
	runForm.set({
		category: '',
		players: [] as PlayerInfo[],
		time: {}
	} as Run);
	dfaForm.set({} as DfaRun);
	purpleForm.set({} as PurpleRun);
};

runForm.subscribe((s) => console.log(s));
dfaForm.subscribe((s) => console.log(s));
purpleForm.subscribe((s) => console.log(s));
