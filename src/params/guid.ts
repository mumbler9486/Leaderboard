import type { ParamMatcher } from '@sveltejs/kit';

const guidRegex = /[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/m;
export const match = ((param) => {
	return guidRegex.test(param);
}) satisfies ParamMatcher;
