// +layout.ts
import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
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
		if (savedLanguage === null && window.localStorage.getItem('consent-preferences') === 'true') {
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
