<script lang="ts">
    import { t } from 'svelte-i18n'
// @ts-nocheck

    import { page } from '$app/stores';
    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";
    import FOFError from "$lib/ErrorComponents/FOFError.svelte";
    import AuthError from '$lib/ErrorComponents/AuthError.svelte';
</script>

<svelte:head>
    {#if $page.status == 404}
        <title>{$t('shared.siteName')} - 404 Not Found</title>
    {:else if $page.status == 401}
        <title>{$t('shared.siteName')} - 401 Not Authorized</title>
    {:else}
        <title>{$t('shared.siteName')} - {$page.status} {$page.error.message}</title>
    {/if}
</svelte:head>

<div class="flex flex-col min-h-screen">
    <LeaderboardHeader/>

    <div class="flex flex-col grow content-center">
        <div class="container flex grow mx-auto bg-base-100/75 border-secondary border rounded-md m-16">
            <div class="flex flex-col md:flex-row grow bg-base-100 m-2 px-8 p-4 border-secondary border rounded-md">
                {#if $page.status == 404}
                    <FOFError/>
                {:else if $page.status == 401}
                    <AuthError/>
                {:else}
                    <h1>{$page.status} {$page.error.message}</h1>
                {/if}
            </div>
        </div>
    </div>
    <LeaderboardFooter/>
</div>

<BackgroundRandomizer/>