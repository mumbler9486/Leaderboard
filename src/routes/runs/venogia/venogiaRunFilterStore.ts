import { writable } from 'svelte/store';

export interface VenogiaSoloSearchFilters extends Record<string, string | undefined> {
	server: string;
	class: string;
	buff: string;
	rank: string;
}

const defaultFilter: VenogiaSoloSearchFilters = {
	server: 'no_filter',
	buff: 'no_filter',
	class: 'no_filter',
	rank: '1'
};

export const soloRunFilters = writable<VenogiaSoloSearchFilters>({ ...defaultFilter });

export interface VenogiaPartySearchFilters {
	server: string;
	buff: string;
	rank: string;
}

const defaultPartyFilter: VenogiaPartySearchFilters = {
	server: 'no_filter',
	buff: 'no_filter',
	rank: '1'
};

export const partyRunFilters = writable<VenogiaPartySearchFilters>({ ...defaultPartyFilter });
