<script lang="ts">
  import { t } from "svelte-i18n";
  import { browser } from "$app/environment";

  import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
  import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
  import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";
  import LeaderboardTitle from "$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte";
  import LeaderboardFilters from "$lib/LeaderboardComponents/Parts/DFAegis/party/LeaderboardFilters.svelte";

  import MeteornRecordCountdown from "$lib/LeaderboardComponents/MeteornRecordCountdown.svelte";

  import LeaderboardDuo from "$lib/LeaderboardComponents/Parts/DFAegis/party/Leaderboard.svelte";

  let parameterArray = {};

  let boardBody;

  if (browser) {
    let filter = new URLSearchParams(window.location.search);
    parameterArray.videos = filter.get("videos");
    parameterArray.server = filter.get("server");
    parameterArray.buff = filter.get("buff");
    parameterArray.trigger = filter.get("trigger");
    //parameterArray.patch = filter.get('patch');
    //parameterArray.rank = filter.get('rank');
  }
</script>

<svelte:head>
  <title
    >{$t("shared.siteName")} | {$t("leaderboard.halphiaLake")} - {$t(
      "common.playerCount.mpa"
    )}</title
  >
</svelte:head>

<div class="flex min-h-screen flex-col">
  <LeaderboardHeader />

  <LeaderboardTitle
    category={$t("leaderboard.halphiaLake")}
    subCategory={$t("common.playerCount.mpa")}
  />

  <MeteornRecordCountdown
    recordType="aegis-party"
    endDate="Mar 15, 2023"
    linkActive={false}
  />

  <div class="grow content-center">
    <div
      class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75"
    >
      <div
        class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8"
      >
        <LeaderboardFilters
          bind:filters={parameterArray}
          on:msgReload={() => boardBody.reloadData()}
        />
        <LeaderboardDuo bind:data={parameterArray} bind:this={boardBody} />
      </div>
    </div>
  </div>

  <LeaderboardFooter />
</div>

<BackgroundRandomizer />
