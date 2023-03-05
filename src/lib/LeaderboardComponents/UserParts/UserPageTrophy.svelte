<script lang="ts">
    import { onMount } from "svelte";
    import trophiesJson from "$lib/trophies.json";
    export let trophyReference:string;
    let trophyName;
    let trophySource;
    let trophyDescription;
    let trophyID:string;
    let trophyCount:number;


    onMount(async () => {
        const trophySplit = trophyReference.split(",")
        trophyID = trophySplit[0];
        trophyCount = Number(trophySplit[1]);
        trophyName = trophiesJson[trophyID].name;
        trophySource = trophiesJson[trophyID].img;
        trophyDescription = trophiesJson[trophyID].description;
        //console.log(trophiesJson[trophyID])
    });


</script>

{#if trophyName}
<div class="flex flex-col tooltip" data-tip={trophyDescription}>
    <img class="h-32 w-32 place-self-center drop-shadow-lg" src="/trophies/{trophySource}" />
    <span class="font-semibold text-lg place-self-center">{trophyName}</span>
    {#if trophyCount > 1}
    <span class="place-self-center text-base-content/50">x{trophyCount}</span>
    {/if}
</div>
{/if}