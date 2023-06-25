import { persisted } from 'svelte-local-storage-store';
import { get, writable, type Readable } from 'svelte/store';
import type { Serializer } from './stringSerializer';
import { consentSelected } from './consent';

// Value to store as undefined in the persisted store
const UndefinedPersistedValue = undefined;

/**
 * Sets up a persisted store that saves to local storage only if
 * the user has consented to cookie + local store storage
 * Local storage will be undefined if not consented
 * Local storage will store the value immediately when the user
 * consents
 * @param key Local storage key
 * @param initialValue Initial value of the local storage
 * @param consentPreference Optional additional consent preference to observe
 * @param serializer Serializer for the local storage. Default is JSON.
 * @returns A writable store
 */
export const consentedPersisted = <T>(
	key: string,
	initialValue: T,
	consentPreference?: Readable<boolean>,
	serializer?: Serializer<T>
) => {
	const persistedOptions = {
		serializer
	};

	const persistedStore = persisted<T | undefined>(key, initialValue, persistedOptions);

	// Init store value
	const consented = get(consentSelected);
	const consentPref = consentPreference ? get(consentPreference) : true;
	const persistedValue = consented && consentPref ? get(persistedStore) : initialValue;
	const store = writable<T>(persistedValue);

	// Clear store if not currently consented
	if (!consented || !consentPref) {
		persistedStore.set(UndefinedPersistedValue);
	}

	// Save to store if consented
	store.subscribe((s) => {
		const consented = get(consentSelected);
		const consentPref = consentPreference ? get(consentPreference) : true;
		if (consented && consentPref) {
			persistedStore.set(s);
		} else {
			persistedStore.set(UndefinedPersistedValue);
		}
	});

	// Consent became true, store to local
	consentSelected.subscribe((consent) => {
		const consentPref = consentPreference ? get(consentPreference) : true;
		if (consent && consentPref) {
			persistedStore.set(get(store));
		} else {
			persistedStore.set(UndefinedPersistedValue);
		}
	});

	// Consent given for the preference, store to local
	if (consentPreference) {
		consentPreference.subscribe((consentPref) => {
			const consent = get(consentSelected);
			if (consent && consentPref) {
				persistedStore.set(get(store));
			} else {
				persistedStore.set(UndefinedPersistedValue);
			}
		});
	}

	return store;
};
