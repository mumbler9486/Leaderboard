import { playerInfoStore } from '$lib/stores/userLogin';
import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { get, writable } from 'svelte/store';

interface PlayerSubmissionInfo {
	playerId: number;
	createPlayer: boolean;
	povVideoLink?: string;
	playerName: string;
	inVideoName: string;
	mainClass: NgsPlayerClass;
	subClass: NgsPlayerClass;
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
			createPlayer: false,
			povVideoLink: undefined,
			playerName: '',
			inVideoName: '',
			mainClass: NgsPlayerClass.Unknown,
			subClass: NgsPlayerClass.Unknown,
			weapons: [],
		}));

		const submitter = get(playerInfoStore);
		newPlayers[0] = {
			playerId: submitter?.playerId ?? -1,
			createPlayer: false,
			povVideoLink: undefined,
			playerName: submitter?.playerName ?? '',
			inVideoName: '',
			mainClass: NgsPlayerClass.Unknown,
			subClass: NgsPlayerClass.Unknown,
			weapons: [],
		};

		return newPlayers;
	});
};

export const partyForm = {
	...partyFormStore,
	setPartySize,
};
