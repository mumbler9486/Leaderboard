import { writable } from 'svelte/store';

export interface IndomitableRunSearchFilter {
	server: string;
	class: string;
	augmentations: string;
}

const defaultFilter: IndomitableRunSearchFilter = {
	server: 'no_filter',
	class: 'no_filter',
	augmentations: 'no_filter'
};

export const indomitableRunFilters = writable<IndomitableRunSearchFilter>({ ...defaultFilter });
