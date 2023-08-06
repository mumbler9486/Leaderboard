import { Game } from '$lib/types/api/game';

export enum GameDbValue {
	Pso2 = 'pso2',
	Ngs = 'ngs'
}

const dbToGameMap: Record<string, Game> = {
	[GameDbValue.Pso2]: Game.Pso2,
	[GameDbValue.Ngs]: Game.Ngs
};

const gameToDbMap: Record<Game, GameDbValue | undefined> = {
	[Game.Pso2]: GameDbValue.Pso2,
	[Game.Ngs]: GameDbValue.Ngs,
	[Game.Unknown]: undefined
};

export const mapDbValToGame = (dbClass: string | undefined) =>
	!dbClass ? Game.Unknown : dbToGameMap[dbClass] ?? Game.Unknown;

export const mapGameToDbVal = (ngsClass: Game | undefined) =>
	!ngsClass ? undefined : gameToDbMap[ngsClass];
