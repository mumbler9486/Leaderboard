import { persisted } from 'svelte-local-storage-store';
import { stringSerializer } from './stringSerializer';

// Consent selected must be confirmed before these settings can be used
export const siteLanguage = persisted('language', '', {
	serializer: stringSerializer
});
export const userStreamerMode = persisted('user-streamermode', false);
