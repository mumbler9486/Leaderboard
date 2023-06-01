import { writable } from 'svelte/store';

interface PlayerSubmissionInfo {
	playerId: number;
	povVideoLink?: string;
	playerName: string;
	inVideoName: string;
	playerServer: string;
	mainClass: string;
	subClass: string;
	weapons: string[];
}

export const partyForm = writable([] as PlayerSubmissionInfo[]);

export const setPartySize = (playerCount: number) => {
	partyForm.update((f) => {
		if (playerCount == 0) {
			return [];
		}

		const newPlayers = [...Array(playerCount).keys()].map((p) => ({
			playerId: -1,
			povVideoLink: undefined,
			playerName: '',
			inVideoName: '',
			playerServer: '',
			mainClass: '',
			subClass: '',
			weapons: []
		}));
		return newPlayers;
	});
};
