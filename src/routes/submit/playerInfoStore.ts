import type { PlayerInfoAutoFill } from '$lib/types/api/players/playerInfoAutoFill';
import { writable } from 'svelte/store';

const { subscribe, set } = writable([] as PlayerInfoAutoFill[]);

const loadPlayerInfo = async () => {
	const response = await fetch('/ngs-api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const playerNameIds = (await response.json()) as PlayerInfoAutoFill[];
	set(playerNameIds);
};

export const userInfo = { subscribe, loadPlayerInfo };
