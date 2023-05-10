import type { ParamMatcher } from '@sveltejs/kit';

const playerCounts: { [key: string]: true } = {
	solo: true,
	duo: true,
	party: true
};

export const match = ((param) => {
	const validBoss = playerCounts[param.toLowerCase()];
	return !!validBoss;
}) satisfies ParamMatcher;
