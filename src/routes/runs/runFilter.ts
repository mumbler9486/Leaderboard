import { writable } from 'svelte/store';

export interface RunSearchFilters {
	server: string;
	region: string;
	rank: string;
	class: string;
}

const defaultFilter: RunSearchFilters = {
	server: 'no_filter',
	region: 'stia',
	rank: '1',
	class: 'no_filter'
};

export const runFilters = writable<RunSearchFilters>({ ...defaultFilter });
