import { browser, dev } from '$app/environment';

/**
 * Lazy-inject the MSW handler so that no errors happen during
 * build/runtime due to invalid imports from server/client.
 */
export async function inject() {
	if (dev && browser) {
		const { worker } = await import('./client/setup');
		return worker.start({ onUnhandledRequest: 'bypass' }).catch(console.warn);
	}
}
