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
