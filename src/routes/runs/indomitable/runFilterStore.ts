import { writable } from 'svelte/store';

export interface IndomitableRunSearchFilters {
	server: string;
	class: string;
	augmentations: string;
}

const defaultFilter: IndomitableRunSearchFilters = {
	server: 'no_filter',
	class: 'no_filter',
	augmentations: 'no_filter'
};

export const indomitableRunFilters = writable<IndomitableRunSearchFilters>({ ...defaultFilter });
