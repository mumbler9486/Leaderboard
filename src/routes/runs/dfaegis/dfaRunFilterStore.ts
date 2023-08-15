import { writable } from 'svelte/store';

export interface DfaSearchFilters {
	server: string;
	class: string;
	support: string;
	trigger: string;
	rank: string;
}

const defaultFilter: DfaSearchFilters = {
	class: 'no_filter',
	server: 'no_filter',
	support: 'no_filter',
	trigger: 'urgent',
	rank: '1'
};

export const dfAegisRunFilters = writable<DfaSearchFilters>({ ...defaultFilter });
