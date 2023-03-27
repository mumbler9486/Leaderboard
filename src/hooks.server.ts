// hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { locale } from 'svelte-i18n';

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

export const handle: Handle = async ({ event, resolve }) => {
	const lang = browser
		? localStorage.getItem('language') ??
		  event.request.headers.get('accept-language')?.split(',')[0]
		: event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) {
		if (englishHandler.includes(lang)) {
			locale.set('en');
		} else {
			locale.set(lang);
		}
	}
	return resolve(event);
};
