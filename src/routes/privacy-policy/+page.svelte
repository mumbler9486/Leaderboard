<script lang="ts">
    import { t } from 'svelte-i18n'
// @ts-nocheck

    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";
    import PrivacyPolicyComponent from '$lib/PrivacyPolicyComponent.svelte';
</script>

<svelte:head>
    <title>{$t('shared.siteName')} - 404 Not Found</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
    <LeaderboardHeader/>

    <div class="flex flex-col grow content-center">
        <div class="container flex grow mx-auto bg-base-100/75 border-secondary border rounded-md m-16">
            <div class="flex flex-col md:flex-col grow bg-base-100 m-2 px-8 p-4 border-secondary border rounded-md">
                <PrivacyPolicyComponent/>
            </div>
        </div>
    </div>
    <LeaderboardFooter/>
</div>

<BackgroundRandomizer/>