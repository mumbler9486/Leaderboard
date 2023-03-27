<script lang="ts">
	import { t } from 'svelte-i18n';
	import { browser } from '$app/environment';

	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import HomeNews from '$lib/NewsComponents/HomeNews.svelte';
	import HomeNew10 from '$lib/LeaderboardComponents/HomeNew10.svelte';
	import HomeNewAegis5 from '$lib/LeaderboardComponents/HomeNewAegis5.svelte';
	import SoloPurpleStats from '$lib/StatComponents/SoloPurpleStats.svelte';
	import DiscordWidget from '$lib/DiscordComponents/DiscordWidget.svelte';
	import MeteornRecordCountdown from '$lib/LeaderboardComponents/MeteornRecordCountdown.svelte';

	let consentDiscord = false;

	let newsTitle = `Leaderboard 3.0 Update`;
	let newsContent = `
    A very small, yet very large update has been released.<br><br>
    <strong>Changelog:</strong><br>
    <li class="pt-4">
        <strong>Full Site Rewrite.</strong><br>
        The website has been fully rewritten.<br><br>This has lead to some visual changes, and will make implementing future feature updates easier.
    </li>
    <li class="pt-4">
        <strong>Youtube Embeds.</strong><br>
        Enabling youtube cookies will replace video links on run info panels with embeds!<br>
        Please note that this only applies to solo runs.
    </li>
    <li class="pt-4">
        <strong>Duo and Party Runs.</strong><br>
        Duo and party runs have returned!
    </li>
    <li class="pt-4">
        <strong>Dark Falz Aegis Leaderboards.</strong><br>
        Leaderboards for solo, duo, and full MPA have been added for Dark Falz Aegis!
    </li>
    <li class="pt-4">
        <strong>Player Descriptions.</strong><br>
        Player description editing has been enabled.
    </li>
    <li class="pt-4">
        <strong>Player Trophies.</strong><br>
        Trophies for each class have been added, in bronze, silver, gold, and rainbow types.<br>
        The first three trophy ranks will be given as a reward for participation in the below feature.<br>
        Rainbow trophies will be given out only for specific users, with a more specific criteria still being decided.<br>
        At this point in time, only guide authors have rainbow tier trophies.
    </li>
    <li class="pt-4">
        <strong>Meteorn Records.</strong><br>
        Functionality for 'Meteorn Records', or unofficial ARKs Records have been implemented.<br>
        Our test run is Dark Falz Aegis MPA runs.<br>
        Every player in a party with a bronze, silver, or gold ranking will be given a trophy for their party rank and class!
    </li>
    <li class="pt-4">
        <strong>Backend Alliance Support.</strong><br>
        More information will be released later, but Alliances are technically fully functional, but temporarily unavailable!
    </li>
    <li class="pt-4">
        <strong>Backend Avatar Support.</strong><br>
        Player avatars have been implemented, but remain disabled for the time being!
    </li>
    <li class="pt-4">
        <strong>Backend Twitch Support.</strong><br>
        Backend work has been done to enable Twitch embeds and videos in the future.<br>
        This will include the ability to display your Twitch stream on your profile if you wish!<br>
        Make sure to turn on Twitch cookies if you want to see this feature when it's implemented in full!
    </li>
    <li class="pt-4">
        <strong>Discord Widget.</strong><br>
        If you enable Discord cookies, a Discord widget will appear on the home page.
    </li>
    `;

	if (browser) {
		consentDiscord = (localStorage.getItem('consent-discord') ?? false) === 'true';
	}

	function tabUpdate(tab) {
		switch (tab) {
			case 'purp':
				document.getElementById('tab1')?.classList.add('tab-active');
				document.getElementById('tab2')?.classList.remove('tab-active');
				document.getElementById('tabcontent1')?.classList.remove('hidden');
				document.getElementById('tabcontent2')?.classList.add('hidden');
				break;
			case 'dfa':
				document.getElementById('tab2')?.classList.add('tab-active');
				document.getElementById('tab1')?.classList.remove('tab-active');
				document.getElementById('tabcontent1')?.classList.add('hidden');
				document.getElementById('tabcontent2')?.classList.remove('hidden');
				break;
		}
	}
</script>

<svelte:head>
	<title>{$t('shared.siteName')}</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<div class="flex grow flex-col content-center">
		<img
			class="my-16 mx-8 object-scale-down drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] md:my-0"
			alt={$t('shared.siteName')}
			src="/logos/logo.png"
		/>
		<MeteornRecordCountdown recordType="aegis-party" endDate="Mar 15, 2023" linkActive={true} />
		<div class="container mx-auto mb-16 rounded-md border border-secondary bg-base-100/75">
			<div class="align-center flex flex-col md:flex-row">
				<div
					class="m-2 basis-full rounded-md border border-secondary bg-base-100 p-4 px-8 md:basis-2/3"
				>
					<HomeNews>
						<span slot="newsTitle">{newsTitle}</span>
						<p slot="newsContent">{@html newsContent}</p>
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
					<div
						class="m-2 mt-0 h-full grow rounded-md border border-secondary bg-base-100 p-4 px-8 md:ml-0"
					>
						<div class="tabs tabs-boxed mb-4 flex grow">
							<a id="tab1" class="tab grow" on:click={() => tabUpdate('purp')}
								>Newest 10 Solo Purple Runs</a
							>
							<a id="tab2" class="tab tab-active grow" on:click={() => tabUpdate('dfa')}
								>Newest 5 DFA MPA Runs</a
							>
						</div>
						<span id="tabcontent2">
							<HomeNewAegis5 />
						</span>
						<span id="tabcontent1" class="hidden">
							<HomeNew10 />
							<div class="divider -mx-8" />
							<SoloPurpleStats />
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
