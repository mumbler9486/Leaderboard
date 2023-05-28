import { writable } from 'svelte/store';

export interface DfaSoloSearchFilters extends Record<string, string | undefined> {
	server: string;
	class: string;
	buff: string;
	trigger: string;
}

const defaultFilter: DfaSoloSearchFilters = {
	server: 'no_filter',
	buff: 'no_filter',
	class: 'no_filter',
	trigger: 'urgent'
};

export const soloRunFilters = writable<DfaSoloSearchFilters>({ ...defaultFilter });

export interface DfaPartySearchFilters {
	server: string;
	buff: string;
	trigger: string;
}

const defaultPartyFilter: DfaPartySearchFilters = {
	server: 'no_filter',
	buff: 'no_filter',
	trigger: 'urgent'
};

export const partyRunFilters = writable<DfaPartySearchFilters>({ ...defaultPartyFilter });
