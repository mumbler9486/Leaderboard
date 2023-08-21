import { stringEnumValuesToMap } from '$lib/utils/enum';

export enum Game {
	Pso2 = 'pso2',
	Ngs = 'ngs',
	Unknown = 'unknown'
}

const gameMap = stringEnumValuesToMap<Game>(Game);

export const parseGame = (str: string) => (!str ? undefined : gameMap[str.toLowerCase()]);
