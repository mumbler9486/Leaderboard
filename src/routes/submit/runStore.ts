import type { RunTime } from '$lib/types/api/runTime';
import { writable } from 'svelte/store';

export interface Run {
	userId: string;
	username: string;
	time: RunTime;
	serverRegion: string;
	notes: string;
}

const defaultRun: Run = {
	userId: '',
	username: '',
	time: {
		hours: 0,
		minutes: 0,
		seconds: 0
	},
	serverRegion: '',
	notes: ''
} as const;

export const resetForm = () => {
	runForm.set(JSON.parse(JSON.stringify(defaultRun)));
};

export const runForm = writable<Run>(JSON.parse(JSON.stringify(defaultRun)));
