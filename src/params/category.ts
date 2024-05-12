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

export const match = ((param) => {
	const validCategory = validQuestCategories[param.toLowerCase()];
	return !!validCategory;
}) satisfies ParamMatcher;
