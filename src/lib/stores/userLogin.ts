import { consentSelected } from './consent';
import { get, writable } from 'svelte/store';
import type { Player } from '$lib/types/api/players/player';
import { fetchGetApi } from '$lib/utils/fetch';
import type { UserRole } from '$lib/types/api/users/userRole';
import { consentedPersisted } from './gdprStoreFactory';

export interface ClientPrincipal {
	identityProvider: string;
	userId: string;
	userDetails: string;
	userRoles: UserRole[];
	claims: {
		typ: string;
		val: string;
	}[];
}

const clientPrinciplePersistedStore = consentedPersisted<ClientPrincipal | null>(
	'clientPrinciple',
	null
);
const fetchClientPrinciple = async () => {
	if (!get(consentSelected)) {
		throw new Error('Not consented. Cannot fetch login.');
	}

	try {
		const clientPrincipal = (
			await fetchGetApi<{ clientPrincipal: ClientPrincipal | null }>('/.auth/me')
		).clientPrincipal;
		clientPrinciplePersistedStore.set(clientPrincipal);
		return clientPrincipal;
	} catch (err) {
		console.log(err);
	}
	return null;
};

const userInfoPersistedStore = writable<Player | undefined>(undefined);
const refreshUserInfo = async () => {
	const userGuid = get(clientPrincipleStore)?.userId;
	if (!userGuid) {
		throw new Error('Not logged in');
	}

	const player = await fetchGetApi<Player>(`/ngs-api/users/${userGuid}`);
	userInfoPersistedStore.set(player);
	return player;
};

export const playerInfoStore = {
	subscribe: userInfoPersistedStore.subscribe,
	refreshInfo: refreshUserInfo
};

export const clientPrincipleStore = {
	subscribe: clientPrinciplePersistedStore.subscribe,
	fetchClientPrinciple
};
