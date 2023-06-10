import { RunCategories } from '$lib/types/api/categories';
import { writable } from 'svelte/store';

const defaultRun: Run = {
	userId: '',
	username: '',
	category: '',
	time: {
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	serverRegion: '',
	notes: ''
};

const defaultDfa: DfaRun = {
	support: 'ainamanon',
	type: 'urgent'
};

const defaultPurple: PurpleRun = {
	region: 'stia',
	rank: 1
};

const defaultIndomitable: IndomitableRun = {
	boss: RunCategories.IndomitableNexAelio,
	rank: 1,
	augments: 'yes'
};

export const runForm = writable(defaultRun);
export const dfaForm = writable(defaultDfa);
export const purpleForm = writable(defaultPurple);
export const indomitableForm = writable(defaultIndomitable);

export interface DfaRun {
	type: string;
	support: string;
}
export interface PurpleRun {
	region: string;
	rank: number;
}

export interface IndomitableRun {
	boss: RunCategories;
	rank: number;
	augments: string;
}

export interface Run {
	userId: string;
	username: string;
	category: string;
	time: RunTime;
	serverRegion: string;
	notes: string;
}

export interface RunTime {
	hours: number;
	minutes: number;
	seconds: number;
}

export const resetForm = () => {
	runForm.set(defaultRun);
	dfaForm.set(defaultDfa);
	purpleForm.set(defaultPurple);
	indomitableForm.set(defaultIndomitable);
};
