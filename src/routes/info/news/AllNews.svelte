<script>
	import DiscordContact from '$lib/Components/DiscordContact.svelte';
	import HomeNews from '$lib/PageComponents/News/HomeNews.svelte';
	import NewsSection from '$lib/PageComponents/News/NewsSection.svelte';
	import RecentNews from './RecentNews.svelte';
</script>

<RecentNews />

<HomeNews
	publicationDateIso="2023-10-01T00:00:00.000Z"
	title="Upcoming Leaderboard Updates (Oct 2023)"
>
	<NewsSection sectionTitle="🤖 Venogia Leaderboard (October 1, 2023)">
		Belated arrival of the Remnants of Ambition Urgent Quest leaderboard is now accepting
		submissions. Sorry for the delay! It was postponed in favor of Dark Falz Solus.
	</NewsSection>
	<NewsSection>
		Since level 80 is coming soon, there might be a chance that you have runs from the level 75
		patch era. If this applies to you, make a note in your run notes or contact a moderator on
		Discord and we will take care of the patch.
	</NewsSection>
	<NewsSection sectionTitle="↗ Patch Level 80 (October 11, 2023)">
		Level 80 will be arriving on Oct 11, so we will increase the patch code to level 80. If you have
		any runs from prior to level 80 please let us know on discord and we can adjust your patch level
		as appropriate.
	</NewsSection>
	<NewsSection>
		Additionally, the game will also change the maximum time for duel quests quest from 5min -&gt;
		10 minutes, nullify region mag effects, and "HP of enemies has been lowered". We are not exactly
		sure at this time how it will effect new submissions to the bosses but we will play by ear and
		adjust accordingly.
	</NewsSection>
	<NewsSection sectionTitle="⚔ New Duel Boss Zelvin (October 18, 2023)">
		A new duel boss (phase 3) is coming and we will add a new leaderboard. Note that the changes to
		the duel bosses is on October 11th.
	</NewsSection>
	<NewsSection>
		As usual if there are issues please contact us on <DiscordContact />.
	</NewsSection>
</HomeNews>
<HomeNews publicationDateIso="2023-08-17T00:00:00.000Z" title="Leaderboard 3.2.3 Update">
	<NewsSection sectionTitle="🚚 Data Migrations Complete">
		In order to implement new quests and categories at a faster and more maintainable rate we
		consolidated all the run data and player data on our backend database. These migrations have
		been completed as of August 17, 2023.
	</NewsSection>
	<NewsSection>
		With the new data infrastructure in place we had to add additional changes to submissions so
		that all runs from all quests+categories are consistent. These are:
		<ol class="ml-2 [&>li]:py-1">
			<li>
				1. Player entries no longer require a server region. The server region that the run was
				executed is per run instead of by player "one". With that, all runs on the leaderboard have
				been assigned a run region (japan/global) based on evidence in your run's video (usually by
				fan translation distinction) if they have not before.
			</li>
			<li>
				2. Runs tied by time (1 second precision) are awarded the same rank. Times submitted earlier
				will still be ordered on first within the same time.
			</li>
			<li>
				3. We did not have "submission dates" for runs in the early days of the leaderboard. If your
				run was fairly old, we went by the youtube video's publication date.
			</li>
			<li>4. It is now optional to provide a server region in your profile (ARKS ID).</li>
		</ol>
	</NewsSection>
	<NewsSection>
		Moving forward we hope to implement more run quests (e.g., Venogia UQ) and be able to adapt to
		new updates from SEGA as they happen.
	</NewsSection>
	<NewsSection>
		As usual if there are issues or inaccuracies please contact us on
		<DiscordContact /> and we can get your run updated. Thank you for your patience.
	</NewsSection>
</HomeNews>
<HomeNews publicationDateIso="2023-08-10T00:00:00.000Z" title="Leaderboard 3.2.2 Update">
	<NewsSection sectionTitle="⭐➖ New Standing Quest Leaderboard: Dark Falz Solus">
		A new boss Dark Falz Solus has been added to the leaderboard. The official release date for the
		quest is Aug 9, 2023.
	</NewsSection>
	<NewsSection>
		Some minor layout changes and some general improvements. This update prepares the leaderboard
		for the upcoming data migrations so we can improve the development speed of new quests and
		bosses as they are added into the game.
	</NewsSection>
	<NewsSection>
		As usual if there are issues please contact us on <DiscordContact />.
	</NewsSection>
</HomeNews>
<HomeNews publicationDateIso="2023-06-18T00:00:00.000Z" title="Leaderboard 3.2.1 Update">
	<NewsSection sectionTitle="⚔️ New Duel Boss: Halvaldi">
		A new duel boss Halvaldi has been added to the leaderboard. The official release date for the
		quest is June 21st, 2023.
	</NewsSection>
	<NewsSection>
		Also we performed some minor data migrations in the backend. These should have no impact on the
		site operations but as usual if there are issues please contact us on <DiscordContact />.
	</NewsSection>
</HomeNews>
