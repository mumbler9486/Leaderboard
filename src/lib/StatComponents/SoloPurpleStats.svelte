<script lang="ts">
  import { onMount } from "svelte";
  let RunCount:string = '...';

  onMount(async () => {
  const response = await fetch('/ngs-api/CountSolos', {
      method: 'GET'
  });
  
  RunCount = await response.json();
});

</script>

<div class="stats shadow border border-secondary bg-neutral text-neutral-content flex mb-4 rounded-md">
  
    <div class="stat">
      <div class="stat-figure text-neutral-content">
        <i class="bi bi-card-list text-4xl"></i>
      </div>
      <div class="stat-title">Total Solo Runs</div>
      <div class="stat-value text-neutral-content">{RunCount}</div>
    </div>
</div>