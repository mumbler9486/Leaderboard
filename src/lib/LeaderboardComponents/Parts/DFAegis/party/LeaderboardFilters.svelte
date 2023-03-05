<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { t } from 'svelte-i18n';

    import LB_purplesolo_modal_filters from '$lib/LeaderboardComponents/Parts/DFAegis/party/Filters.svelte'
    import LB_purplesolo_modal_rules from '$lib/LeaderboardComponents/Modals/PurpleDuo/rules.svelte';
    
    export let filters = {};

    let modalFilters;

    let allowedBuffs = [
        'ilma',
        'glen',
        'ainamanon',
        'nadereh'
    ]

    const buffName = {
        "glen" : "Glen",
        "ilma" : "Ilma",
        "ainamanon" : "Aina & Manon",
        "nadereh" : "Nadereh"
    }
    const buffIcon = {
        "glen" : "/icons/dfa/glen.png",
        "ilma" : "/icons/dfa/ilma.png",
        "ainamanon" : "/icons/dfa/ainamanon.png",
        "nadereh" : "/icons/dfa/nadereh.png"
    }

    function clearFilter(type) {
        switch (type){
            case 'buff':
                filters.buff = null;
                break;
            case 'server':
                filters.server = null;
                break;
        }
        updateURL();
    }

    let userInfo = null;

    onMount(async () => {
        updateURL();
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        userInfo = clientPrincipal;
  
    });

    function updateFilters(event) {
        var s = event.detail.server;
        if (s == "null") {
            s = null;
        }
        var b = event.detail.buff;
        if (b == "null") {
            b = null;
        }
        filters.server = s;
        filters.buff = b;
        updateURL();
    }

    function updateURL() {
        var urlRef = "/run/dfa/party"
        if(filters.trigger != null && (filters.trigger == 1 || filters.trigger == 0)) {
            urlRef += "?trigger=" + filters.trigger;
        }
        else {
            urlRef += "?trigger=0";
            filters.trigger = '0';
            //console.log(filters.trigger)
        }


        if(filters.buff != null && allowedBuffs.includes(filters.buff)) {
            urlRef += "&buff=" + filters.buff;
        };

        if(filters.server != null && (filters.server === 'japan' || filters.server === 'global')) {
            urlRef += "&server=" + filters.server;
        };

        history.replaceState({}, '', urlRef);
        dispatch('msgReload');
    }

</script>

<div class="flex flex-col grow bg-secondary/25 border-secondary border rounded-md p-1 -mx-6 md:mx-0">

    <div class="flex flex-row flex-wrap items-stretch place-content-center gap-2">
        <div class="grow flex flex-col">
            <label class="label justify-center" for="drop-region">
                <span class="label-text font-semibold text-base">Type</span>
            </label>
            <select bind:value={filters.trigger} on:change={() => updateURL()} id="drop-region" class="rounded select select-bordered">
                <option value=0>Urgent Quest</option>
                <option value=1>Trigger</option>
            </select>
        </div>
    </div>

    <div class="divider -mx-1 my-0"></div>
    <div class="flex flex-row flex-wrap items-stretch place-content-center">
        <div class="md:flex-1 m-1"><label for="modal-filters" class="rounded btn btn-sm btn-outline btn-primary" on:click={() => modalFilters.openRefresh()}><i class="bi bi-funnel mr-2"></i>Filters</label></div>
        <div class="md:flex-initial m-1"><label for="modal-rules" class="rounded btn btn-sm btn-outline btn-primary"><i class="bi bi-journal-check mr-2"></i>Rules</label></div>
        {#if userInfo != null && userInfo.userRoles.includes('user') }
        <div class="md:flex-initial m-1"><a href="/submit" class="rounded btn btn-sm btn-outline btn-primary"><i class="bi bi-envelope-paper mr-2"></i>Submit</a></div>
        {/if}
    </div>
    <!-- DIVIDER FOR FANCINESS. NOT SURE HOW TO BEST SHORTEN THIS -->
    {#if ((filters.server && (filters.server == 'global' || filters.server == 'japan')) || (filters.patch && allowedPatches.includes(filters.patch)))}
    <div class="divider -mx-1 my-0"></div>
    {/if}
    <!-- FILTER CATEGORIES STARTER. AGAIN, NOT SURE HOW BEST TO SHORTEN THIS -->
    <div class="flex flex-row flex-wrap place-content-center md:place-content-start gap-1">
    <!-- SOLO PURPLE FILTER DISPLAYS -->


    {#if filters.buff && (allowedBuffs.includes(filters.buff))}
    <span class="rounded badge badge-lg py-4 border border-neutral-content/25">
        <img class="inline mr-1" src={buffIcon[filters.buff]} alt={buffName[filters.buff]}>
        Support: {buffName[filters.buff]}
        <button class="rounded btn btn-xs btn-square ml-1" on:click={() => clearFilter('buff')}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </span>
    {/if}
        {#if filters.server && (filters.server === 'global' || filters.server === 'japan')}
        <span class="rounded badge badge-lg py-4 border border-neutral-content/25">
            Server: {filters.server.charAt(0).toUpperCase() + filters.server.slice(1).toLowerCase()} <img src="/icons/server/server-{filters.server}.png" alt="Global" class="ml-1">
            <button class="rounded btn btn-xs btn-square ml-1" on:click={() => clearFilter('server')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </span>
        {/if}


    </div>

</div>

<LB_purplesolo_modal_rules modalID='modal-rules'/>
<LB_purplesolo_modal_filters on:msgFiltersUpdate={updateFilters} bind:filters modalID='modal-filters' bind:this={modalFilters}/>