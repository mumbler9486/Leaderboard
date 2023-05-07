import { RunCategories } from '$lib/types/api/categories';
import type { ParamMatcher } from '@sveltejs/kit';

const validCategories: { [key: string]: boolean } = {
	[RunCategories.PurpleSolo.toLowerCase()]: true,
	[RunCategories.PurpleDuo.toLowerCase()]: true,
	[RunCategories.PurpleParty.toLowerCase()]: true
};

export const match = ((param) => {
	const validCategory = validCategories[param.toLowerCase()];
	return validCategory;
}) satisfies ParamMatcher;
