<script lang="ts">
	import { t } from 'svelte-i18n';
	import { browser } from '$app/environment';

	import HomeNews from '$lib/NewsComponents/HomeNews.svelte';
	import DiscordWidget from '$lib/DiscordComponents/DiscordWidget.svelte';
	import RunStatsWidget from '$lib/Widgets/RunStatsWidget.svelte';

	let consentDiscord = false;

	if (browser) {
		consentDiscord = (localStorage.getItem('consent-discord') ?? false) === 'true';
	}
</script>

<svelte:head>
	<title>{$t('shared.siteName')}</title>
</svelte:head>
<div class="flex grow flex-col content-center">
	<img
		class="my-16 mx-8 object-scale-down drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] md:my-0"
		alt={$t('shared.siteName')}
		src="/logos/logo.png"
	/>
	<div class="container mx-auto mb-16 rounded-md border border-secondary bg-base-100/75">
		<div class="align-center flex flex-col md:flex-row">
			<div
				class="m-2 basis-full rounded-md border border-secondary bg-base-100 p-4 px-8 md:basis-2/3"
			>
				<HomeNews>
					<span slot="newsTitle">Leaderboard 3.1 Update</span>
					<p slot="newsContent">
						<strong>Changelog:</strong><br />
						<li class="pt-4">
							<strong>⚔️Indomitable Duel Runs now Accepting Submissions</strong><br />
							Duel runs can now be submitted to the leaderboard. Please take note if you have used the
							special Duel augments or not.
						</li>
						<li class="pt-4">
							<strong>⏫About Special Duel Augments (Defi-Series)</strong><br />
							Any run submitted to the duels that uses at least one Defi-series augment on that player's
							equipment is considered to have used a Defi-augment. Please specify when submitting your
							duel runs.
						</li>
						<li class="pt-4">
							<strong>✨New Patch for All Submissions</strong><br />
							Since weapon Potentials level 6 released alongside Duel runs, all new runs submitted will
							be part of this new patch.
						</li>
						<br />
						<span class="pt-4">
							Any questions or issues please contact us on our <a
								href="https://discord.com/invite/fFtEEJHuFp"
								target="_blank"
								rel="noreferrer noopener"
								class="link-primary link no-underline">Discord <i class="bi bi-discord" /></a
							>
						</span>
					</p>
				</HomeNews>
			</div>
			<div
				class="mt-0 flex grow basis-full flex-col-reverse overflow-x-auto md:mt-2 md:basis-1/3 md:flex-col"
			>
				{#if consentDiscord}
					<div class="m-2 mt-0 grow md:ml-0">
						<DiscordWidget />
					</div>
				{/if}
				<RunStatsWidget />
			</div>
		</div>
	</div>
</div>
