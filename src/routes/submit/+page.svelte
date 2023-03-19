<script lang="ts">
    import { t } from 'svelte-i18n'
// @ts-nocheck

    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";

    import { onMount } from "svelte";
    import PurplepartyModalRuninfo from '$lib/LeaderboardComponents/Modals/PurpleParty/purpleparty_modal_runinfo.svelte';
    import { json } from '@sveltejs/kit';

    let partySizes = 
        {
            "purple" : [
                {"text" : "Solo (1 Player)", "value" : "1"},
                {"text" : "Duo (2 Players)", "value" : "2"},
                {"text" : "Party (4 Players)", "value" : "4"}
        ],
        "aegis" : [
                {"text" : "Solo (1 Player)", "value" : "1"},
                {"text" : "Duo (2 Players)", "value" : "2"},
                {"text" : "Full MPA (8 Players)", "value" : "8"}
        ]

    };

    let regionRanks =
    {
        "aelio" : [1, 2, 3],
        "retem" : [1, 2, 3],
        "kvaris" : [1, 2],
        "stia" : [1]
    };

    let regex = `^(?:https?:)?(?:[/][/])?(?:youtu[.]be[/]|(?:www[.]|m[.])?youtube[.]com[/](?:watch|v|embed)(?:[.]php)?(?:[?].*v=|[/]))([a-zA-Z0-9[\\\]_-]{7,15})(?:[\?&][a-zA-Z0-9[\\\]_-]+=[a-zA-Z0-9[\\\]_-]+)*$`

    let selectedWeapons = [];

    let selectedCategory;
    let selectedRegion;
    let selectedPartySize = "";
    let userList = {};

    let submitting = false;
    let submitted = false;
    let errored = false;
    let approvalwait = false;

    /*
    *
    *   updateCategoryChoice()
    *   
    *   This function handles resetting all choices when the user changes their category selection.
    *   We do some serverside cleanup to make sure nothing goes wrong, but this helps prevent potential user confusion.
    * 
    */

    function updateCategoryChoice() {
        selectedCategory = document.getElementById('runcategory-form').value;
        if(selectedPartySize != '') {
            document.getElementById('partysize-form').value = "";
            selectedPartySize = "";
        }
        if(selectedRegion != '') {
            if(document.getElementById('regionselect-form')) {
                document.getElementById('regionselect-form').value = "";
                selectedRegion = "";
            }
        }
        selectedWeapons = [];
        document.getElementById('subbutton')?.removeAttribute('disabled');
    }

    /*
    *
    *   updatePartySizeChoice()
    *   
    *   This function handles resetting all relevant choices when the user changes their party size.
    *   We do some serverside cleanup to make sure nothing goes wrong, but this helps prevent potential user confusion.
    * 
    */

    function updatePartySizeChoice() {
        selectedPartySize = document.getElementById('partysize-form').value;
        selectedWeapons = [];
        document.getElementById('subbutton')?.removeAttribute('disabled');
        updateWeaponChoice();
    }

    function updateRegionChoice() {
        selectedRegion = document.getElementById('regionselect-form').value;
    }

    function testValue(i) {
        if((document.getElementById("playerName-datalist"+(i+1)).options.namedItem(''.concat(document.getElementById("playername-form"+(i+1)).value.toString(), (i + 1).toString()))) == null) {
            //console.log("It was null")
        }
        else {
            //console.log(document.getElementById("playerName-datalist"+(i+1)).options.namedItem(''.concat(document.getElementById("playername-form"+(i+1)).value.toString(), (i + 1).toString())).dataset.player)

        }
    }

    onMount(async () => {

        const response = await fetch('/ngs-api/GetNamesIDs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        userList = await response.json()
        //console.log(regex)

    });

    function updateWeaponChoice() {
    if ((selectedWeapons.length > 6 && Number(selectedPartySize) == 1) || (selectedWeapons.length == 0 && Number(selectedPartySize) == 1)) {
        document.getElementById('subbutton').setAttribute('disabled','')
    }
    else {
        document.getElementById('subbutton')?.removeAttribute('disabled')
    }


}

async function submitRun() {
        


        var input = {};

        const res = await fetch('/.auth/me');
        const payload = await res.json();
        const { clientPrincipal } = payload;
        var userInfo = clientPrincipal;

        input.SubmitterID = userInfo.userId;

        // Get the run category.
        input.RunType = document.getElementById('runcategory-form').value;
        // Get party size.
        input.PartySize = document.getElementById('partysize-form').value;
        switch(input.RunType) {
            case "aegis":
                input.Buff = document.getElementById('buffselect-form').value;

                input.Trigger = document.getElementById('triggerselect-form').value;

                input.TimeHours = document.getElementById('time-form-hours').value;
                input.TimeMinutes = document.getElementById('time-form-minutes').value;
                input.TimeSeconds = document.getElementById('time-form-seconds').value;
                break;

            case "purple":
                input.Region = document.getElementById('regionselect-form').value;

                input.Rank = document.getElementById('rankselect-form').value;

                input.TimeMinutes = document.getElementById('time-form-minutes').value;
                input.TimeSeconds = document.getElementById('time-form-seconds').value;
                break;
        }
        Number(input.PartySize) > 1 ? input.RunServer = document.getElementById('runserver-form').value : null;

        for (let i = 0; i < Number(input.PartySize); i++) {
            input["Player" + (i+1)] = {};
            if ((document.getElementById("playerName-datalist"+(i+1)).options.namedItem(''.concat(document.getElementById("playername-form"+(i+1)).value.toString(), (i + 1).toString()))) != null) {
                input["Player" + (i+1)].PlayerID = (document.getElementById("playerName-datalist"+(i+1)).options.namedItem(''.concat(document.getElementById("playername-form"+(i+1)).value.toString(), (i + 1).toString())).dataset.player)
            }
            else {
                switch (document.getElementById("playerserver-form"+(i+1)).value) {
                    case "japan":
                        input["Player" + (i+1)].PlayerID = '107';
                        break;
                    case "global":
                        input["Player" + (i+1)].PlayerID = '106';
                        break;
                }
            }
            
            input["Player" + (i+1)].Name = document.getElementById("playername-form"+(i+1)).value;
            input["Player" + (i+1)].VideoName = document.getElementById("charactername-form"+(i+1)).value;
            input["Player" + (i+1)].Server = document.getElementById("playerserver-form"+(i+1)).value;
            input["Player" + (i+1)].MainClass = document.querySelector('input[name="radio-mainclass' + (i+1) + '"]:checked').value;
            input["Player" + (i+1)].SubClass = document.querySelector('input[name="radio-subclass' + (i+1) + '"]:checked').value;
        
            if(Number(input.PartySize) == 1) {
                input["Player" + (i+1)].Weapons = selectedWeapons;
            }

            input["Player" + (i+1)].Video = document.getElementById("video-form"+(i+1)).value;

            
        }
        input.Notes = document.getElementById("notes-form").value;
        submitting = true;
        //console.log(input);
        const response = await fetch('/ngs-api/SubmitRun', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        var complete = await response.json()
        //console.log(complete)
        if (complete.Code == "error") {
            errored = true;
        }
        else if (complete.Code == "awaiting_approval") {
            approvalwait = true;
        }
        else if (complete.Code == "success") {
            submitted = true;
        }
        
    }

</script>

<svelte:head>
    <title>{$t('shared.siteName')} | Submit a Run</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
    <LeaderboardHeader/>

    <div class="flex flex-col grow content-center">
        <div class="container flex grow mx-auto bg-base-100/75 border-secondary border rounded-md m-16">
            <div class="flex flex-col grow bg-base-100 m-2 px-8 p-4 border-secondary border rounded-md gap-1">
                <div class="text-4xl font-light text-center">Submit a Run</div>
                <div class="divider -mx-8"></div>
                {#if submitting && !submitted && !errored && !approvalwait}
                <div class="flex flex-col basis-full place-content-center place-items-center gap-1">Submitting - Please Wait...<br><progress class="progress border border-neutral-content/20 progress-primary w-56"></progress></div>
                {:else if submitted}
                <div class="flex flex-col basis-full place-content-center place-items-center gap-1">Your run has been submitted and will be reviewed as soon as possible!<br><a class="link link-primary" href="/">Click here to return to the home page!</a></div>
                {:else if errored}
                <div class="flex flex-col basis-full place-content-center place-items-center gap-1">A issue occured, please refresh and try again.</div>
                {:else if approvalwait}
                <div class="flex flex-col basis-full place-content-center place-items-center gap-1">Your run is still awaiting approval. If it's been a while, poke us on the discord!</div>
                {:else}
                <form id="submitForm" on:submit={submitRun}>

                    <div class="bg-secondary/10 m-2 px-8 p-4 border-secondary border rounded-md gap-1">
                        <div class="text-xl text-center font-semibold">Run</div>

                        <div class="divider"></div>

                        <div class="text-lg text-center font-semibold">Information</div>

                        <div class="form-control">
                            <label class="label" for="runcategory-form">
                            <span class="label-text">Category</span>
                            </label>
                            <select name="runcategory" id="runcategory-form" class="select select-bordered" required on:change={updateCategoryChoice}>
                                <option value="" disabled selected>Select a Category...</option>
                            <option value="purple">Purple Triggers</option>
                            <option value="aegis">Dark Falz Aegis</option>
                            </select>
                        </div>

                        {#if selectedCategory}
                        <div class="form-control">
                            <label class="label" for="partysize-form">
                            <span class="label-text">Party Size</span>
                            </label>
                            
                            <select name="partysize" id="partysize-form" class="select select-bordered" required on:change={updatePartySizeChoice}>
                                <option value="" disabled selected>Select a Party Size...</option>
                            {#each partySizes[selectedCategory] as row}
                            <option value={row.value}>{row.text}</option>
                            {/each}
                            </select>
                            
                        </div>
                        {/if}

                        {#if selectedCategory && selectedCategory == 'purple'}

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div class="form-control">
                                <label class="label" for="regionselect-form">
                                <span class="label-text">Region</span>
                                </label>
                                <select name="regionselect" id="regionselect-form" class="select select-bordered" required on:change={updateRegionChoice} >
                                    <option value="" disabled selected>Select a Region...</option>
                                <option value='aelio'>Aelio</option>
                                <option value='retem'>Retem</option>
                                <option value='kvaris'>Kvaris</option>
                                <option value='stia'>Stia</option>
                                </select>
                            </div>
                            <div class="form-control">
                                <label class="label" for="rankselect-form">
                                <span class="label-text">Rank</span>
                                </label>
                                
                                <select name="rankselect" id="rankselect-form" class="select select-bordered" required >
                                    {#if selectedRegion && selectedRegion != ''}
                                    <option value="" disabled selected>Select a Rank...</option>
                                    <option value=1>1</option>
                                    {#if regionRanks[selectedRegion].includes(2)}
                                    <option value=2>2</option>
                                    {/if}
                                    {#if regionRanks[selectedRegion].includes(3)}
                                    <option value=3>3</option>
                                    {/if}
                                    {:else}
                                    <option value="" disabled selected>Select a Region First!</option>
                                    {/if}
                                </select>
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Time</span>
                                </label>
                                <label class="input-group">
                                    <input id="time-form-minutes" placeholder="MM" type="number" class="input input-bordered w-full" min='0' max='20' maxlength="2" required />
                                    <span>:</span>
                                    <input id="time-form-seconds" placeholder="SS" type="number" class="input input-bordered w-full" min='0' max='59' maxlength="2" required />
                                </label>
                                <label class="label">
                                    <span class="label-text">This is the total time taken on your run.<br><span class="text-warning">Simplified time entry coming soon!</span></span>
                                </label>
                            </div>

                        </div>

                        {:else if selectedCategory && selectedCategory == 'aegis' }

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">

                            <div class="form-control">
                                <label class="label" for="triggerselect-form">
                                <span class="label-text">Mode</span>
                                </label>
                                <select name="triggerselect" id="triggerselect-form" class="select select-bordered" required >
                                    <option value="" disabled selected>Select a Mode...</option>
                                <option value='0'>Urgent Quest</option>
                                <option value='1'>Trigger / Drill</option>
                                </select>
                            </div>
                            <div class="form-control">
                                <label class="label" for="buffselect-form">
                                <span class="label-text">Support</span>
                                </label>
                                <select name="buffselect" id="buffselect-form" class="select select-bordered" required >
                                    <option value="" disabled selected>Select a Support...</option>
                                <option value='nadereh'>Nadereh</option>
                                <option value='ainamanon'>Aina & Manon</option>
                                <option value='ilma'>Ilma</option>
                                <option value='glen'>Glen</option>
                                </select>
                            </div>

                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Time</span>
                                </label>
                                <label class="input-group">
                                    <input id="time-form-hours" placeholder="H" type="number" class="input input-bordered w-full" min='0' max='1' maxlength="1" required />
                                    <span>:</span>
                                    <input id="time-form-minutes" placeholder="MM" type="number" class="input input-bordered w-full" min='0' max='59' maxlength="2" required />
                                    <span>:</span>
                                    <input id="time-form-seconds" placeholder="SS" type="number" class="input input-bordered w-full" min='0' max='59' maxlength="2" required />
                                </label>
                                <label class="label">
                                    <span class="label-text">This is the time shown at the end of the quest.</span>
                                </label>
                            </div>
                        </div>

                        {/if}

                        {#if selectedPartySize && Number(selectedPartySize) > 1}
                        <div class="form-control">
                            <label class="label" for="runserver-form">
                                <span class="label-text">Run Server</span>
                            </label>
                            <select id="runserver-form" class="select select-bordered">
                                <option value="global" selected>Global</option>
                                <option value="japan">Japan</option>
                              </select>
                            <label class="label">
                                <span class="label-text-alt">This is the server the run was recorded on.</span>
                            </label>
                        </div>
                        {/if}
                    </div>

                      {#if selectedCategory && selectedPartySize}
                        {#each {length: Number(selectedPartySize)} as _, i}
                            <div class="bg-secondary/10 m-2 px-8 p-4 border-secondary border rounded-md gap-1">
                                {#if selectedPartySize > 1}
                                <div class="text-xl text-center font-semibold">Player {i + 1}</div>
                                {:else}
                                <div class="text-xl text-center font-semibold">Player</div>
                                {/if}

                                <div class="divider"></div>

                                <div class="text-lg text-center font-semibold">Information</div>

                                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <div class="form-control">
                                        <label class="label" for={"partysize-form"+(i+1)}>
                                            <span class="label-text">Player or Character Name</span>
                                        </label>
                                        <input placeholder="Search or enter name..." list={"playerName-datalist"+(i+1)} id={"playername-form"+(i+1)} name={"player-name-form"+(i+1)} class="input input-bordered" required on:change={() => testValue(i)}>
                                        <label class="label">
                                            <span class="label-text-alt">You can search for existing players by player and character name!<br><span class="text-warning">Please keep in mind that this list is sorted by Player Name.</span></span>
                                        </label>
                                        <datalist id={"playerName-datalist"+(i+1)}>
                                            {#each userList as user}
                                            <option id={(user.PlayerName)+(i+1)} value={user.PlayerName} data-player={user.PlayerID}>{user.CharacterName}</option>
                                            {/each}
                                        </datalist>
                                    </div>

                                    <div class="form-control">
                                        <label class="label" for={"charactername-form"+(i+1)}>
                                            <span class="label-text">In-Video Character Name</span>
                                        </label>
                                        <input placeholder="Enter character name..." id={"charactername-form"+(i+1)} class="input input-bordered" type="text" required>
                                        <label class="label">
                                            <span class="label-text-alt">This is required to help viewers determine who is playing who in situations where Player/Main Character Name doesn't match the In-Video Character Name.<br><span class="text-warning">Even if the In-Video Character Name is the same as the Main Character or Player Name, you must still enter it here.</span></span>
                                        </label>
                                    </div>

                                    <div class="form-control">
                                        <label class="label" for={"playerserver-form"+(i+1)}>
                                            <span class="label-text">Player Server</span>
                                        </label>
                                        <select id={"playerserver-form"+(i+1)} class="select select-bordered">
                                            <option value="global" selected>Global</option>
                                            <option value="japan">Japan</option>
                                          </select>
                                        <label class="label">
                                            <span class="label-text-alt text-warning">This only applies to manual name entries! If you picked an existing player, ignore this!</span>
                                        </label>
                                    </div>

                                </div>

                                <div class="text-lg text-center font-semibold my-4">Main Class</div>

                                <div class="grid grid-cols-1 md:grid-cols-5 gap-2">


                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-hunter.png" alt="Hunter">
                                                <span class="label-text">Hunter</span> 
                                                <input value="hunter" type="radio" id={"form-radio-mainclass-hunter" + (i+1)} name={"radio-mainclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>


                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-fighter.png" alt="Fighter">
                                                <span class="label-text">Fighter</span> 
                                                <input value="fighter" type="radio" id={"form-radio-mainclass-fighter" + (i+1)} name={"radio-mainclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-ranger.png" alt="Ranger">
                                                <span class="label-text">Ranger</span> 
                                                <input value="ranger" type="radio" id={"form-radio-mainclass-ranger" + (i+1)} name={"radio-mainclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-gunner.png" alt="Gunner">
                                                <span class="label-text">Gunner</span> 
                                                <input value="gunner" type="radio" id={"form-radio-mainclass-gunner" + (i+1)} name={"radio-mainclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-force.png" alt="Force">
                                                <span class="label-text">Force</span> 
                                                <input value="force" type="radio" id={"form-radio-mainclass-force" + (i+1)} name={"radio-mainclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-techter.png" alt="Techter">
                                                <span class="label-text">Techter</span> 
                                                <input value="techter" type="radio" id={"form-radio-mainclass-techter" + (i+1)} name={"radio-mainclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-braver.png" alt="Braver">
                                                <span class="label-text">Braver</span> 
                                                <input value="braver" type="radio" id={"form-radio-mainclass-braver" + (i+1)} name={"radio-mainclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>
                                        
                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-bouncer.png" alt="Bouncer">
                                                <span class="label-text">Bouncer</span> 
                                                <input value="bouncer" type="radio" id={"form-radio-mainclass-bouncer" + (i+1)} name={"radio-mainclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-waker.png" alt="Waker">
                                                <span class="label-text">Waker</span> 
                                                <input value="waker" type="radio" id={"form-radio-mainclass-waker" + (i+1)} name={"radio-mainclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>


                                </div>

                                <div class="text-lg text-center font-semibold my-4">Sub Class</div>

                                <div class="grid grid-cols-1 md:grid-cols-5 gap-2">


                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-hunter.png" alt="Hunter">
                                                <span class="label-text">Hunter</span> 
                                                <input value="hunter" type="radio" id={"form-radio-subclass-hunter" + (i+1)} name={"radio-subclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>


                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-fighter.png" alt="Fighter">
                                                <span class="label-text">Fighter</span> 
                                                <input value="fighter" type="radio" id={"form-radio-subclass-hunter" + (i+1)} name={"radio-subclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-ranger.png" alt="Ranger">
                                                <span class="label-text">Ranger</span> 
                                                <input value="ranger" type="radio" id={"form-radio-subclass-ranger" + (i+1)} name={"radio-subclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-gunner.png" alt="Gunner">
                                                <span class="label-text">Gunner</span> 
                                                <input value="gunner" type="radio" id={"form-radio-subclass-gunner" + (i+1)} name={"radio-subclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-force.png" alt="Force">
                                                <span class="label-text">Force</span> 
                                                <input value="force" type="radio" id={"form-radio-subclass-force" + (i+1)} name={"radio-subclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-techter.png" alt="Techter">
                                                <span class="label-text">Techter</span> 
                                                <input value="techter" type="radio" id={"form-radio-subclass-techter" + (i+1)} name={"radio-subclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-braver.png" alt="Braver">
                                                <span class="label-text">Braver</span> 
                                                <input value="braver" type="radio" id={"form-radio-subclass-braver" + (i+1)} name={"radio-subclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>
                                        
                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-bouncer.png" alt="Bouncer">
                                                <span class="label-text">Bouncer</span> 
                                                <input value="bouncer" type="radio" id={"form-radio-subclass-bouncer" + (i+1)} name={"radio-subclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            
                                            <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                                <img src="/icons/class/class-waker.png" alt="Waker">
                                                <span class="label-text">Waker</span> 
                                                <input value="waker" type="radio" id={"form-radio-subclass-waker" + (i+1)} name={"radio-subclass" + (i+1)} class="radio rounded" required />
                                            </label>
                                        </div>


                                </div>
                                {#if Number(selectedPartySize) === 1}
                                <div class="text-lg text-center font-semibold mt-4">Weapons Used</div>
                                <div class="text-center mb-4 text-warning">Maximum of 6</div>

                                <div class="grid grid-cols-1 md:grid-cols-5 gap-2">
                                
                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-sword.png" alt="Sword">
                                            <span class="label-text">Sword</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="sword" type="checkbox" id={"form-checkbox-weapon-sword" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-wire.png" alt="Wired Lance">
                                            <span class="label-text">Wired Lance</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="wl" type="checkbox" id={"form-checkbox-weapon-wl" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-partisan.png" alt="Partisan">
                                            <span class="label-text">Partisan</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="partisan" type="checkbox" id={"form-checkbox-weapon-partisan" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-daggers.png" alt="Twin Daggers">
                                            <span class="label-text">Twin Daggers</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="td" type="checkbox" id={"form-checkbox-weapon-td" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-saber.png" alt="Double Saber">
                                            <span class="label-text">Double Saber</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="ds" type="checkbox" id={"form-checkbox-weapon-ds" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-knux.png" alt="Knuckles">
                                            <span class="label-text">Knuckles</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="knuckles" type="checkbox" id={"form-checkbox-weapon-knuckles" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-katana.png" alt="Katana">
                                            <span class="label-text">Katana</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="katana" type="checkbox" id={"form-checkbox-weapon-katana" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-blades.png" alt="Soaring Blades">
                                            <span class="label-text">Soaring Blades</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="sb" type="checkbox" id={"form-checkbox-weapon-sb" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-rifle.png" alt="Assault Rifle">
                                            <span class="label-text">Assault Rifle</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="rifle" type="checkbox" id={"form-checkbox-weapon-rifle" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-launcher.png" alt="Launcher">
                                            <span class="label-text">Launcher</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="launcher" type="checkbox" id={"form-checkbox-weapon-launcher" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-tmg.png" alt="Twin Machine Guns">
                                            <span class="label-text">Twin Machine Guns</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="tmg" type="checkbox" id={"form-checkbox-weapon-tmg" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-bow.png" alt="Bow">
                                            <span class="label-text">Bow</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="bow" type="checkbox" id={"form-checkbox-weapon-bow" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    
                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-rod.png" alt="Rod">
                                            <span class="label-text">Rod</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="rod" type="checkbox" id={"form-checkbox-weapon-rod" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    
                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-talis.png" alt="Talis">
                                            <span class="label-text">Talis</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="talis" type="checkbox" id={"form-checkbox-weapon-talis" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    
                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-wand.png" alt="Wand">
                                            <span class="label-text">Wand</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="wand" type="checkbox" id={"form-checkbox-weapon-wand" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    
                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-boots.png" alt="Jet Boots">
                                            <span class="label-text">Jet Boots</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="jb" type="checkbox" id={"form-checkbox-weapon-jb" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                    
                                    <div class="form-control">   
                                        <label class="label cursor-pointer bg-base-100 rounded border border-secondary/50 p-2">
                                            <img src="/icons/weapon/weapon-takt.png" alt="Harmonizer">
                                            <span class="label-text">Harmonizer</span> 
                                            <input bind:group={selectedWeapons} on:change={updateWeaponChoice} value="takt" type="checkbox" id={"form-checkbox-weapon-takt" + (i+1)} name={"form-checkbox-weapon" + (i+1)} class="checkbox rounded" />
                                        </label>
                                    </div>

                                </div>
                                {/if}

                                <div class="text-lg text-center font-semibold my-4">Video</div>

                                <div class="grid grid-cols-1 gap-2">
                                    <div class="form-control">
                                        <label class="label" for={"video-form"+(i+1)}>
                                            {#if Number(selectedPartySize) == 1}
                                            <span class="label-text">Video Link</span>
                                            {:else}
                                            <span class="label-text">POV Link</span>
                                            {/if}
                                        </label>
                                        {#if Number(selectedPartySize) == 1}
                                        <input type="url" pattern={regex} placeholder="Enter video link..." id={"video-form"+(i+1)} name={"video-form"+(i+1)} class="input input-bordered" title="Link must be a valid Youtube link." required >
                                        {:else}
                                        <input type="url" pattern={regex} placeholder="Enter video link..." id={"video-form"+(i+1)} name={"video-form"+(i+1)} class="input input-bordered" title="Link must be a valid Youtube link." >
                                        {/if}
                                        <label class="label">
                                            <span class="label-text-alt">Accepts any youtube link. (youtube.com, youtu.be...)<br><span class="text-warning">Additional site support coming soon!</span></span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        {/each}
                      {/if}

                    <div class="bg-secondary/10 m-2 px-8 p-4 border-secondary border rounded-md gap-1">
                        <div class="form-control">
                            <label class="label" for="notes-form">
                            <span class="label-text">Notes</span>
                            </label>
                            <textarea class="textarea textarea-bordered h-24 widget-discord" placeholder="(Optional) Type any notes, extra run information, or descriptions here!" id="notes-form"></textarea>
                        </div>
                    </div>

                      <div class="grid grid-cols-1 text-center">
                        <button class="btn btn-success btn-outline w-1/2 mt-4 justify-self-center" id="subbutton" type="submit">Submit Run</button>
                        {#if selectedWeapons.length > 6 && Number(selectedPartySize) == 1}
                        <span class="text-error">Too many weapons are selected!</span>
                        {/if}
                        {#if selectedWeapons.length == 0 && Number(selectedPartySize) == 1}
                        <span class="text-error">You need to pick at least one weapon!</span>
                        {/if}
                      </div>

                </form>
                {/if}
            </div>
        </div>
    </div>
    <LeaderboardFooter/>
</div>

<BackgroundRandomizer/>

<style>


    .widget-discord::-webkit-scrollbar
    {
        width:10px;
    }
    .widget-discord::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track-piece
    {
        background-clip: padding-box;
        border: 3px solid transparent;
        border-radius: 5px;
    }
    .widget-discord::-webkit-scrollbar-thumb
    {
        background-color: hsla(0,0%,100%,.1);
    }
    .widget-discord::-webkit-scrollbar-track-piece
    {
        background-color: transparent;
    }
    </style>