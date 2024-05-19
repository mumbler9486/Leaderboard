import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { writable } from 'svelte/store';

const defaultQuest = {
	name: '',
	category: NgsRunCategories.Quest,
	questRank: 1,
	partySize: 1,
	time: 20 * 60,
};

const questFormStore = writable(structuredClone(defaultQuest));

const resetForm = () => {
	questFormStore.set(structuredClone(defaultQuest));
};

export const questForm = {
	...questFormStore,
	reset: resetForm,
};
