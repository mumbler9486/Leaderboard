<script lang="ts">
    import { t } from 'svelte-i18n'
    import { browser } from '$app/environment';

    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";

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
                    <a href="https://pso2central.azure-api.net/channels/channels?part=id&mine=true&Accept=application/json">testing</a><br>
                    <a href="/leaderboard" class="link link-primary">Leaderboard</a><br>
                    <a href="/gear" class="link link-primary">Gear Sim</a>
                </div>
            </div>
        </div>
    </div>
    <LeaderboardFooter/>
</div>

<BackgroundRandomizer/>