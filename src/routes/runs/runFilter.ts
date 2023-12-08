import { writable } from 'svelte/store';

export interface RunSearchFilters {
	server: string;
	region: string;
	rank: string;
	class: string;
	support: string;
	trigger: string;
	augments: string;
	category: string;
}

export const defaultRunFilter: RunSearchFilters = {
	server: 'no_filter',
	region: 'stia',
	rank: '1',
	class: 'no_filter',
	support: 'no_filter',
	trigger: 'no_filter',
	augments: 'no_filter',
	category: 'no_filter',
} as const;

const searchFilterStore = writable<RunSearchFilters>({ ...defaultRunFilter });

export const resetFilters = () => {
	searchFilterStore.set({ ...defaultRunFilter });
};

export const runFilters = {
	...searchFilterStore,
	resetFilters,
};
