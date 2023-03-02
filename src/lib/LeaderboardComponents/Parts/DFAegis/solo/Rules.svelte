<script lang="ts">
  export let modalID : string;
</script>

<input type="checkbox" id={modalID} class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative rounded max-w-4xl">
    <div class="flex flex-row">
        <span class="flex-1 font-light text-3xl md:text-4xl self-center">Rules</span>
        <label for={modalID} class="flex-initial btn btn-sm btn-square rounded btn-outline btn-secondary self-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </label>
    </div>
    <div class="divider -mx-6"></div>
    <ul class="list-disc list-inside space-y-2">
        <li><strong>Do not abuse bugs or exploits.</strong></li>
    </ul>
    <div class="divider -mx-6"></div>
    <div class="modal-action">
        <label for={modalID} class="btn md:btn-sm btn-secondary btn-outline rounded">Close</label>
    </div>
  </div>
</div>