import { writable } from 'svelte/store';

export interface DfaSoloSearchFilters {
	region?: string;
	class?: string;
	buff?: string;
	trigger: string;
}

const defaultFilter: DfaSoloSearchFilters = {
	region: undefined,
	buff: undefined,
	class: undefined,
	trigger: 'urgent'
};

export const resetSoloFilters = () => {
	const newDefault = { ...defaultFilter };
	soloRunFilters.set(newDefault);
};

export const soloRunFilters = writable<DfaSoloSearchFilters>({ ...defaultFilter });

export interface DfaPartySearchFilters {
	region?: string;
	buff?: string;
	trigger: string;
}

const defaultPartyFilter: DfaPartySearchFilters = {
	region: undefined,
	buff: undefined,
	trigger: 'urgent'
};

export const resetPartyFilters = () => {
	const newDefault = { ...defaultPartyFilter };
	partyRunFilters.set(newDefault);
};

export const partyRunFilters = writable<DfaPartySearchFilters>({ ...defaultPartyFilter });
