import { persisted } from 'svelte-local-storage-store';

export const userStreamerMode = persisted('user-streamermode', false);
