<script>

import { t } from 'svelte-i18n'
import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";

import { onMount } from "svelte";
import { json } from '@sveltejs/kit';

    import SubmitsSoloPurple from '$lib/LeaderboardComponents/Parts/Submissions/SoloPurple/SubmitsSolo.svelte';
    import SubmitsSoloAegis from '$lib/LeaderboardComponents/Parts/Submissions/SoloDFA/SubmitsSolo.svelte';
    import SubmitsDuoAegis from '$lib/LeaderboardComponents/Parts/Submissions/DuoDFA/SubmitsParty.svelte';
    import SubmitsDuoPurple from '$lib/LeaderboardComponents/Parts/Submissions/DuoPurple/SubmitsParty.svelte';
    import SubmitsPartyPurple from '$lib/LeaderboardComponents/Parts/Submissions/PartyPurple/SubmitsParty.svelte';
    import SubmitsPartyAegis from '$lib/LeaderboardComponents/Parts/Submissions/PartyDFA/SubmitsParty.svelte';

    let mountedDone = false;
    let selectedCategoryRuns = 'purplesolo';

    onMount(async () => {
        mountedDone = true;
    });

    function changeCategory() {
        selectedCategoryRuns = document.getElementById('runselectiontype-form').value;
    }

</script>

<svelte:head>
    <title>{$t('shared.siteName')} | Moderation - Submission Queue</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
    <LeaderboardHeader/>

    <div class="flex flex-col grow content-center">
        <div class="container flex grow mx-auto bg-base-100/75 border-secondary border rounded-md m-16">
            <div class="flex flex-col grow bg-base-100 m-0 md:m-2 px-8 p-4 border-secondary border rounded-md gap-1 w-screen">
                <div class="text-4xl font-light text-center">Submission Queue</div>
                <div class="divider -mx-8"></div>
                <div class="bg-secondary/10 m-0 md:m-2 px-8 p-4 border-secondary border rounded-md gap-1">
                    <div class="flex flex-col md:flex-row gap-2">


                        <div class="form-control grow">
                            <label class="label" for={"runselectiontype-form"}>
                                <span class="label-text">Category</span>
                            </label>
                            <select id={"runselectiontype-form"} class="select select-bordered" on:change={changeCategory}>
                                <option value="purplesolo" selected>Purple Triggers - Solo</option>
                                <option value="purpleduo">Purple Triggers - Duo</option>
                                <option value="purpleparty">Purple Triggers - Party</option>
                                <option value="aegissolo">Dark Falz Aegis - Solo</option>
                                <option value="aegisduo">Dark Falz Aegis - Duo</option>
                                <option value="aegisparty">Dark Falz Aegis - Party</option>
                              </select>
                        </div>  


                    </div>

                    
                </div>
                
                <div class="bg-base-100 m-0 md:m-2 px-8 p-4 border-secondary border rounded-md space-y-2 grow">
                    {#if mountedDone && selectedCategoryRuns === 'purplesolo'}
                    <SubmitsSoloPurple/>
                    {:else if mountedDone && selectedCategoryRuns === 'purpleduo'}
                    <SubmitsDuoPurple/>
                    {:else if mountedDone && selectedCategoryRuns === 'purpleparty'}
                    <SubmitsPartyPurple/>
                    {:else if mountedDone && selectedCategoryRuns === 'aegissolo'}
                    <SubmitsSoloAegis/>
                    {:else if mountedDone && selectedCategoryRuns === 'aegisduo'}
                    <SubmitsDuoAegis/>
                    {:else if mountedDone && selectedCategoryRuns === 'aegisparty'}
                    <SubmitsPartyAegis/>
                    {/if}
                </div>
               
            </div>
        </div>
    </div>
    <LeaderboardFooter/>
</div>


<BackgroundRandomizer/>