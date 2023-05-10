import type { ParamMatcher } from '@sveltejs/kit';

const indomitableBosses: { [key: string]: boolean } = {
	nexaelio: true,
	renusretem: true,
	amskvaris: true,
	nilsstia: true
};

export const match = ((param) => {
	const validBoss = indomitableBosses[param.toLowerCase()];
	return !!validBoss;
}) satisfies ParamMatcher;
