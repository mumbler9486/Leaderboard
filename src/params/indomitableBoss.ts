import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';
import type { ParamMatcher } from '@sveltejs/kit';

const indomitableBosses: { [key: string]: boolean } = {
	[IndomitableBoss.NexAelio]: true,
	[IndomitableBoss.RenusRetem]: true,
	[IndomitableBoss.AmsKvaris]: true,
	[IndomitableBoss.NilsStia]: true
};

export const match = ((param) => {
	const validBoss = indomitableBosses[param.toLowerCase()];
	return !!validBoss;
}) satisfies ParamMatcher;
