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
						<span slot="newsTitle">Leaderboard 3.1 Update</span>
						<p slot="newsContent">
							<strong>Changelog:</strong><br />
							<li class="pt-4">
								<strong>Indomitable Duel Runs now Accepting Submissions</strong><br />
								Duel runs can now be submitted to the leaderboard. Please take note if you have used
								the special Duel augments or not.
							</li>
							<li class="pt-4">
								<strong>About Special Duel Augments (Defi-Series)</strong><br />
								Currently it will be either you affixed an augment on any equipment in the run or you
								did not. Since we don't know the impact on the runs yet this may be subject to change.
								We will reach out to the early submitters where possible to improve their submissions
								if there is a change needed.
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
