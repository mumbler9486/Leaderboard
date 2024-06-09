import { stringEnumValuesToMap } from '$lib/utils/enum';
import { stringEnumValuesToList } from '$lib/utils/enum';

export enum PartySize {
	Solo = 'solo',
	Duo = 'duo',
	Party = 'party',
	MultiParty = 'multi-party',
}

export const partySizeTranslationMap: Record<PartySize, string> = {
	[PartySize.Solo]: `leaderboard.partySizes.${PartySize.Solo}`,
	[PartySize.Duo]: `leaderboard.partySizes.${PartySize.Duo}`,
	[PartySize.Party]: `leaderboard.partySizes.${PartySize.Party}`,
	[PartySize.MultiParty]: `leaderboard.partySizes.${PartySize.MultiParty}`,
};

export const runCategoryValues = stringEnumValuesToList<PartySize>(PartySize);

const runCategoryMap = stringEnumValuesToMap<PartySize>(PartySize);
export const parsePartySize = (value: string | undefined) =>
	!!value ? runCategoryMap[value.toLowerCase()] : undefined;

export const getPartySize = (value: number) => {
	if (value === 1) return PartySize.Solo;
	if (value === 2) return PartySize.Duo;
	if (value >= 3 && value <= 4) return PartySize.Party;
	if (value >= 5) return PartySize.MultiParty;
	return null;
};
