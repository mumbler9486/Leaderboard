import type { PlayerInfo } from '../runs/run';

export interface PlayerSearchResult {
	playerId: number;
	playerName: string;
	playerInfo: PlayerInfo;
}
