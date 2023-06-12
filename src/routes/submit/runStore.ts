import { RunCategories } from '$lib/types/api/categories';
import { writable } from 'svelte/store';

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

const cloneDeep = <T>(object: T): T => {
	return JSON.parse(JSON.stringify(object)) as T;
};

export const resetForm = () => {
	runForm.set(cloneDeep(defaultRun));
	dfaForm.set(cloneDeep(defaultDfa));
	purpleForm.set(cloneDeep(defaultPurple));
	indomitableForm.set(cloneDeep(defaultIndomitable));
};

export const runForm = writable(cloneDeep(defaultRun));
export const dfaForm = writable(cloneDeep(defaultDfa));
export const purpleForm = writable(cloneDeep(defaultPurple));
export const indomitableForm = writable(cloneDeep(defaultIndomitable));
