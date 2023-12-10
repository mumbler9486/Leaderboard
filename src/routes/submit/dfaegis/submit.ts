import { get, writable } from 'svelte/store';
import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { submitRun } from '../submitRunPageLogic';

const dfAegisFormStore = writable({
	category: NgsRunCategories.Quest,
	rank: 1,
	support: DfAegisSupport.AinaManon,
});

const submitPath = '/ngs-api/runs/dfaegis';

export const submitDfAegisRun = async () => {
	const dfAegisDetails = get(dfAegisForm);

	const runDetails = { support: dfAegisDetails.support };
	return submitRun(
		submitPath,
		NgsQuests.DfAegis,
		dfAegisDetails.category,
		dfAegisDetails.rank,
		runDetails
	);
};

export const dfAegisForm = {
	...dfAegisFormStore,
	submitDfSolusRun: submitDfAegisRun,
};
