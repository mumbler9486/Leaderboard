import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';
import { writable } from 'svelte/store';

export interface DfAegisRunForm {
	support: DfAegisSupport;
}

const defaultDfAegisRunForm = {
	support: DfAegisSupport.None,
};

export const resetForm = () => {
	dfAegisFormStore.set(structuredClone(defaultDfAegisRunForm));
};

const dfAegisFormStore = writable<DfAegisRunForm>(structuredClone(defaultDfAegisRunForm));

export const dfAegisRunForm = {
	...dfAegisFormStore,
	reset: resetForm,
};
