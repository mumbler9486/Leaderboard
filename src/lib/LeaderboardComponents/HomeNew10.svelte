<script lang="ts">
  import { t } from 'svelte-i18n'
  import SoloPurple from "$lib/LeaderboardComponents/Rows/SoloPurple.svelte";
  import { onMount } from "svelte";

var dataStorage = [];

onMount(async () => {
  const response = await fetch('/ngs-api/Top10PurpleSolo', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
  });
  
  dataStorage = await response.json();
});

</script>

<div>
    <div class="text-4xl font-light text-center">{$t('page.home.newestRuns')}</div>
    <div class="divider -mx-8"></div>
    <div class="overflow-x-auto">
        <table class="table table-zebra table-compact w-full">
          <thead>
            <tr>
              <th class="text-center">{$t('leaderboard.shared.player')}</th> 
              <th class="text-center">{$t('leaderboard.shared.time')}</th> 
              <th class="text-center">{$t('leaderboard.shared.category')}</th>
            </tr>
          </thead> 
          <tbody>
            {#each dataStorage as data}
              <SoloPurple PID={data.PlayerID} mainClass={data.MainClass} playerName={data.PlayerName} characterName={data.CharacterName} runCharacterName={data.RunCharacterName} time={data.Time} category={data.Region} rank={data.Rank} namePref={data.PreferredName} nameType={data.NameType} nameC1={data.NameColor1} nameC2={data.NameColor2}/>
            {/each}
        </table>
      </div>
      
</div>