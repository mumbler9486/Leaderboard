import type { ParamMatcher } from '@sveltejs/kit';

const numberRegex = /^[0-9]{1,9}$/m;
export const match = ((param) => {
	return numberRegex.test(param);
}) satisfies ParamMatcher;
