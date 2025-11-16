import { stringEnumValuesToMap } from '$lib/utils/enum';

export enum NgsPlayerStyleClass {
	Adras = 'ngs_adras',
	Blitz = 'ngs_blitz',
	Celeste = 'ngs_celeste',
	None = 'ngs_none',
}

const playerStyleClassMap = stringEnumValuesToMap<NgsPlayerStyleClass>(NgsPlayerStyleClass);

export const parseNgsPlayerStyleClass = (str: string) =>
	!str ? undefined : playerStyleClassMap[str.toLowerCase()];
