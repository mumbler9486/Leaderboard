import { persisted } from 'svelte-local-storage-store';

export const consentSelected = persisted('consent', false);

// Consent selected must be confirmed before these settings can be used
export const consentPreferences = persisted('consent-preferences', false);
export const consentTwitch = persisted('consent-twitch', false);
export const consentGoogle = persisted('consent-google', false);
export const consentDiscord = persisted('consent-discord', false);
