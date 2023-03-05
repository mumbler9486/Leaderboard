<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from 'svelte-i18n';
  const dispatch = createEventDispatcher();
  
  export let modalID : string;

  let allowedClasses = [
      "hunter",
      "fighter",
      "ranger",
      "gunner",
      "force",
      "techter",
      "braver",
      "bouncer",
      "waker"
    ]

  export let filters = {};

  let allowedPatches = [
      "P60"
  ]

  export function openRefresh() {

    if(filters.class != null && allowedClasses.includes(filters.class)) {
      document.getElementById("radio-classFilter-" + filters.class).checked = true;

    }
    else {
      document.getElementById("radio-classFilter-none").checked = true;
    }

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

    if(filters.videos != null && filters.videos === '1') {
      document.getElementById("radio-videoFilter-show").checked = true;
    }
    else {
      document.getElementById("radio-videoFilter-show").checked = false;
    }

    if(filters.weapons != null && filters.weapons === '1') {
      document.getElementById("radio-weaponFilter-show").checked = true;
    }
    else {
      document.getElementById("radio-weaponFilter-show").checked = false;
    }

  }

	function evtFilters(inClass, buff, server, video, weapons) {
    if (video != null && video.checked) {
      video = '1';
    }
    else {
      video = '0';
    }
    if (weapons != null && weapons.checked) {
      weapons = '1';
    }
    else {
      weapons = '0';
    }
		dispatch('msgFiltersUpdate', {
			class: inClass,
      buff: buff,
      server: server,
      video: video,
      weapons: weapons
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

    <span class="flex flex-row justify-center mb-2 md:justify-start text-base-100-content font-semibold">Main Class</span>

    <div class="flex flex-row flex-wrap gap-1 justify-center md:justify-start">

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-unknown.png" alt="No Filter">
        <span class="label-text text-neutral-content">No Filter</span> 
        <input type="radio" id="radio-classFilter-none" value=null name="radio-classFilter" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" checked />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-hunter.png" alt="Hunter">
        <span class="label-text text-neutral-content">{$t('common.classes.hunter')}</span> 
        <input type="radio" id="radio-classFilter-hunter" value="hunter" name="radio-classFilter" class="radio radio-sm checked:bg-[#E14343] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-fighter.png" alt="Fighter">
        <span class="label-text text-neutral-content">{$t('common.classes.fighter')}</span> 
        <input type="radio" id="radio-classFilter-fighter" value="fighter" name="radio-classFilter" class="radio radio-sm checked:bg-[#E143CD] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-ranger.png" alt="Ranger">
        <span class="label-text text-neutral-content">{$t('common.classes.ranger')}</span> 
        <input type="radio" id="radio-classFilter-ranger" value="ranger" name="radio-classFilter" class="radio radio-sm checked:bg-[#4367E1] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-gunner.png" alt="Gunner">
        <span class="label-text text-neutral-content">{$t('common.classes.gunner')}</span> 
        <input type="radio" id="radio-classFilter-gunner" value="gunner" name="radio-classFilter" class="radio radio-sm checked:bg-[#3CB1F5] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-force.png" alt="Force">
        <span class="label-text text-neutral-content">{$t('common.classes.force')}</span> 
        <input type="radio" id="radio-classFilter-force" value="force" name="radio-classFilter" class="radio radio-sm checked:bg-[#F5EE3C] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-techter.png" alt="Techter">
        <span class="label-text text-neutral-content">{$t('common.classes.techter')}</span> 
        <input type="radio" id="radio-classFilter-techter" value="techter" name="radio-classFilter" class="radio radio-sm checked:bg-[#F5B63C] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-braver.png" alt="Braver">
        <span class="label-text text-neutral-content">{$t('common.classes.braver')}</span> 
        <input type="radio" id="radio-classFilter-braver" value="braver" name="radio-classFilter" class="radio radio-sm checked:bg-[#3CF568] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-bouncer.png" alt="Bouncer">
        <span class="label-text text-neutral-content">{$t('common.classes.bouncer')}</span> 
        <input type="radio" id="radio-classFilter-bouncer" value="bouncer" name="radio-classFilter" class="radio radio-sm checked:bg-[#B1F53C] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/class/class-waker.png" alt="Waker">
        <span class="label-text text-neutral-content">{$t('common.classes.waker')}</span> 
        <input type="radio" id="radio-classFilter-waker" value="waker" name="radio-classFilter" class="radio radio-sm checked:bg-[#FF794A] rounded border-neutral-content/25" />
      </label>
<!--
      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-[8.5rem]">
        <img src="/icons/class/class-unknown.png" alt="Placeholder">
        <span class="label-text text-neutral-content">Luster?</span> 
        <input type="radio" name="radio-classFilter" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" />
      </label>
-->
<!--
      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-[8.5rem]">
        <img src="/icons/class/class-unknown.png" alt="Placeholder">
        <span class="label-text text-neutral-content">???</span> 
        <input type="radio" name="radio-classFilter" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" />
      </label>
-->

    </div>

    <div class="divider"></div>

    <span class="flex flex-row justify-center mb-2 md:justify-start text-base-100-content font-semibold">Support</span>

    <div class="flex flex-row flex-wrap gap-1 justify-center md:justify-start">

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/dfa/nadereh.png" alt="Nadereh">
        <span class="label-text text-neutral-content">Nadereh</span> 
        <input type="radio" id="radio-buffFilter-nadereh" value="nadereh" name="radio-buffFilter" class="radio radio-sm checked:bg-[#DBDBDB] rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-32 md:w-[10.1rem]">
        <img src="/icons/dfa/ainamanon.png" alt="Aina & Manon">
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

    <div class="divider"></div>

    <span class="flex flex-row justify-center mb-2 md:justify-start text-base-100-content font-semibold">Other</span>

    <div class="flex flex-row flex-wrap gap-1 justify-center md:justify-start">

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-[17rem]">
        <span class="label-text text-neutral-content">Show Incomplete Videos</span> 
        <input type="checkbox" id="radio-videoFilter-show" value=1 name="radio-videoFilter" class="toggle toggle-sm checked:bg-neutral-content rounded border-neutral-content/25" />
      </label>

      <label class="label cursor-pointer border border-neutral-content/25 rounded bg-neutral gap-2 px-2 w-[17rem]">
        <span class="label-text text-neutral-content">Show Runs with Same Class Combo but Different Weapons</span> 
        <input type="checkbox" id="radio-weaponFilter-show" value=1 name="radio-weaponFilter" class="toggle toggle-sm checked:bg-neutral-content rounded border-neutral-content/25" />
      </label>

    </div>

    <div class="divider -mx-6"></div>
    <div class="modal-action justify-center md:justify-end">
      <label for={modalID} on:click={() => evtFilters(null,null,null,null,null)} class="btn md:btn-sm btn-secondary btn-outline rounded">Reset Filters</label>
      <label for={modalID} on:click={() => evtFilters((document.querySelector('input[name="radio-classFilter"]:checked').value),(document.querySelector('input[name="radio-buffFilter"]:checked').value),(document.querySelector('input[name="radio-serverFilter"]:checked').value),(document.querySelector('input[name="radio-videoFilter"]')),(document.querySelector('input[name="radio-weaponFilter"]')))} class="btn md:btn-sm btn-primary btn-outline rounded">Apply Filters</label>
    </div>
  </div>
</div>