import { writable } from 'svelte/store';

export interface DfAegisSearchFilters {
	server: string;
	class: string;
	support: string;
	trigger: string;
	rank: string;
}

const defaultFilter: DfAegisSearchFilters = {
	class: 'no_filter',
	server: 'no_filter',
	support: 'no_filter',
	trigger: 'urgent',
	rank: '1'
};

export const dfAegisRunFilters = writable<DfAegisSearchFilters>({ ...defaultFilter });
