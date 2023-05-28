import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	const partySize = parsePartySize(param);
	return !!partySize;
}) satisfies ParamMatcher;
