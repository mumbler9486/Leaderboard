import { get, writable } from 'svelte/store';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { submitRun } from '../submitRunPageLogic';

const defaultForm = {
	rank: 1,
	category: NgsRunCategories.Quest,
};

const dfSolusFormStore = writable(defaultForm);

const submitPath = '/ngs-api/runs/dfsolus';

export const resetForm = () => {
	dfSolusFormStore.set(JSON.parse(JSON.stringify(defaultForm)));
};

export const submitDfSolusRun = async () => {
	const solusDetails = get(solusForm);

	return submitRun(submitPath, NgsQuests.DfSolus, solusDetails.category, solusDetails.rank);
};

export const solusForm = {
	...dfSolusFormStore,
	submitDfSolusRun: submitDfSolusRun,
	resetForm,
};
