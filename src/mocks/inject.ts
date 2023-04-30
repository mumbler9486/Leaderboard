import { browser, dev } from '$app/environment';

/**
 * Lazy-inject the MSW handler so that no errors happen during
 * build/runtime due to invalid imports from server/client.
 */
export async function inject() {
	if (dev && browser && import.meta.env.VITE_MSW_SERVER_ONLY !== 'true') {
		console.log('Client MSW started');
		const { worker } = await import('./client/worker');
		return worker.start({ onUnhandledRequest: 'bypass' }).catch(console.warn);
	}
	if (dev && !browser) {
		console.log('Server MSW started');
		const { server } = await import('./server/server');
		return server.listen({ onUnhandledRequest: 'bypass' });
	}
}
