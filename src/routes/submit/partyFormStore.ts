import { playerInfoStore } from '$lib/stores/userLogin';
import { get, writable } from 'svelte/store';

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

		const submitter = get(playerInfoStore);
		newPlayers[0] = {
			playerId: submitter?.playerId ?? -1,
			povVideoLink: undefined,
			playerName: submitter?.playerName ?? '',
			inVideoName: '',
			mainClass: '',
			subClass: '',
			weapons: []
		};

		return newPlayers;
	});
};

export const partyForm = {
	...partyFormStore,
	setPartySize
};
