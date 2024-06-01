import { writable } from 'svelte/store';

export interface DuelsRunForm {
	augments: boolean;
}

const defaultDuelsRunForm = {
	augments: true,
};

export const resetForm = () => {
	duelsFormStore.set(structuredClone(defaultDuelsRunForm));
};

const duelsFormStore = writable<DuelsRunForm>(structuredClone(defaultDuelsRunForm));

export const duelsRunForm = {
	...duelsFormStore,
	reset: resetForm,
};
