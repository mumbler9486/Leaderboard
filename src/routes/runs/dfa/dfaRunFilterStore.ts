import { writable } from 'svelte/store';

export interface DfaSoloSearchFilters extends Record<string, string | undefined> {
	server: string;
	class: string;
	buff: string;
	trigger: string;
	rank: string;
}

const defaultFilter: DfaSoloSearchFilters = {
	server: 'no_filter',
	buff: 'no_filter',
	class: 'no_filter',
	trigger: 'urgent',
	rank: '1'
};

export const soloRunFilters = writable<DfaSoloSearchFilters>({ ...defaultFilter });

export interface DfaPartySearchFilters {
	server: string;
	buff: string;
	trigger: string;
	rank: string;
}

const defaultPartyFilter: DfaPartySearchFilters = {
	server: 'no_filter',
	buff: 'no_filter',
	trigger: 'urgent',
	rank: "1"
};

export const partyRunFilters = writable<DfaPartySearchFilters>({ ...defaultPartyFilter });
