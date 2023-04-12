import type { ParamMatcher } from '@sveltejs/kit';

const purpleRegions: { [key: string]: string } = {
	aelio: 'Aelio',
	retem: 'Retem',
	kvaris: 'Kvaris',
	stia: 'Stia'
};

export const match = ((param) => {
	const validRegion = purpleRegions[param.toLowerCase()];
	return !!validRegion;
}) satisfies ParamMatcher;
