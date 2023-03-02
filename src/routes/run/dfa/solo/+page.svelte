<script lang="ts">
    import { t } from 'svelte-i18n'
    import { browser } from '$app/environment';

    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";
    import LeaderboardTitle from "$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte";
    import LeaderboardFilters from '$lib/LeaderboardComponents/Parts/DFAegis/solo/LeaderboardFilters.svelte';

    import LeaderboardSolo from '$lib/LeaderboardComponents/Parts/DFAegis/solo/Leaderboard.svelte';

    let parameterArray = {};

    let boardBody;

    if (browser) {
        let filter = new URLSearchParams(window.location.search);
        parameterArray.class = filter.get('class');
        parameterArray.videos = filter.get('videos');
        parameterArray.server = filter.get('server');
        parameterArray.buff = filter.get('buff');
        parameterArray.trigger = filter.get('trigger');
        //parameterArray.patch = filter.get('patch');
        //parameterArray.rank = filter.get('rank');
        parameterArray.weapons = filter.get('weapons');
    };

</script>

<svelte:head>
	<title>{$t('shared.siteName')} | {$t('leaderboard.halphiaLake')} - {$t('common.playerCount.solo')}</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
    <LeaderboardHeader/>

    <LeaderboardTitle category="{$t('leaderboard.halphiaLake')}" subCategory="{$t('common.playerCount.solo')}"/>
        
    <div class="content-center grow">
        <div class="container mx-auto bg-base-100/75 border-secondary border rounded-md mb-16 mt-2">
            <div class="bg-base-100 m-2 px-8 p-4 border-secondary border rounded-md space-y-2">
                <LeaderboardFilters type="solo" bind:filters={parameterArray} on:msgReload={() => boardBody.reloadData()}/>
                <LeaderboardSolo bind:this={boardBody}/>
            </div>
        </div>
    </div>

    <LeaderboardFooter/>
</div>

<BackgroundRandomizer/>