<script lang="ts">
    import { userContext, fetchData } from '$lib/store';
    import { onMount } from 'svelte';

    onMount(async () => {
        await fetchData();
    });
</script>

{#if $userContext.userId}
    {#await $userContext}
        <p>Loading Integration Data...</p>
    {:then}
        <script
            src="https://labs.pathfix.com/helper.js"
            data-user-id={$userContext.userId}
            id="pinc.helper"
            modules="pinc.oauth.min"
            data-public-key="5CEFF650-2164-4303-837F-28F8FC6C85F4"
        ></script>
        <div
            data-oauth-ui="list-columns"
            data-oauth-ui-switches="statusOn,disconnect"
            data-oauth-icon-size="Medium"
            data-oauth-button-color="#007BFF"
            data-oauth-ui-providers=""
            data-oauth-ui-providerTypes=""
        />
    {:catch error}
        <p>Error fetching data: {error.message}</p>
    {/await}
{:else}
    <p>Loading Integration Data...</p>
{/if}

<style>
    :root {
        --pinc-oauth-ui-panel-bg-color: #212529;
        --pinc-oauth-ui-panel-text-color: #000;
        --pinc-oauth-ui-panel-light-text-color: #6c757d;
        --pinc-oauth-ui-panel-hover-bg-color: rgba(232, 232, 232, 0.6);
    }
</style>
