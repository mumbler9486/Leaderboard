// hooks.server.ts
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { browser } from '$app/environment';
import { locale } from 'svelte-i18n';
import * as dotenv from 'dotenv';
dotenv.config();

const appInsights = new ApplicationInsights({
	config: {
		connectionString: process.env.APPLICATION_INSIGHTS_CONNECTION_STRING
	}
});
appInsights.loadAppInsights();
appInsights.trackPageView();

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

export const handleError = (({ error, event }) => {
	console.error(error);
	return {
		message: 'Internal Server Error',
		code: 'unexpected'
	};
}) satisfies HandleServerError;
