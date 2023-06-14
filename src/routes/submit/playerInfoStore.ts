import type { PlayerInfoAutoFill } from '$lib/types/api/players/playerInfoAutoFill';
import { fetchGetApi } from '$lib/utils/fetch';
import { writable } from 'svelte/store';

const { subscribe, set } = writable([] as PlayerInfoAutoFill[]);

const loadPlayerInfo = async () => {
	const response = await fetchGetApi<PlayerInfoAutoFill[]>('/ngs-api/users');
	const playerNameIds = response ?? [];
	set(playerNameIds);
};

export const userInfo = { subscribe, loadPlayerInfo };
