<script>
  import DiscordUser from "$lib/DiscordComponents/DiscordUser.svelte";
  import { onMount } from "svelte";

  var dataStorage = null;
  var members = [];
  var presence = 0;
  var inviteLink = "";
  var serverName = "PSO2 Central";
  onMount(async () => {
    getDiscord();
  });
  async function getDiscord() {
    dataStorage = null;
    const response = await fetch(
      "https://discord.com/api/guilds/1070314956991512636/widget.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dataStorage = await response.json();
    members = dataStorage.members;
    presence = dataStorage.presence_count;
    inviteLink = dataStorage.instant_invite;
    serverName = dataStorage.name;
    ////console.log(dataStorage)
  }
</script>

<div
  class="flex flex-col items-center rounded-t-md border border-secondary border-b-secondary/25 bg-base-100 py-4 text-lg font-light text-base-content"
>
  <p class="text-2xl font-normal">
    {serverName}<i class="bi bi-discord ml-2" />
  </p>
  <span class="text-base-content/50"
    >{presence} Member{#if presence != 1}s{/if} Online</span
  >
</div>
<div
  style="box-shadow: inset 0px -4px 8px rgba(0,0,0,0.4);"
  class="widget-discord flex h-96 max-h-96 flex-col gap-1 overflow-y-auto border border-b-0 border-t-0 border-secondary bg-base-300 p-5"
>
  {#each members as data}
    <DiscordUser
      avatar={data.avatar_url}
      name={data.username}
      status={data.status}
      game={data.game}
    />
  {/each}
</div>
<div
  class="flex flex-row items-center justify-between rounded-b-md border border-secondary border-t-secondary/25 bg-base-100 p-4 px-8"
>
  <p class="text-xl font-light text-base-content/50">Join us on Discord!</p>
  <a
    href={inviteLink}
    target="_blank"
    rel="noreferrer noopener"
    role="button"
    class="btn-outline btn-secondary btn-sm btn rounded-md">Connect</a
  >
</div>

<style>
  .widget-discord::-webkit-scrollbar {
    width: 10px;
  }
  .widget-discord::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track-piece {
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 5px;
  }
  .widget-discord::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
  .widget-discord::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
</style>
