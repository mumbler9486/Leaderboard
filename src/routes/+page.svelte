<script lang="ts">
    import { t } from 'svelte-i18n'
    import { browser } from '$app/environment';

    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";
	import Pathfix from '$lib/Pathfix.svelte';

    async function testIntegration(){
        const response2 = await fetch('/ngs-api/YoutubeTester', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                }
            });
            const MyPlayer = await response2.json();
            console.log(MyPlayer)
    }

</script>

<svelte:head>
	<title>{$t('shared.siteName')}</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<div class="flex grow flex-col content-center">
		<img
			class="mx-8 my-16 object-scale-down drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] md:my-0"
			alt={$t('shared.siteName')}
			src="/logos/logo.png"
		/>
		<div class="container mx-auto mb-16 rounded-md border border-secondary bg-base-100/75">
			<div class="align-center flex flex-col md:flex-row">
				<div class="m-2 basis-full rounded-md border border-secondary bg-base-100 p-4 px-8">
					<p>Placeholder landing page. We can get banners in later.</p>
					<Pathfix />
					<button on:click={testIntegration}>TEST IT</button>
					<a href="/leaderboard" class="link-primary link">Leaderboard</a><br />
					<a href="/gear" class="link-primary link">Gear Sim</a>
				</div>
			</div>
		</div>
	</div>
	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
