import { stringEnumValuesToMap } from '$lib/utils/enum';
import { stringEnumValuesToList } from '$lib/utils/enum';

export enum PartySize {
	Solo = 'solo',
	Duo = 'duo',
	Party = 'party',
	MultiParty = 'multi_party',
}

export const runCategoryValues = stringEnumValuesToList<PartySize>(PartySize);

const runCategoryMap = stringEnumValuesToMap<PartySize>(PartySize);
export const parsePartySize = (value: string | undefined) =>
	value ? runCategoryMap[value.toLowerCase()] : undefined;
