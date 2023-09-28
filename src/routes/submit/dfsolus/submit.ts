import { get, writable } from 'svelte/store';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { submitRun } from '../submitRunPageLogic';

const dfSolusFormStore = writable({
	rank: 1,
	category: NgsRunCategories.Quest
});

const submitPath = '/ngs-api/runs/dfsolus';

export const submitDfSolusRun = async () => {
	const solusDetails = get(solusForm);

	return submitRun(submitPath, NgsQuests.DfSolus, solusDetails.category, solusDetails.rank);
};

export const solusForm = {
	...dfSolusFormStore,
	submitDfSolusRun: submitDfSolusRun
};
