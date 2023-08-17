import { writable } from 'svelte/store';

interface PlayerSubmissionInfo {
	playerId: number;
	povVideoLink?: string;
	playerName: string;
	inVideoName: string;
	mainClass: string;
	subClass: string;
	weapons: string[];
}

const partyFormStore = writable([] as PlayerSubmissionInfo[]);

const setPartySize = (playerCount: number) => {
	partyFormStore.update((f) => {
		if (playerCount == 0) {
			return [];
		}

		const newPlayers = [...Array(playerCount).keys()].map((p) => ({
			playerId: -1,
			povVideoLink: undefined,
			playerName: '',
			inVideoName: '',
			mainClass: '',
			subClass: '',
			weapons: []
		}));
		return newPlayers;
	});
};

export const partyForm = {
	...partyFormStore,
	setPartySize
};
