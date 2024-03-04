<script lang="ts">
	import LeaderboardBanner from '../lib/Components/LeaderboardBanner.svelte';

	import { t } from 'svelte-i18n';

	import DiscordWidget from '$lib/Widgets/Discord/DiscordWidget.svelte';
	import RunStatsWidget from '$lib/Widgets/RunStatsWidget.svelte';
	import { consentDiscord, consentSelected } from '$lib/stores/consent';
	import RecentNews from './info/news/RecentNews.svelte';
	import Panel from '$lib/Components/Panel.svelte';
</script>

<svelte:head>
	<title>{$t('shared.siteName')}</title>
</svelte:head>
<LeaderboardBanner />
<div class="grid grid-cols-3 gap-2">
	<div class="col-span-2 row-span-2">
		<Panel title="News">
			<div class="px-4 pb-4 sm:px-8">
				<RecentNews />
			</div>
		</Panel>
	</div>
	<div class="col-start-3 flex flex-col items-start gap-2">
		<RunStatsWidget />
		{#if $consentSelected && $consentDiscord}
			<DiscordWidget />
		{/if}
	</div>
</div>
