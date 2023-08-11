<script lang="ts">
	import { t } from 'svelte-i18n';

	import HomeNews from '$lib/PageComponents/News/HomeNews.svelte';
	import DiscordWidget from '$lib/Widgets/Discord/DiscordWidget.svelte';
	import RunStatsWidget from '$lib/Widgets/RunStatsWidget.svelte';
	import { consentDiscord, consentSelected } from '$lib/stores/consent';
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
				<div class="text-center text-4xl font-light">News</div>
				<HomeNews>
					<span slot="newsTitle">Leaderboard 3.2.2 Update</span>
					<p slot="newsContent">
						<strong>Changelog (August 10, 2023):</strong><br />
						<li class="pt-4">
							<strong>⭐➖ New Standing Quest Leaderboard: Dark Falz Solus</strong><br />
							<p>
								A new boss Dark Falz Solus has been added to the leaderboard. The official release
								date for the quest is Aug 9, 2023.
							</p>
							<p class="pt-2">
								Some minor layout changes and some general improvements. This update prepares the
								leaderboard for the upcoming data migrations so we can improve the development speed
								of new quests and bosses as they are added into the game.
							</p>
							<p class="pt-2">
								As usual if there are issues please contact us on
								<a
									href="https://discord.com/invite/fFtEEJHuFp"
									target="_blank"
									rel="noreferrer noopener"
									class="link-primary link no-underline">Discord <i class="bi bi-discord" /></a
								>.
							</p>
						</li>
					</p>
				</HomeNews>
				<HomeNews>
					<span slot="newsTitle">Leaderboard 3.2.1 Update</span>
					<p slot="newsContent">
						<strong>Changelog (June 18, 2023):</strong><br />
						<li class="pt-4">
							<strong>⚔️ New Duel Boss: Halvaldi</strong><br />
							<p>
								A new duel boss Halvaldi has been added to the leaderboard. The official release
								date for the quest is June 21st, 2023.
							</p>
							<p class="pt-2">
								Also we performed some minor data migrations in the backend. These should have no
								impact on the site operations but as usual if there are issues please contact us on
								<a
									href="https://discord.com/invite/fFtEEJHuFp"
									target="_blank"
									rel="noreferrer noopener"
									class="link-primary link no-underline">Discord <i class="bi bi-discord" /></a
								>.
							</p>
						</li>
					</p>
				</HomeNews>
				<HomeNews>
					<span slot="newsTitle">Leaderboard 3.2 Update</span>
					<p slot="newsContent">
						<strong>Changelog (June 14, 2023):</strong><br />
						<li class="pt-4">
							<strong>⏫ Patch Bump for Level 75 Release</strong><br />
							All runs submitted from this point on will be considered part of the level 75 release patch.
							This patch brings about skill re-balances from June 7th's update, Rarity 9⭐ weapons, Dark
							Falz Aegis Level 75 (but still rank 1), and of course the level cap increase to 75.
						</li>
						<li class="pt-4">
							<strong>⚠ New Time Submission Rules</strong><br />
							<p>
								It has come to our attention that we need to have more consistent time measuring
								with regards to how times are submitted on our leaderboard. The new rule now
								requires the "remaining time" to be submitted instead of the usual (Time Limit) -
								(Time Remaining) = Submission Time. This is because if a timer shows 19:59/20:00,
								technically a whole second has not passed until the timer updates with a time of
								19:58/20:00.
							</p>
							<p class="pt-2">
								The UI has been adjusted to reflect this so please take care. Currently only Purple
								Triggers have the new remaining time input system. However Dark Falz Aegis (solo and
								party) and the Duel runs still use the previous elapsed time system and are still
								under consideration.
							</p>
							<p class="pt-2">
								We wanted to make everyone's submissions more accurate and consistent so we also
								went through all Purple Trigger runs manually and issued a new time. In all cases
								everyone's time has either stayed the same or improved by 1 second by the new rule.
								If you have any questions or concerns contact us on our Discord.
							</p>
						</li>
						<li class="pt-4">
							<strong>💄 New Submission Landing Page</strong><br />
							The <a href="/submit">Submit a Run</a> page now has a new landing page. This will make
							it easier for us to implement quest specific logic and have more leaderboard categories
							in the future.
						</li>
					</p>
				</HomeNews>
				<HomeNews>
					<span slot="newsTitle">Leaderboard 3.1 Update</span>
					<p slot="newsContent">
						<strong>Changelog (April 19, 2023):</strong><br />
						<li class="pt-4">
							<strong>⚔️ Indomitable Duel Runs now Accepting Submissions</strong><br />
							Duel runs can now be submitted to the leaderboard. Please take note if you have used the
							special Duel augments or not.
						</li>
						<li class="pt-4">
							<strong>⏫ About Special Duel Augments (Defi-Series)</strong><br />
							Any run submitted to the duels that uses at least one Defi-series augment on that player's
							equipment is considered to have used a Defi-augment. Please specify when submitting your
							duel runs.
						</li>
						<li class="pt-4">
							<strong>✨ New Patch for All Submissions</strong><br />
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
				{#if $consentSelected && $consentDiscord}
					<DiscordWidget />
				{/if}
				<RunStatsWidget />
			</div>
		</div>
	</div>
</div>
