<script>
    import DiscordUser from "$lib/DiscordComponents/DiscordUser.svelte";
    import { onMount } from "svelte";

    var dataStorage = null;
    var members = [];
    var presence = 0;
    var inviteLink = '';
    var serverName = 'PSO2 Central';
    onMount(async () => {
        getDiscord();
    });
    async function getDiscord() {
        dataStorage = null;
        const response = await fetch('https://discord.com/api/guilds/1070314956991512636/widget.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    dataStorage = await response.json();
    members = dataStorage.members;
    presence = dataStorage.presence_count;
    inviteLink = dataStorage.instant_invite;
    serverName = dataStorage.name;
    console.log(dataStorage)
    }
</script>

<div class="flex flex-col text-base-content bg-base-100 font-light items-center text-lg py-4 rounded-t-md border border-secondary border-b-secondary/25">
    <p class="text-2xl font-normal">{serverName}<i class="bi bi-discord ml-2"></i></p>
    <span class="text-base-content/50">{presence} Member{#if presence != 1}s{/if} Online</span>
</div>
<div style="box-shadow: inset 0px -4px 8px rgba(0,0,0,0.4);" class="widget-discord overflow-y-auto flex flex-col gap-1 border border-t-0 border-b-0 border-secondary p-5 h-96 max-h-96 bg-base-300">
{#each members as data}
<DiscordUser avatar={data.avatar_url} name={data.username} status={data.status} game={data.game}/>
{/each}
</div>
<div class="flex flex-row bg-base-100 justify-between px-8 p-4 rounded-b-md border border-secondary border-t-secondary/25 items-center">
<p class="font-light text-xl text-base-content/50">Join us on Discord!</p>
<a href={inviteLink} target="_blank" rel="noreferrer noopener" role="button" class="btn btn-sm btn-outline btn-secondary rounded-md">Connect</a></div>
<style>


.widget-discord::-webkit-scrollbar
{
    width:10px;
}
.widget-discord::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track-piece
{
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 5px;
}
.widget-discord::-webkit-scrollbar-thumb
{
    background-color: hsla(0,0%,100%,.1);
}
.widget-discord::-webkit-scrollbar-track-piece
{
    background-color: transparent;
}
</style>