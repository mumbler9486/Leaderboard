import { RunCategories } from '$lib/types/api/categories';
import type { ParamMatcher } from '@sveltejs/kit';

const validCategories: { [key: string]: boolean } = {
	[RunCategories.DfaSolo.toLowerCase()]: true,
	[RunCategories.DfaDuo.toLowerCase()]: true,
	[RunCategories.DfaParty.toLowerCase()]: true
};

export const match = ((param) => {
	const validCategory = validCategories[param.toLowerCase()];
	return validCategory;
}) satisfies ParamMatcher;
