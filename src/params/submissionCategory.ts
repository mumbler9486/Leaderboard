import type { ParamMatcher } from '@sveltejs/kit';

const validCategories: { [key: string]: boolean } = {
	dfaparty: true,
	dfaduo: true,
	dfasolo: true,
	purpleparty: true,
	purpleduo: true,
	purplesolo: true,
	indomitable_nexaelio: true,
	indomitable_renusretem: true,
	indomitable_amskvaris: true,
	indomitable_nilsstia: true
};

export const match = ((param) => {
	const validCategory = validCategories[param.toLowerCase()];
	return !!validCategory;
}) satisfies ParamMatcher;
