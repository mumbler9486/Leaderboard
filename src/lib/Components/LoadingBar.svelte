<script lang="ts">
	interface Props {
		showLabel: boolean;
	}

	const { showLabel = true }: Props = $props();
</script>

<div class="flex flex-col place-content-center place-items-center gap-1">
	{#if showLabel}
		Loading - Please Wait...<br />
	{/if}
	<progress class="progress w-56 border border-neutral-content/20 progress-primary"></progress>
</div>
