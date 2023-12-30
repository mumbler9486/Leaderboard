<script lang="ts">
	import { t } from 'svelte-i18n';

	import HomeNews from '$lib/PageComponents/News/HomeNews.svelte';
	import DiscordWidget from '$lib/Widgets/Discord/DiscordWidget.svelte';
	import RunStatsWidget from '$lib/Widgets/RunStatsWidget.svelte';
	import { consentDiscord, consentSelected } from '$lib/stores/consent';
	import DiscordContact from '$lib/Components/DiscordContact.svelte';
</script>

<svelte:head>
	<title>{$t('shared.siteName')}</title>
</svelte:head>
<div class="flex grow flex-col content-center">
	<img
		class="pointer-events-none mx-8 my-16 object-scale-down drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] md:my-0"
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
					<span slot="newsTitle">Leaderboard January 2024 Updates</span>
					<div slot="newsContent">
						<strong>📅Patch Codes List</strong><br />
						<p class="pt-2">
							Not much in terms of in-game content releasing this month. For the team at the
							leaderboards we plan to add some new useful information pages for rules, submission
							guidelines, patch codes, and other tips for the leaderboard. The patch codes info page
							has been released: <a class="link" href="/info">Check it out!</a>
						</p>
						<p class="pt-2">Happy new year from us at PSO2 Central! 🎉</p>
					</div>
				</HomeNews>
				<HomeNews>
					<span slot="newsTitle">Leaderboard December 2023 Updates</span>
					<div slot="newsContent">
						<strong>⤴ Patch Bump</strong><br />
						<p class="pt-2">
							From Dec 6th's Game Maintenance, we will increase the patch to "+80 Weap. Release".
							This release of the game will feature +80 weapon grind and a host of new PA
							customizations. All runs submitted at this point will be on the new patch.
						</p>
						<strong>⤴ New Aelio and Retem Purple Ranks</strong><br />
						<p class="pt-2">
							Also from Dec 6th, Aelio and Retem Battledia Purple quests will have new ranks. The
							new rank will be the default for submissions and the board. Old ranks can still be
							viewed and submitted to.
						</p>
						<strong>😈 Malignant Dark Falz Aegis</strong><br />
						<p class="pt-2">
							From Dec 14th's Game Maintenance, Malignant Dark Falz Aegis will be released. This
							quest is similar to that of the 4-player Dark Falz Solus but it is Aegis instead. We
							will consider this quest a new category but it will be the default category for Aegis
							when you visit the boards. The old boards for the other Aegis categories can still be
							visited however.
						</p>
					</div>
				</HomeNews>
				<HomeNews>
					<span slot="newsTitle">Leaderboard 3.2.5 Update (Nov 2023)</span>
					<div slot="newsContent">
						<strong>Changelog (Nov 11, 2023):</strong><br />
						<strong>⭐⚠ Urgent Quest Solus Category</strong><br />
						<p class="pt-2">
							On November 15th 2023, Sega will release a Urgent Quest version of Dark Falz Solus. We
							will support this quest as a new category for this Boss. The leaderboard for this
							ready for submission but we might make minor adjustments when the request is actually
							released.
						</p>
					</div>
				</HomeNews>
				<HomeNews>
					<span slot="newsTitle">Leaderboard 3.2.4 Update (Oct 2023)</span>
					<div slot="newsContent">
						<strong>Changelog (Oct 17, 2023):</strong><br />
						<strong>⚔ Duel Boss Zelvin</strong><br />
						<p class="pt-2">
							Early release of Zelvin Duel boss. Actual in game quest will be released after the
							maintenance on October 18, 2023. Looking forward to see those runs!
						</p>
						<strong>👤 My Runs Page</strong><br />
						<p class="py-2">
							A new page was added to allow you to see all the runs you have submitted to us along
							with their status. The new page is next to the Profile menu. Check it out! You can
							also see the runs that you have participated in in other player's submissions as well
							provided they linked your name to it.
						</p>
						<p>
							If a run is rejected we will note it in the "Mod Notes" field. Feel free to contact us
							on <DiscordContact /> should you need to clarify or dispute.
						</p>
					</div>
				</HomeNews>
				<HomeNews>
					<span slot="newsTitle">Upcoming Leaderboard Updates (Oct 2023)</span>
					<div slot="newsContent">
						<strong>🤖 Venogia Leaderboard (October 1, 2023)</strong><br />
						<p class="pt-2">
							Belated arrival of the Remnants of Ambition Urgent Quest leaderboard is now accepting
							submissions. Sorry for the delay! It was postponed in favor of Dark Falz Solus.
						</p>
						<p class="py-2">
							Since level 80 is coming soon, there might be a chance that you have runs from the
							level 75 patch era. If this applies to you, make a note in your run notes or contact a
							moderator on Discord and we will take care of the patch.
						</p>
						<strong>↗ Patch Level 80 (October 11, 2023)</strong><br />
						<p class="py-2">
							Level 80 will be arriving on Oct 11, so we will increase the patch code to level 80.
							If you have any runs from prior to level 80 please let us know on discord and we can
							adjust your patch level as appropriate.
						</p>
						<p class="py-2">
							Additionally, the game will also change the maximum time for duel quests quest from
							5min -&gt; 10 minutes, nullify region mag effects, and "HP of enemies has been
							lowered". We are not exactly sure at this time how it will effect new submissions to
							the bosses but we will play by ear and adjust accordingly.
						</p>
						<strong>⚔ New Duel Boss Zelvin (October 18, 2023)</strong><br />
						<p class="py-2">
							A new duel boss (phase 3) is coming and we will add a new leaderboard. Note that the
							changes to the duel bosses is on October 11th.
						</p>
						<p class="pt-2">
							As usual if there are issues please contact us on <DiscordContact />.
						</p>
					</div>
				</HomeNews>
				<HomeNews>
					<span slot="newsTitle">Leaderboard 3.2.3 Update</span>
					<div slot="newsContent">
						<strong>Changelog (August 17, 2023):</strong><br />
						<div class="pt-4">
							<strong>🚚 Data Migrations Complete</strong><br />
							<p>
								In order to implement new quests and categories at a faster and more maintainable
								rate we consolidated all the run data and player data on our backend database. These
								migrations have been completed as of August 17, 2023.
							</p>
							<div class="pt-2">
								With the new data infrastructure in place we had to add additional changes to
								submissions so that all runs from all quests+categories are consistent. These are:
								<div class="my-2 pl-2">
									<p>
										1. Player entries no longer require a server region. The server region that the
										run was executed is per run instead of by player "one". With that, all runs on
										the leaderboard have been assigned a run region (japan/global) based on evidence
										in your run's video (usually by fan translation distinction) if they have not
										before.
									</p>
									<p>
										2. Runs tied by time (1 second precision) are awarded the same rank. Times
										submitted earlier will still be ordered on first within the same time.
									</p>
									<p>
										3. We did not have "submission dates" for runs in the early days of the
										leaderboard. If your run was fairly old, we went by the youtube video's
										publication date.
									</p>
									<p>4. It is now optional to provide a server region in your profile (ARKS ID).</p>
								</div>
							</div>
							<p class="pt-2">
								Moving forward we hope to implement more run quests (e.g., Venogia UQ) and be able
								to adapt to new updates from SEGA as they happen.
							</p>
							<p class="pt-2">
								As usual if there are issues or inaccuracies please contact us on
								<a
									href="https://discord.com/invite/fFtEEJHuFp"
									target="_blank"
									rel="noreferrer noopener"
									class="link-primary link no-underline">Discord <i class="bi bi-discord" /></a
								> and we can get your run updated. Thank you for your patience.
							</p>
						</div>
					</div>
				</HomeNews>
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
								As usual if there are issues please contact us on <DiscordContact />.
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
								impact on the site operations but as usual if there are issues please contact us on <DiscordContact
								/>.
							</p>
						</li>
					</p>
				</HomeNews>
			</div>
			<div
				class="mt-0 flex grow basis-full flex-col-reverse overflow-x-auto md:mt-2 md:basis-1/3 md:flex-col"
			>
				<RunStatsWidget />
				{#if $consentSelected && $consentDiscord}
					<DiscordWidget />
				{/if}
			</div>
		</div>
	</div>
</div>
