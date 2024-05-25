import { get, writable } from 'svelte/store';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { submitRun } from '../submitRunPageLogic';

const duelFormStore = writable({
	rank: 1,
	boss: NgsRunCategories.Halvaldi,
	augments: 'yes'
});

const submitPath = '/ngs-api/runs/duels';

export const submitDuelRun = async () => {
	const duelDetails = get(duelsForm);

	const runDetails = {
		augments: duelDetails.augments === 'no' ? false : true
	};
	return submitRun(submitPath, NgsQuests.Duels, duelDetails.boss, duelDetails.rank, runDetails);
};

export const duelsForm = {
	...duelFormStore,
	submitDuelRun: submitDuelRun
};
