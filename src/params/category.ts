import { allLeaderboards } from '$lib/leaderboard/boards';
import type { ParamMatcher } from '@sveltejs/kit';

const validCategories = allLeaderboards.reduce(
	(prev, curr) => {
		prev[curr.categoryRoute] = true;
		return prev;
	},
	{} as Record<string, boolean>
);

// Note just because they are valid categories doesn't mean they are valid
// for the quest quest categories. Pair with the specific quest.
export const match = ((param) => {
	const validCategory = validCategories[param.toLowerCase()];
	return !!validCategory;
}) satisfies ParamMatcher;
