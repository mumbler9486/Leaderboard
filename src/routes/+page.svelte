<script lang="ts">
	import { t } from 'svelte-i18n';

	import { consentDiscord, consentSelected } from '$lib/stores/consent';
	import LeaderboardBanner from '$lib/components/LeaderboardBanner.svelte';
	import HomeBoardOverview from '$lib/components/widgets/HomeBoardOverview.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import RunStats from '$lib/components/widgets/RunStats.svelte';
	import DiscordWidget from '$lib/components/widgets/discord/DiscordWidget.svelte';
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
