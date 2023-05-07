import type { ParamMatcher } from '@sveltejs/kit';

const indomitableBosses: { [key: string]: string } = {
	nexaelio: 'Nex Aelio',
	renusretem: 'Renus Retem',
	amskvaris: 'Ams Kvaris',
	nilsstia: 'Nils Stia'
};

export const match = ((param) => {
	const validBoss = indomitableBosses[param.toLowerCase()];
	return !!validBoss;
}) satisfies ParamMatcher;
