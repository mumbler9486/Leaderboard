import { stringEnumValuesToMap } from '$lib/utils/enum';

export enum IndomitableBoss {
	NexAelio = 'nex_aelio',
	RenusRetem = 'renus_retem',
	AmsKvaris = 'ams_kvaris',
	NilsStia = 'nils_stia',
	Halvaldi = 'halvaldi',
	Zelvin = 'zelvin',
	Ringwedge = 'ringwedge',
}

const runCategoryMap = stringEnumValuesToMap<IndomitableBoss>(IndomitableBoss);
export const parseIndomitableBoss = (value: string | undefined) =>
	value ? runCategoryMap[value.toLowerCase()] : undefined;
