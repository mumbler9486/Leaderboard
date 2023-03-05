<script>
    import SoloPurpleFull from "$lib/LeaderboardComponents/Rows/PartyPurpleFull.svelte";
    import PurplesoloModalRuninfo from "$lib/LeaderboardComponents/Modals/PurpleParty/purpleparty_modal_runinfo.svelte";

    var dataStorage = [];
    var loading = 1;
    export let data;

    var refRank = 1;
    var refTime = null;

    let runInfoModal;

  export async function reloadData() {
    dataStorage = [];
    loading = 1;
    refRank = 1;
    refTime = null;
    var params = window.location.search;
    const response = await fetch('/ngs-api/PurpleParty' + params, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    dataStorage = await response.json();
    loading = 0;
    //console.log(dataStorage)
  }

  function scream(agony) {
    if (agony == refTime || refTime == null) {
        refTime = agony;
    }
    else {
        refTime = agony;
        refRank = refRank + 1;
    }
    var out = refRank;
    return out;
  }

  function runInfoOpen(event) {
    runInfoModal.openRunInfo(event.detail.runID);
  }
  
  </script>
  
  <div class="overflow-x-auto overflow-y-hidden -mx-6 md:mx-0">
          <table class="table table-compact table-zebra w-full">
            <thead>
              <tr>
                <th class="text-center bg-neutral text-neutral-content w-2">#</th> 
                <th class="bg-neutral text-neutral-content">Players</th> 
                <th class="text-center bg-neutral text-neutral-content">Main Classes</th> 
                <th class="text-center bg-neutral text-neutral-content">Sub-Classes</th> 
                <th class="text-center bg-neutral text-neutral-content">IGT <div class="tooltip tooltip-info tooltip-bottom font-semibold normal-case" data-tip="In-Game Time"><i class="bi-question-circle ms-2"></i></div></th> 
                <th class="text-center bg-neutral text-neutral-content">Videos</th>
                <th class="text-center bg-neutral text-neutral-content w-2"></th> <!-- NOTE ICON -->
              </tr>
            </thead> 
            {#if loading == 0}
            <tbody>
              {#each dataStorage as data}
                {#each [scream(data.shared.Time)] as func}
                <SoloPurpleFull on:openRunInfo={runInfoOpen} time={data.shared.Time} runID={data.shared.RunID} notes={data.shared.Notes} myRank={func} player1={data.p1} player2={data.p2} player3={data.p3} player4={data.p4}/>
                {/each}
              {/each}
            </tbody>
            {/if}
          </table>
        
  </div>
  {#if loading == 0 && !dataStorage[0]}
  <span class="flex justify-center">There are no runs that match the selected filters.</span>
  {/if}
  {#if loading == 1}
  <div class="flex flex-col basis-full place-content-center place-items-center gap-1">Loading - Please Wait...<br><progress class="progress border border-neutral-content/20 progress-primary w-56"></progress></div>
  {/if}

  <PurplesoloModalRuninfo bind:this={runInfoModal}/>