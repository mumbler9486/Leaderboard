import { writable } from 'svelte/store';

export interface PurpleSearchFilters {
	server: string;
	region: string;
	rank: string;
	class: string;
}

const defaultFilter: PurpleSearchFilters = {
	server: 'no_filter',
	region: 'stia',
	rank: '1',
	class: 'no_filter'
};

export const purpleRunFilters = writable<PurpleSearchFilters>({ ...defaultFilter });
