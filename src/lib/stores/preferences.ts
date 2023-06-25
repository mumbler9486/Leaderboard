import { persisted } from 'svelte-local-storage-store';
import { stringSerializer } from './stringSerializer';
import { consentedPersisted } from './gdprStoreFactory';
import { consentPreferences } from './consent';

// Consent selected must be confirmed before these settings can be used
export const siteLanguage = consentedPersisted(
	'language',
	'en',
	consentPreferences,
	stringSerializer
);
export const userStreamerMode = persisted('user-streamermode', false);
