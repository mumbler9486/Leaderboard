// +layout.ts
import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import { consentPreferences } from '$lib/stores/consent';
import { get } from 'svelte/store';
var savedLanguage = browser ? localStorage.getItem('language') ?? null : null;

const englishHandler = [
	'en',
	'en-AU',
	'en-BZ',
	'en-CA',
	'en-CB',
	'en-GB',
	'en-IE',
	'en-JM',
	'en-NZ',
	'en-PH',
	'en-TT',
	'en-US',
	'en-ZA',
	'en-ZW'
];

export const load: LayoutLoad = async () => {
	if (browser) {
		if (savedLanguage === null && get(consentPreferences)) {
			var lang = englishHandler.includes(window.navigator.language)
				? 'en'
				: window.navigator.language;
			window.localStorage.setItem('language', lang);
			savedLanguage = lang;
		}
		locale.set(savedLanguage);
	}
	await waitLocale();
};
