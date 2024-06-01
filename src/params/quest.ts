import { allLeaderboards } from '$lib/leaderboard/boards';
import type { ParamMatcher } from '@sveltejs/kit';

const validRoutes = allLeaderboards.reduce(
	(prev, curr) => {
		prev[curr.questRoute] = true;
		return prev;
	},
	{} as Record<string, boolean>
);

export const match = ((param) => {
	const validQuest = validRoutes[param.toLowerCase()];
	return !!validQuest;
}) satisfies ParamMatcher;
