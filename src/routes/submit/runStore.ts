import type { RunTime } from '$lib/types/api/runTime';
import { writable } from 'svelte/store';

export interface Run {
	userId: string;
	username: string;
	category: string;
	time: RunTime;
	serverRegion: string;
	notes: string;
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
} as const;

export const resetForm = () => {
	runForm.set(structuredClone(defaultRun));
};

export const runForm = writable(structuredClone(defaultRun));
