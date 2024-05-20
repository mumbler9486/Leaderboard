import type { RunTime } from '$lib/types/api/runTime';
import { writable } from 'svelte/store';

export interface RunForm {
	userId: string;
	username: string;
	time: RunTime;
	serverRegion: string;
	notes: string;
}

const defaultRun: RunForm = {
	userId: '',
	username: '',
	time: {
		hours: 0,
		minutes: 0,
		seconds: 0,
	},
	serverRegion: '',
	notes: '',
} as const;

export const resetForm = () => {
	runFormStore.set(structuredClone(defaultRun));
};

const runFormStore = writable<RunForm>(structuredClone(defaultRun));

export const runForm = {
	...runFormStore,
	reset: resetForm,
};
