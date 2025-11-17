<script lang="ts">
	import '../app.css';
	import GDPRCookieConsent from '$lib/Widgets/GDPRCookieConsent.svelte';
	import LeaderboardHeader from '$lib/PageComponents/Header/LeaderboardHeader.svelte';
	import LeaderboardFooter from '$lib/PageComponents/Header/LeaderboardFooter.svelte';
	import BackgroundRandomizer from '$lib/PageComponents/BackgroundRandomizer.svelte';
	import { dev } from '$app/environment';
	import { t } from 'svelte-i18n';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const isMswEnabled = dev && import.meta.env.VITE_MSW_ENABLED === 'true';
	let isReady = $state(!isMswEnabled);

	// if (isMswEnabled) {
	// 	// Lazy load so we tree shake it out
	// 	import('../mocks/inject').then((res) => res.inject()).then(() => (isReady = true));
	// }
</script>

<svelte:head>
	<title>{$t('shared.siteName')}</title>
</svelte:head>

<!-- {#if isReady} -->
<GDPRCookieConsent />
<BackgroundRandomizer />
<LeaderboardHeader>
	<div class="container mx-auto">
		{@render children?.()}
	</div>
</LeaderboardHeader>
<LeaderboardFooter />
<!-- {/if} -->
