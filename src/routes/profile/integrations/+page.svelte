<script lang="ts">
  import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
  import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
  import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";
</script>

<div class="flex min-h-screen flex-col">
  <LeaderboardHeader />

  <div class="flex grow flex-col content-center">
    <div
      class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75"
    >
      <div
        class="m-2 flex grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8"
      >
        <button class="btn">Connect Youtube</button>
        Youtube is: PLACEHOLDER
        <button class="btn">Connect Youtube2</button>
        Youtube 2 is: PLACEHOLDER
        <button class="btn">Connect Twitter</button>
        Twitter is: PLACEHOLDER
        <button class="btn">Connect Discord</button>
        Discord is: PLACEHOLDER
      </div>
    </div>
  </div>
  <LeaderboardFooter />
</div>
<BackgroundRandomizer />
