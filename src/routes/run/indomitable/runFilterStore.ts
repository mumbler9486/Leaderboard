import { writable } from 'svelte/store';

export interface IndomitableRunFilters {
	server?: string;
	class?: string;
	augmentations: string;
}

const defaultFilter: IndomitableRunFilters = {
	server: undefined,
	class: undefined,
	augmentations: 'yes'
};

export const resetSoloFilters = () => {
	const newDefault = { ...defaultFilter };
	indomitableRunFilters.set(newDefault);
};

export const indomitableRunFilters = writable<IndomitableRunFilters>({ ...defaultFilter });
