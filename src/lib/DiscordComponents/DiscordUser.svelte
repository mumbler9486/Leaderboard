<script lang="ts">

    export let avatar:string;
    export let name:string;
    export let status:string;
    export let game:string = null;
    let statusIndicator = statusGenerator(status);

    function statusGenerator(input) {
        switch(input) {
            case 'dnd':
                return `<span class="indicator-item border-2 border-base-100 indicator-bottom indicator-center h-2 w-4 badge badge-xs badge-error"></span>`;
                break;
            case 'idle':
                return `<span class="indicator-item border-2 border-base-100 indicator-bottom indicator-center h-2 w-4 badge badge-xs badge-warning"></span>`;
                break;
            case 'online':
                return `<span class="indicator-item border-2 border-base-100 indicator-bottom indicator-center h-2 w-4 badge badge-xs badge-success"></span>`;
                break;
            default:
                return `<span class="indicator-item border-2 border-base-100 indicator-bottom indicator-center h-2 w-4 badge badge-xs badge-secondary"></span>`;
                break;
        }
        
    }

</script>
<div class="flex flex-row gap-1 items-center">
    <div class="indicator">
        {@html statusIndicator}
        <div class="avatar">
            <div class="w-4 rounded-full">
            {#if (localStorage.getItem("user-streamermode") ?? 'false') === 'false'}
            <img src={avatar} />
            {:else}
            <img src='system/avatar-none.png' />
            {/if}
            </div>
        </div>
    </div>
    <p class="text-sm text-base-content/60 truncate w-1/2">{name}</p>
    {#if game != null}
    {#if (localStorage.getItem("user-streamermode") ?? 'false') === 'false'}
    <p class="ml-auto text-sm text-base-content/30 truncate w-1/2 text-right">{game.name}</p>
    {/if}
    {/if}
</div>
