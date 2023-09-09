import type { PlayerInfoAutoFill } from '$lib/types/api/players/playerInfoAutoFill';
import { fetchGetApiCached } from '$lib/utils/fetch';
import { writable } from 'svelte/store';

const cacheTime = 300000; //5 mins

const { subscribe, set } = writable([] as PlayerInfoAutoFill[]);

const loadPlayerInfo = async () => {
	const response = await fetchGetApiCached<PlayerInfoAutoFill[]>(
		'/ngs-api/users',
		undefined,
		cacheTime
	);
	const playerNameIds = response ?? [];
	set(playerNameIds);
};

export const userInfo = { subscribe, loadPlayerInfo };
