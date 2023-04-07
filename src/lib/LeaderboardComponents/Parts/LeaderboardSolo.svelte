<script>
  import SoloPurpleFull from "$lib/LeaderboardComponents/Rows/SoloPurpleFull.svelte";
  import PurplesoloModalRuninfo from "$lib/LeaderboardComponents/Modals/PurpleSolo/purplesolo_modal_runinfo.svelte";

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
    const response = await fetch("/ngs-api/PurpleSolo" + params, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dataStorage = await response.json();
    loading = 0;
    //console.log(dataStorage)
  }

  function scream(agony) {
    if (agony == refTime || refTime == null) {
      refTime = agony;
    } else {
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

<div class="-mx-6 overflow-x-auto overflow-y-hidden md:mx-0">
  <table class="table-zebra table-compact table w-full">
    <thead>
      <tr>
        <th class="w-2 bg-neutral text-center text-neutral-content">#</th>
        <th class="bg-neutral text-neutral-content">Player</th>
        <th class="bg-neutral text-center text-neutral-content">Main Class</th>
        <th class="bg-neutral text-center text-neutral-content">Sub-Class</th>
        <th class="bg-neutral text-center text-neutral-content">Weapon(s)</th>
        <th class="bg-neutral text-center text-neutral-content"
          >IGT <div
            class="tooltip tooltip-bottom tooltip-info font-semibold normal-case"
            data-tip="In-Game Time"
          >
            <i class="bi-question-circle ms-2" />
          </div></th
        >
        <th class="bg-neutral text-center text-neutral-content">Video</th>
        <th class="w-2 bg-neutral text-center text-neutral-content" />
        <!-- VIDEO ICON -->
        <th class="w-2 bg-neutral text-center text-neutral-content" />
        <!-- NOTE ICON -->
      </tr>
    </thead>
    {#if loading == 0}
      <tbody>
        {#each dataStorage as data}
          {#each [scream(data.Time)] as func}
            <SoloPurpleFull
              on:openRunInfo={runInfoOpen}
              videoTag={data.VideoTag}
              runID={data.RunID}
              inServer={data.Server}
              ship={data.Ship}
              link={data.Link}
              notes={data.Notes}
              flag={data.Flag}
              myRank={func}
              weapons={data.WeaponInfo}
              PID={data.PlayerID}
              mainClass={data.MainClass}
              subClass={data.SubClass}
              playerName={data.PlayerName}
              characterName={data.CharacterName}
              runCharacterName={data.RunCharacterName}
              time={data.Time}
              namePref={data.PreferredName}
              nameType={data.NameType}
              nameC1={data.NameColor1}
              nameC2={data.NameColor2}
            />
          {/each}
        {/each}
      </tbody>
    {/if}
  </table>
</div>
{#if loading == 0 && !dataStorage[0]}
  <span class="flex justify-center"
    >There are no runs that match the selected filters.</span
  >
{/if}
{#if loading == 1}
  <div
    class="flex basis-full flex-col place-content-center place-items-center gap-1"
  >
    Loading - Please Wait...<br /><progress
      class="progress progress-primary w-56 border border-neutral-content/20"
    />
  </div>
{/if}

<PurplesoloModalRuninfo bind:this={runInfoModal} />
