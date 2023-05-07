import { stringEnumValuesToMap } from '$lib/utils/enum';
import { stringEnumValuesToList } from '$lib/utils/enum';

export enum RunCategories {
	PurpleSolo = 'purpleSolo',
	PurpleDuo = 'purpleDuo',
	PurpleParty = 'purpleParty',
	DfaSolo = 'dfaSolo',
	DfaDuo = 'dfaDuo',
	DfaParty = 'dfaParty',
	IndomitableNexAelio = 'indomitableNexAelio',
	IndomitableRenusRetem = 'indomitableRenusRetem',
	IndomitableAmsKvaris = 'indomitableAmsKvaris',
	IndomitableNilsStia = 'indomitableNilsStia'
}

export const runCategoryValues = stringEnumValuesToList<RunCategories>(RunCategories);

const runCategoryMap = stringEnumValuesToMap<RunCategories>(RunCategories);
export const parseRunCategory = (value: string | undefined) =>
	value ? runCategoryMap[value.toLowerCase()] : undefined;
