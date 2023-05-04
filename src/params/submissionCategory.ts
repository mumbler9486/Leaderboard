import type { ParamMatcher } from '@sveltejs/kit';

const validCategories: { [key: string]: boolean } = {
	dfaparty: true,
	dfaduo: true,
	dfasolo: true,
	purpleparty: true,
	purpleduo: true,
	purplesolo: true,
	duelindomitable: true
};

export const match = ((param) => {
	const validCategory = validCategories[param.toLowerCase()];
	console.log(!!validCategory);
	return !!validCategory;
}) satisfies ParamMatcher;
