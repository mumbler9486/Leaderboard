import { stringEnumValuesToMap } from '$lib/utils/enum';

export enum IndomitableBoss {
	NexAelio = 'nexaelio',
	RenusRetem = 'renusretem',
	AmsKvaris = 'amskvaris',
	NilsStia = 'nilsstia'
}

const runCategoryMap = stringEnumValuesToMap<IndomitableBoss>(IndomitableBoss);
export const parseIndomitableBoss = (value: string | undefined) =>
	value ? runCategoryMap[value.toLowerCase()] : undefined;
