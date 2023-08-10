import { writable } from 'svelte/store';

export interface SolusSoloSearchFilters extends Record<string, string | undefined> {
	server: string;
	class: string;
	buff: string;
	rank: string;
}

const defaultFilter: SolusSoloSearchFilters = {
	server: 'no_filter',
	buff: 'no_filter',
	class: 'no_filter',
	rank: '1'
};

export const soloRunFilters = writable<SolusSoloSearchFilters>({ ...defaultFilter });

export interface DfSolusPartySearchFilters {
	server: string;
	buff: string;
	rank: string;
}

const defaultPartyFilter: DfSolusPartySearchFilters = {
	server: 'no_filter',
	buff: 'no_filter',
	rank: '1'
};

export const partyRunFilters = writable<DfSolusPartySearchFilters>({ ...defaultPartyFilter });
