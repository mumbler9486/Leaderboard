<script lang="ts">
    import { t } from 'svelte-i18n'
    import { browser } from '$app/environment';

    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";

    async function testIntegration(){
        const d = {
                        "url": "https://youtube.googleapis.com/youtube/v3/channels",
                        "queryString": {
                            "part": "id",
                            "mine": "true"
                        },
                        "method": "GET"
                    }
        const response = await fetch('https://labs.pathfix.com/oauth/method/youtube/call?user_id=testID&public_key=5CEFF650-2164-4303-837F-28F8FC6C85F4', {
            method: 'POST',
            body: JSON.stringify(d)
        });
        var complete = await response.json()
        console.log(complete)
    }

</script>

<svelte:head>
	<title>{$t('shared.siteName')}</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
    <LeaderboardHeader/>

    <div class="flex flex-col grow content-center">
        <img class="my-16 md:my-0 mx-8 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] object-scale-down" alt="{$t('shared.siteName')}" src="/logos/logo.png">
        <div class="container mx-auto bg-base-100/75 border-secondary border rounded-md mb-16">
            <div class="flex flex-col md:flex-row align-center">
                <div class="basis-full bg-base-100 m-2 px-8 p-4 border-secondary border rounded-md">
                    <p>Placeholder landing page. We can get banners in later.</p>
                    <div data-oauth-ui="list-columns" data-oauth-ui-switches="statusOn,disconnect" data-oauth-icon-size="Medium" data-oauth-button-color="#007BFF" data-oauth-ui-providers="" data-oauth-ui-providerTypes=""></div>
                    <button on:click={testIntegration}>TEST IT</button>
                    <a href="/leaderboard" class="link link-primary">Leaderboard</a><br>
                    <a href="/gear" class="link link-primary">Gear Sim</a>
                </div>
            </div>
        </div>
    </div>
    <LeaderboardFooter/>
</div>

<BackgroundRandomizer/>