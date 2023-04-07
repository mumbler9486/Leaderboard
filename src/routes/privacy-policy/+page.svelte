<script lang="ts">
  import { t } from "svelte-i18n";
  // @ts-nocheck

  import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
  import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
  import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";
  import PrivacyPolicyComponent from "$lib/PrivacyPolicyComponent.svelte";
</script>

<svelte:head>
  <title>{$t("shared.siteName")} | Privacy Policy</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
  <LeaderboardHeader />

  <div class="flex grow flex-col content-center">
    <div
      class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75"
    >
      <div
        class="m-2 flex grow flex-col rounded-md border border-secondary bg-base-100 p-4 px-8 md:flex-col"
      >
        <PrivacyPolicyComponent />
      </div>
    </div>
  </div>
  <LeaderboardFooter />
</div>

<BackgroundRandomizer />
