import { writable } from 'svelte/store';

export interface PurpleSoloSearchFilters {
	server?: string;
	region: string;
	rank: number;
	class?: string;
}

const defaultFilter: PurpleSoloSearchFilters = {
	server: undefined,
	region: 'stia',
	rank: 1,
	class: undefined
};

export const resetSoloFilters = () => {
	const newDefault = { ...defaultFilter };
	soloRunFilters.set(newDefault);
};

export const soloRunFilters = writable<PurpleSoloSearchFilters>({ ...defaultFilter });

export interface PurplePartySearchFilters {
	server?: string;
	region: string;
	rank: number;
}

const defaultPartyFilter: PurplePartySearchFilters = {
	server: undefined,
	region: 'stia',
	rank: 1
};

export const resetPartyFilters = () => {
	const newDefault = { ...defaultPartyFilter };
	partyRunFilters.set(newDefault);
};

export const partyRunFilters = writable<PurplePartySearchFilters>({ ...defaultPartyFilter });
