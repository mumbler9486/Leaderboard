import { writable } from 'svelte/store';

export interface PurpleSoloSearchFilters {
	server: string;
	region: string;
	rank: string;
	class: string;
}

const defaultFilter: PurpleSoloSearchFilters = {
	server: 'no_filter',
	region: 'stia',
	rank: '1',
	class: 'no_filter'
};

export const soloRunFilters = writable<PurpleSoloSearchFilters>({ ...defaultFilter });

export interface PurplePartySearchFilters {
	server: string;
	region: string;
	rank: string;
}

const defaultPartyFilter: PurplePartySearchFilters = {
	server: 'no_filter',
	region: 'stia',
	rank: '1'
};

export const partyRunFilters = writable<PurplePartySearchFilters>({ ...defaultPartyFilter });
