<script>
	import DiscordContact from '$lib/Components/DiscordContact.svelte';
	import HomeNews from '$lib/PageComponents/News/HomeNews.svelte';
	import NewsSection from '$lib/PageComponents/News/NewsSection.svelte';
</script>

<HomeNews publicationDateIso="2024-03-04T13:00:00.000Z" title="Leaderboard March 2024 Updates">
	<NewsSection sectionTitle="⏳ Time Extension Quests">
		As you may have already seen in the Feb 2024 NGS Headline, there is going to be a new type of
		quest called "Time Extension Quests". It appears to be an arcade-like version of a quest where
		you earn time from completing objectives. We are currently considering if we will make a
		leaderboard out of this quest. If you would like to join in on this discussion join us on our <DiscordContact
		/>!
	</NewsSection>
	<NewsSection sectionTitle="⚔ Duel Boss Ringwedge">
		Release of the Ringwedge Duel boss. Actual in game quest will be released after the maintenance
		on March 13, 2023. We will prepare a leaderboard in time for this quest. Hope to see some
		bell-ringing times!
	</NewsSection>
</HomeNews>
<HomeNews publicationDateIso="2024-02-10T00:00:00.000Z" title="Leaderboard February 2024 Updates">
	<NewsSection sectionTitle="⤴ Patch Bump">
		Patch code has been bumped to Level 85. All runs submitted from Jan 31st and beyond will be on
		the new patch code. This also includes the various changes to Ranger and Gunner as well as the
		new weapons. For more details see the <a class="link" href="/info/patch-codes">patch codes</a> list.
	</NewsSection>
	<NewsSection sectionTitle="💄Ongoing UI Improvements">
		This month and beyond, we're continuing to improve the leaderboard UI. Let us know what you
		think or if you have any feedback at our <DiscordContact />.
	</NewsSection>
	<NewsSection>
		You may have already noticed some UI changes. Some of these are:
		<ul class="ml-2">
			<li>• Improved navigation bar, better support for mobile.</li>
			<li>• Leaderboards using buttons for category selection.</li>
			<li>• Improved player selection when entering multi party members.</li>
			<li>
				• Complete <a class="link" href="/info/news">news archive</a> page to de-clutter the home page.
			</li>
		</ul>
	</NewsSection>
</HomeNews>
<HomeNews publicationDateIso="2024-01-01T00:00:00.000Z" title="Leaderboard January 2024 Updates">
	<NewsSection sectionTitle="📅Patch Codes List">
		Not much in terms of in-game content releasing this month. For the team at the leaderboards we
		plan to add some new useful information pages for rules, submission guidelines, patch codes, and
		other tips for the leaderboard. The patch codes info page has been released: <a
			class="link"
			href="/info">Check it out!</a
		>
	</NewsSection>
</HomeNews>
<HomeNews publicationDateIso="2023-12-06T00:00:00.000Z" title="Leaderboard December 2023 Updates">
	<NewsSection sectionTitle="⤴ Patch Bump">
		From Dec 6th's Game Maintenance, we will increase the patch to "+80 Weap. Release". This release
		of the game will feature +80 weapon grind and a host of new PA customizations. All runs
		submitted at this point will be on the new patch.
	</NewsSection>
	<NewsSection sectionTitle="⤴ New Aelio and Retem Purple Ranks">
		Also from Dec 6th, Aelio and Retem Battledia Purple quests will have new ranks. The new rank
		will be the default for submissions and the board. Old ranks can still be viewed and submitted
		to.
	</NewsSection>
	<NewsSection sectionTitle="😈 Malignant Dark Falz Aegis">
		From Dec 14th's Game Maintenance, Malignant Dark Falz Aegis will be released. This quest is
		similar to that of the 4-player Dark Falz Solus but it is Aegis instead. We will consider this
		quest a new category but it will be the default category for Aegis when you visit the boards.
		The old boards for the other Aegis categories can still be visited however.
	</NewsSection>
</HomeNews>
