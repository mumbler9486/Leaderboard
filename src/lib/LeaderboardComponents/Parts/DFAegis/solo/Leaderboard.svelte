<script>
    import SoloPurpleFull from "$lib/LeaderboardComponents/Parts/DFAegis/solo/RowFull.svelte";
    import PurplesoloModalRuninfo from "$lib/LeaderboardComponents/Parts/DFAegis/solo/RunInfo.svelte";

    var dataStorage = [];
    var loading = 1;

    var refRank = 1;
    var refTime = null;

    let runInfoModal;

  export async function reloadData() {
    dataStorage = [];
    loading = 1;
    refRank = 1;
    refTime = null;
    var params = window.location.search;
    const response = await fetch('/ngs-api/DFASolo' + params, {
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
                <th class="bg-neutral text-neutral-content">Player</th> 
                <th class="text-center bg-neutral text-neutral-content">Support</th> 
                <th class="text-center bg-neutral text-neutral-content">Main Class</th> 
                <th class="text-center bg-neutral text-neutral-content">Sub-Class</th> 
                <th class="text-center bg-neutral text-neutral-content">Weapon(s)</th> 
                <th class="text-center bg-neutral text-neutral-content">IGT <div class="tooltip tooltip-info tooltip-bottom font-semibold normal-case" data-tip="In-Game Time"><i class="bi-question-circle ms-2"></i></div></th> 
                <th class="text-center bg-neutral text-neutral-content">Video</th>
                <th class="text-center bg-neutral text-neutral-content w-2"></th> <!-- VIDEO ICON -->
                <th class="text-center bg-neutral text-neutral-content w-2"></th> <!-- NOTE ICON -->
              </tr>
            </thead> 
            {#if loading == 0}
            <tbody>
              {#each dataStorage as data}
                {#each [scream(data.Time)] as func}
                <SoloPurpleFull on:openRunInfo={runInfoOpen} buff={data.Buff} videoTag={data.VideoTag} runID={data.RunID} inServer={data.Server} ship={data.Ship} link={data.Link} notes={data.Notes} flag={data.Flag} myRank={func} weapons={data.WeaponInfo} PID={data.PlayerID} mainClass={data.MainClass} subClass={data.SubClass} playerName={data.PlayerName} characterName={data.CharacterName} runCharacterName={data.RunCharacterName} time={data.Time} namePref={data.PreferredName} nameType={data.NameType} nameC1={data.NameColor1} nameC2={data.NameColor2}/>
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