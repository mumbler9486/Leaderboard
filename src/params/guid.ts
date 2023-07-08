import { guidRegex } from '$lib/utils/validation';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return guidRegex.test(param);
}) satisfies ParamMatcher;
