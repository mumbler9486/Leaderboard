import { writable } from 'svelte/store';

export interface DuelMasqRunForm {
	depth: number;
}

const defaultDuelsRunForm = {
	depth: 1,
};

export const resetForm = () => {
	duelMasqFormStore.set(structuredClone(defaultDuelsRunForm));
};

const duelMasqFormStore = writable<DuelMasqRunForm>(structuredClone(defaultDuelsRunForm));

export const duelMasqRunForm = {
	...duelMasqFormStore,
	reset: resetForm,
};
