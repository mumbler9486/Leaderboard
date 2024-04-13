import { Game } from '$lib/types/api/game';
import type { ParamMatcher } from '@sveltejs/kit';

const validGames: string[] = [Game.Ngs, Game.Pso2];

export const match = ((param) => {
	const validQuest = validGames.includes(param.toLowerCase());
	return !!validQuest;
}) satisfies ParamMatcher;
