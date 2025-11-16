import { writable } from 'svelte/store';

export interface PlanetfallStrikeRunForm {
	stage: number;
}

const defaultDuelsRunForm = {
	stage: 1,
};

export const resetForm = () => {
	planetfallStrikeFormStore.set(structuredClone(defaultDuelsRunForm));
};

const planetfallStrikeFormStore = writable<PlanetfallStrikeRunForm>(
	structuredClone(defaultDuelsRunForm)
);

export const planetfallStrikeRunForm = {
	...planetfallStrikeFormStore,
	reset: resetForm,
};
