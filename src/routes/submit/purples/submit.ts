import { get, writable } from 'svelte/store';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { submitRun } from '../submitRunPageLogic';

const purpleFormStore = writable({
	rank: 2,
	region: NgsRunCategories.AelioIntruders,
});

const submitPath = '/ngs-api/runs/purples';

export const submitPurplesRun = async () => {
	const purpleDetails = get(purplesForm);

	return submitRun(submitPath, NgsQuests.Purples, purpleDetails.region, purpleDetails.rank);
};

export const purplesForm = {
	...purpleFormStore,
	submitPurplesRun: submitPurplesRun,
};
