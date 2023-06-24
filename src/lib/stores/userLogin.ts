import { persisted } from 'svelte-local-storage-store';
import { consentSelected } from './consent';
import { get } from 'svelte/store';
import type { Player } from '$lib/types/api/player';
import { fetchGetApi } from '$lib/utils/fetch';
import type { UserRole } from '$lib/types/api/users/userRole';

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

const clientPrinciplePersistedStore = persisted<ClientPrincipal | null>('clientPrinciple', null);
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

const userInfoPersistedStore = persisted<Player | undefined>('userInfo', undefined);
const refreshUserInfo = async (userGuid: string) => {
	if (!get(consentSelected)) {
		throw new Error('Not consented. Cannot fetch login.');
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
