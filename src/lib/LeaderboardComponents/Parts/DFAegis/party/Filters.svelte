<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from 'svelte-i18n';
  const dispatch = createEventDispatcher();
  
  export let modalID : string;

  export let filters = {};

  let allowedPatches = [
      "P60"
  ]

  export function openRefresh() {

    if(filters.buff != null) {
      document.getElementById("radio-buffFilter-" + filters.buff).checked = true;
    }
    else {
      document.getElementById("radio-buffFilter-none").checked = true;
    }

    if(filters.server != null && (filters.server === 'global' || filters.server === 'japan')) {
      document.getElementById("radio-serverFilter-" + filters.server).checked = true;
    }
    else {
      document.getElementById("radio-serverFilter-none").checked = true;
    }

  }

	function evtFilters(buff, server) {
		dispatch('msgFiltersUpdate', {
      buff: buff,
      server: server,
		});
	}

</script>

<input type="checkbox" id={modalID} class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative rounded max-w-4xl">
    <div class="flex flex-row">
        <span class="flex-1 font-light text-3xl md:text-4xl self-center">Filters</span>
        <label for={modalID} class="flex-initial btn btn-sm btn-square rounded btn-outline btn-secondary self-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </label>
    </div>
    <div class="divider -mx-6"></div>

    <span class="flex flex-row justify-center mb-2 md:justify-start text-base-100-content font-semibold">Patch</span>

    <div class="flex flex-row flex-wrap gap-1 justify-center md:justify-start">

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/dfa/nadereh.png" alt="Nadereh">
        <span class="label-text text-neutral-content">Nadereh</span> 
        <input type="radio" id="radio-buffFilter-nadereh" value="nadereh" name="radio-buffFilter" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/dfa/aina-manon.png" alt="Aina & Manon">
        <span class="label-text text-neutral-content">Aina & Manon</span> 
        <input type="radio" id="radio-buffFilter-ainamanon" value="ainamanon" name="radio-buffFilter" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/dfa/ilma.png" alt="Ilma">
        <span class="label-text text-neutral-content">Ilma</span> 
        <input type="radio" id="radio-buffFilter-ilma" value="ilma" name="radio-buffFilter" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/dfa/glen.png" alt="Glen">
        <span class="label-text text-neutral-content">Glen</span> 
        <input type="radio" id="radio-buffFilter-glen" value="glen" name="radio-buffFilter" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-unknown.png" alt="No Filter">
        <span class="label-text text-neutral-content">No Filter</span> 
        <input type="radio" id="radio-buffFilter-none" value=null name="radio-buffFilter" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" checked />
      </label>

    </div>

    <div class="divider"></div>

    <span class="flex flex-row justify-center mb-2 md:justify-start text-base-100-content font-semibold">Server</span>

    <div class="flex flex-row flex-wrap gap-1 justify-center md:justify-start">

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-[17rem]">
        <span class="label-text text-neutral-content">No Filter</span> 
        <input type="radio" id="radio-serverFilter-none" value=null name="radio-serverFilter" class="radio radio-sm checked:bg-neutral-content rounded border-neutral-content/25" checked />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-[17rem]">
        <img src="/icons/server/server-global.png" alt="Global">
        <span class="label-text text-neutral-content">Global</span> 
        <input type="radio" id="radio-serverFilter-global" value="global" name="radio-serverFilter" class="radio radio-sm checked:bg-neutral-content rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-[17rem]">
        <img src="/icons/server/server-japan.png" alt="Japan">
        <span class="label-text text-neutral-content">Japan</span> 
        <input type="radio" id="radio-serverFilter-japan" value="japan" name="radio-serverFilter" class="radio radio-sm checked:bg-neutral-content rounded border-neutral-content/25" />
      </label>

    </div>

    <div class="divider -mx-6"></div>
    <div class="modal-action justify-center md:justify-end">
      <label for={modalID} on:click={() => evtFilters(null,null)} class="btn md:btn-sm btn-secondary btn-outline rounded">Reset Filters</label>
      <label for={modalID} on:click={() => evtFilters((document.querySelector('input[name="radio-buffFilter"]:checked').value),(document.querySelector('input[name="radio-serverFilter"]:checked').value))} class="btn md:btn-sm btn-primary btn-outline rounded">Apply Filters</label>
    </div>
  </div>
</div>