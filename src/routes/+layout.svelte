<script lang="ts">
	import '../app.css';
	import { dev, browser } from '$app/environment';
	let consent = browser ? localStorage.getItem('consent') ?? null : 'waiting';
	import GDPRCookieConsent from '$lib/cookieconsent/GDPRCookieConsent.svelte';

	const isMswEnabled = dev && import.meta.env.VITE_MSW_ENABLED === 'true';
	let isReady = !isMswEnabled;

	if (isMswEnabled) {
		import('../mocks/inject').then((res) => res.inject()).then(() => (isReady = true));
	}
</script>

{#if isReady}
	{#if consent === null}
		<GDPRCookieConsent />
	{/if}

	<slot />
{/if}
