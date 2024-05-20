import { NgsRunCategories } from '$lib/types/api/runs/categories';
import type { ParamMatcher } from '@sveltejs/kit';

export const validQuestCategories: Record<string, NgsRunCategories> = {
	['quest']: NgsRunCategories.Quest,
	['urgent-quest']: NgsRunCategories.UrgentQuest,
	['trigger']: NgsRunCategories.Trigger,
	['nex-aelio']: NgsRunCategories.NexAelio,
	['renus-retem']: NgsRunCategories.RenusRetem,
	['ams-kvaris']: NgsRunCategories.AmsKvaris,
	['nils-stia']: NgsRunCategories.NilsStia,
	['halvaldi']: NgsRunCategories.Halvaldi,
	['zelvin']: NgsRunCategories.Zelvin,
	['ringwedge']: NgsRunCategories.Ringwedge,
	['aelio']: NgsRunCategories.Aelio,
	['retem']: NgsRunCategories.Retem,
	['kvaris']: NgsRunCategories.Kvaris,
	['stia']: NgsRunCategories.Stia,
	['aelio-intruders']: NgsRunCategories.AelioIntruders,
};

const reverseMap = Object.entries(validQuestCategories).reduce(
	(prev, curr) => {
		prev[curr[1]] = curr[0];
		return prev;
	},
	{} as Record<NgsRunCategories, string>
);
export const mapCategoryToRoute = (category: NgsRunCategories) => {
	return reverseMap[category];
};

export const match = ((param) => {
	const validCategory = validQuestCategories[param.toLowerCase()];
	return !!validCategory;
}) satisfies ParamMatcher;
