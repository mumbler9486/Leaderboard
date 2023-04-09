import { writable } from 'svelte/store';

interface UserList {
	PlayerName: string;
	PlayerID: number;
	CharacterName: string;
}

const { subscribe, set } = writable([] as UserList[]);

export const userInfo = { subscribe };

export const loadPlayerInfo = async () => {
	const response = await fetch('/ngs-api/GetNamesIDs', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const playerNameIds = (await response.json()) as UserList[];

	set(playerNameIds);
};
