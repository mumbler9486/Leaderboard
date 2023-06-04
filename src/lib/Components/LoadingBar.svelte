<script lang="ts">
	export let showLabel: boolean = true;
</script>

<div class="flex basis-full flex-col place-content-center place-items-center gap-1 {$$props.class}">
	{#if showLabel}
		Loading - Please Wait...<br />
	{/if}
	<progress class="progress progress-primary w-56 border border-neutral-content/20" />
</div>
