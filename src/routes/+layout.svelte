<script lang="ts">
	import '../app.css';
	import GDPRCookieConsent from '$lib/Widgets/GDPRCookieConsent.svelte';
	import LeaderboardHeader from '$lib/PageComponents/Header/LeaderboardHeader.svelte';
	import LeaderboardFooter from '$lib/PageComponents/Header/LeaderboardFooter.svelte';
	import BackgroundRandomizer from '$lib/PageComponents/BackgroundRandomizer.svelte';
	import { dev } from '$app/environment';
	import { consentSelected } from '$lib/stores/consent';

	const isMswEnabled = dev && import.meta.env.VITE_MSW_ENABLED === 'true';
	let isReady = !isMswEnabled;

	if (isMswEnabled) {
		import('../mocks/inject').then((res) => res.inject()).then(() => (isReady = true));
	}
</script>

{#if isReady}
	<GDPRCookieConsent />
	<div class="flex min-h-screen flex-col">
		<LeaderboardHeader />
		<slot />
		<LeaderboardFooter />
	</div>
	<BackgroundRandomizer />
{/if}
