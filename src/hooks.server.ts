// hooks.server.ts
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { initYupLocale } from '$lib/types/api/validation/schemaInitLocale';

initYupLocale();

export const handle: Handle = async ({ event, resolve }) => {
	const isMswEnabled = dev && import.meta.env.VITE_MSW_ENABLED === 'true';
	if (isMswEnabled) {
		const mockClientPrincipal = await import('./mocks/client/auth.handlers').then(
			(res) => res.authHeaderObject.clientPrincipal
		);
		event.locals.clientPrincipal = mockClientPrincipal;
	} else {
		// Client Principal only available on routes that are protected by roles
		// See https://github.com/geoffrich/svelte-adapter-azure-swa/blob/main/index.d.ts#L27
		event.locals.clientPrincipal = event.platform?.clientPrincipal;
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
