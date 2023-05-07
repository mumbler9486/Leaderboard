import { RunCategories } from '$lib/types/api/categories';
import type { ParamMatcher } from '@sveltejs/kit';

const validCategories: { [key: string]: boolean } = {
	[RunCategories.IndomitableNexAelio.toLowerCase()]: true,
	[RunCategories.IndomitableRenusRetem.toLowerCase()]: true,
	[RunCategories.IndomitableAmsKvaris.toLowerCase()]: true,
	[RunCategories.IndomitableNilsStia.toLowerCase()]: true
};

export const match = ((param) => {
	const validCategory = validCategories[param.toLowerCase()];
	return validCategory;
}) satisfies ParamMatcher;
