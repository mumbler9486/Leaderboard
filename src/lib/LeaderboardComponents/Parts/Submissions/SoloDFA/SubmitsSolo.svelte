<script>
    import RowSubmitsSolo from "$lib/LeaderboardComponents/Parts/Submissions/SoloDFA/RowSubmitsSolo.svelte";
    import PurplesoloModalRuninfo from "$lib/LeaderboardComponents/Parts/Submissions/SoloDFA/SubmitModal.svelte";

    import { onMount } from "svelte";

    var dataStorage = [];
    var loading = 1;

    let runInfoModal;
    

    onMount(async () => {
        reloadData();
    });


  async function reloadData() {
    dataStorage = [];
    loading = 1;
    const response = await fetch('/ngs-api/GetSubmissionsPurpleSolo?type=dfasolo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    dataStorage = await response.json();
    loading = 0;
    //console.log(dataStorage)
  }

  function runInfoOpen(event) {
    runInfoModal.openRunInfo(event.detail.Data);
  }
  
  </script>
  
  <div class="overflow-x-auto overflow-y-hidden -mx-6 md:mx-0">
          <table class="table table-compact table-zebra w-full">
            <thead>
              <tr>
                <th class="bg-neutral text-neutral-content">Player</th> 
                <th class="text-center bg-neutral text-neutral-content">Trigger</th>
                <th class="text-center bg-neutral text-neutral-content">Support</th>
                <th class="text-center bg-neutral text-neutral-content">Patch</th>
                <th class="text-center bg-neutral text-neutral-content">Main Class</th> 
                <th class="text-center bg-neutral text-neutral-content">Sub-Class</th> 
                <th class="text-center bg-neutral text-neutral-content">Weapon(s)</th> 
                <th class="text-center bg-neutral text-neutral-content">IGT <div class="tooltip tooltip-info tooltip-bottom font-semibold normal-case" data-tip="In-Game Time"><i class="bi-question-circle ms-2"></i></div></th> 
                <th class="text-center bg-neutral text-neutral-content">Submitted By</th>
                <th class="text-center bg-neutral text-neutral-content">Submission Time</th>
                <th class="text-center bg-neutral text-neutral-content w-2"></th> <!-- NOTE ICON -->
              </tr>
            </thead> 
            {#if loading == 0}
            <tbody>
              {#each dataStorage as data}
                <RowSubmitsSolo on:openRunInfo={runInfoOpen} data={data} />
              {/each}
            </tbody>
            {/if}
          </table>
        
  </div>
  {#if loading == 0 && !dataStorage[0]}
  <span class="flex justify-center">There are no runs in the selected queue.</span>
  {/if}
  {#if loading == 1}
  <div class="flex flex-col basis-full place-content-center place-items-center gap-1">Loading - Please Wait...<br><progress class="progress border border-neutral-content/20 progress-primary w-56"></progress></div>
  {/if}

  <PurplesoloModalRuninfo on:refreshData={reloadData} bind:this={runInfoModal}/>