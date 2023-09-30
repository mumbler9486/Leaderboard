import { get, writable } from 'svelte/store';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { submitRun } from '../submitRunPageLogic';

const venogiaFormStore = writable({
	rank: 1,
	category: NgsRunCategories.UrgentQuest
});

const submitPath = '/ngs-api/runs/venogia';

export const submitVenogiaRun = async () => {
	const venogiaDetails = get(venogiaForm);

	return submitRun(submitPath, NgsQuests.Venogia, venogiaDetails.category, venogiaDetails.rank);
};

export const venogiaForm = {
	...venogiaFormStore,
	submitVenogiaRun: submitVenogiaRun
};
