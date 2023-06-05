import { persisted } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

const consentSelectedStore = persisted('consent-selected', false);
let consentSelectedCurrent = true;

consentSelectedStore.subscribe((consent) => {
	console.debug(`Consent loaded. Value=${consent}`);
	consentSelectedCurrent = consent;
});

export const consentSelected = writable(consentSelectedCurrent);
consentSelected.subscribe((selection) => {
	consentSelectedStore.set(selection);
});

// Consent selected must be confirmed before these settings can be used
export const consentPreferences = persisted('consent-preferences', false);
export const consentTwitch = persisted('consent-twitch', false);
export const consentGoogle = persisted('consent-google', false);
export const consentDiscord = persisted('consent-discord', false);
