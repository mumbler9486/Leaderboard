<script lang="ts">

    import LeaderboardHeader from "$lib/LeaderboardHeader.svelte";
    import BackgroundRandomizer from "$lib/BackgroundRandomizer.svelte";
    import LeaderboardFooter from "$lib/LeaderboardFooter.svelte";

</script>

<div class="flex flex-col min-h-screen">
    <LeaderboardHeader/>

    <div class="flex flex-col grow content-center">
        <div class="container flex grow mx-auto bg-base-100/75 border-secondary border rounded-md m-16">
            <div class="flex flex-col grow bg-base-100 m-2 px-8 p-4 border-secondary border rounded-md gap-1">
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
    <LeaderboardFooter/>
</div>
<BackgroundRandomizer/>