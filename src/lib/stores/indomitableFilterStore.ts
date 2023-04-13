import type { IndomitableSearchFilter } from '$lib/types/api/duels/indomitable';
import { writable } from 'svelte/store';

export const pageFilters = writable({
	server: 'No Filter',
	class: 'No Filter',
	augmentation: 'No Filter'
} as IndomitableSearchFilter);