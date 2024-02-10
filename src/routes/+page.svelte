<script lang="ts">
	import { t } from 'svelte-i18n';

	import DiscordWidget from '$lib/Widgets/Discord/DiscordWidget.svelte';
	import RunStatsWidget from '$lib/Widgets/RunStatsWidget.svelte';
	import { consentDiscord, consentSelected } from '$lib/stores/consent';
	import AllNews from './info/news/articles/AllNews.svelte';
</script>

<svelte:head>
	<title>{$t('shared.siteName')}</title>
</svelte:head>
<div class="flex grow flex-col content-center">
	<img
		class="pointer-events-none mx-8 my-16 select-none object-scale-down drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] lg:my-0"
		alt={$t('shared.siteName')}
		src="/logos/logo.png"
	/>
	<div class="container mx-auto mb-16 rounded-md border border-secondary bg-base-100/75">
		<div class="align-center flex flex-col lg:flex-row">
			<div class="m-2 rounded-md border border-secondary bg-base-100 p-4 px-8 lg:basis-2/3">
				<div class="text-center text-4xl font-light">News</div>
				<AllNews />
			</div>
			<div class="mt-0 flex grow flex-col-reverse overflow-x-auto lg:mt-2 lg:basis-1/3 lg:flex-col">
				<RunStatsWidget />
				{#if $consentSelected && $consentDiscord}
					<DiscordWidget />
				{/if}
			</div>
		</div>
	</div>
</div>
