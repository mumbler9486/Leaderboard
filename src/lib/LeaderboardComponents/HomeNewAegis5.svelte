<script lang="ts">
  import { t } from "svelte-i18n";
  import SoloPurple from "$lib/LeaderboardComponents/Rows/TopX/FiveAegisMPA.svelte";
  import { onMount } from "svelte";

  var dataStorage = [];

  onMount(async () => {
    const response = await fetch("/ngs-api/Top5AegisMPA", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    dataStorage = await response.json();
  });
</script>

<div>
  <div class="text-center text-4xl font-light">
    {$t("page.home.newestRunsAegis")}
  </div>
  <div class="divider -mx-8" />
  <div class="overflow-x-auto">
    <table class="table-zebra table-compact table w-full">
      <thead>
        <tr>
          <th class="text-center">Players</th>
          <th class="text-center">{$t("leaderboard.shared.time")}</th>
          <th class="text-center">Support</th>
        </tr>
      </thead>
      <tbody>
        {#each dataStorage as data}
          <SoloPurple {data} />
        {/each}
      </tbody>
    </table>
  </div>
</div>
