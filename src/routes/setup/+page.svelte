<script lang="ts">
    import { t } from 'svelte-i18n'
// @ts-nocheck
import { onMount } from "svelte";

    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";
    
    let userInfo = null;

    onMount(async () => {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        userInfo = clientPrincipal;

    });

    async function submitChanges() {

        let data = {
            "setupServer" : null,
            "setupName" : null,
            "setupPlayerName" : null,
            "setupUserID" : null
        };

        data.setupServer = document.getElementById('server-form').value;
        data.setupName = document.getElementById('charname-form').value;
        data.setupPlayerName = userInfo.userDetails;
        data.setupUserID = userInfo.userId;

        console.log(data)

        const response = await fetch('/ngs-api/FinishSetup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        var evt = await response.json();
        if (evt.Successful && evt.Successful == 'Aye') {
            window.location.replace("/logout");
        }
}


</script>

<svelte:head>
    <title>{$t('shared.siteName')} | User Setup</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
    <LeaderboardHeader/>

    <div class="flex flex-col grow content-center">
        <div class="container flex grow mx-auto bg-base-100/75 border-secondary border rounded-md m-16">
            <div class="flex flex-col md:flex-col grow bg-base-100 m-2 px-8 p-4 border-secondary border rounded-md place-content-center">
                {#if userInfo != null && !userInfo.userRoles.includes('user') }
                <form id="editingForm" on:submit={submitChanges}>
                    <div class="form-control">
                        <label class="label" for="server-form">
                            <span class="label-text">Your Server</span>
                        </label>
                        <select id="server-form" class="select select-bordered" required>
                            <option value="" disabled selected>Select a Server...</option>
                            <option value="global">Global</option>
                            <option value="japan">Japan</option>
                        </select>
                        <label class="label">
                            <span class="label-text-alt text-warning">This cannot be changed later without the help of an administrator.</span>
                        </label>
                    </div>
                    <div class="form-control mb-4">
                        <label class="label" for="charname-form">
                            <span class="label-text">Your Main Character Name</span>
                        </label>
                        <input id="charname-form" type="text" placeholder="Please enter a character name..." class="input input-bordered" maxlength="24" required />
                        <label class="label">
                            <span class="label-text-alt">You can change this from your profile later.</span>
                        </label>
                    </div>
                    <div class="flex place-content-end"><button class="btn md:btn-sm btn-success btn-outline rounded" type="submit" form="editingForm">Confirm</button></div>
                    
                </form>
                {/if}
            </div>
        </div>
    </div>
    <LeaderboardFooter/>
</div>

<BackgroundRandomizer/>