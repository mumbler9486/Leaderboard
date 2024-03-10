import type { ParamMatcher } from '@sveltejs/kit';

const indomitableBosses: { [key: string]: boolean } = {
	['nex-aelio']: true,
	['renus-retem']: true,
	['ams-kvaris']: true,
	['nils-stia']: true,
	['halvaldi']: true,
	['zelvin']: true,
	['ringwedge']: true,
};

export const match = ((param) => {
	const validBoss = indomitableBosses[param.toLowerCase()];
	return !!validBoss;
}) satisfies ParamMatcher;
