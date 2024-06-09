<script lang="ts">
	import LeaderboardBanner from '../lib/Components/LeaderboardBanner.svelte';

	import { t } from 'svelte-i18n';

	import DiscordWidget from '$lib/Widgets/Discord/DiscordWidget.svelte';
	import { consentDiscord, consentSelected } from '$lib/stores/consent';
	import RecentNews from './info/news/RecentNews.svelte';
	import Panel from '$lib/Components/Panel.svelte';
	import HomeBoardOverview from '$lib/Widgets/HomeBoardOverview.svelte';
	import RunStats from '$lib/Widgets/SoloStats.svelte';
</script>

<svelte:head>
	<title>{$t('shared.siteName')}</title>
</svelte:head>
<LeaderboardBanner />
<div class="my-4 flex grow flex-col gap-2 lg:grid lg:flex-none lg:grid-cols-3 lg:px-2">
	<div class="flex flex-col gap-2 lg:col-span-2">
		<Panel>
			<HomeBoardOverview />
		</Panel>
		<RunStats />
		<div class="hidden lg:block">
			<Panel title="News">
				<div class="px-4 pb-4 sm:px-8">
					<RecentNews />
				</div>
			</Panel>
		</div>
	</div>
	<div class="flex flex-col gap-4 lg:hidden">
		<Panel title="News">
			<div class="px-4 pb-4 sm:px-8">
				<RecentNews />
			</div>
		</Panel>
	</div>
	{#if $consentSelected && $consentDiscord}
		<div>
			<DiscordWidget />
		</div>
	{/if}
</div>
