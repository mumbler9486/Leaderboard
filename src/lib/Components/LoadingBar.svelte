<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	export let showLabel: boolean = true;
</script>

<div class="flex flex-col place-content-center place-items-center gap-1 {$$props.class}">
	{#if showLabel}
		Loading - Please Wait...<br />
	{/if}
	<progress class="progress progress-primary w-56 border border-neutral-content/20" />
</div>
