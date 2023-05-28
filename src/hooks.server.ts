// hooks.server.ts
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { browser } from '$app/environment';
import { locale } from 'svelte-i18n';
import * as dotenv from 'dotenv';
dotenv.config();

const appInsights = new ApplicationInsights({
	config: {
		connectionString: 'InstrumentationKey=eaf7ea8c-2092-48cb-b341-b4b00f7e614c;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/'
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
