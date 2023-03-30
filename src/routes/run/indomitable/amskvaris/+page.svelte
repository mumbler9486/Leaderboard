<script lang="ts">
	import { t } from 'svelte-i18n';
	import { browser } from '$app/environment';

	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import LeaderboardTitle from '$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte';

	import IndomitableRunFilters from '../IndomitableRunFilters.svelte';

	let parameterArray = {};

	let boardBody: any;

	if (browser) {
		let filter = new URLSearchParams(window.location.search);
		parameterArray.class = filter.get('class');
		parameterArray.videos = filter.get('videos');
		parameterArray.server = filter.get('server');
		parameterArray.patch = filter.get('patch');
		parameterArray.rank = filter.get('rank');
		parameterArray.region = filter.get('region');
		parameterArray.weapons = filter.get('weapons');
	}
</script>

<svelte:head>
	<title
		>{$t('shared.siteName')} | {$t('leaderboard.purpleTriggers')} - {$t(
			'common.playerCount.solo'
		)}</title
	>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<LeaderboardTitle category={$t('leaderboard.indomitableAmsKvaris')} />

	<div class="grow content-center">
		<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
			<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
				<IndomitableRunFilters />
				<!--LeaderboardSolo bind:data={parameterArray} bind:this={boardBody} /-->
			</div>
		</div>
	</div>

	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
