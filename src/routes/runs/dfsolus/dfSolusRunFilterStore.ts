import { writable } from 'svelte/store';

export interface DfSolusSearchFilters extends Record<string, string | undefined> {
	server: string;
	class: string;
	rank: string;
}

const defaultFilter: DfSolusSearchFilters = {
	server: 'no_filter',
	class: 'no_filter',
	rank: '1'
};

export const runFilters = writable<DfSolusSearchFilters>({ ...defaultFilter });
