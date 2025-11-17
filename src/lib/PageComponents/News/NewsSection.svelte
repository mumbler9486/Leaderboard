<script lang="ts">
	interface Props {
		sectionTitle?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { sectionTitle = undefined, children }: Props = $props();
</script>

<div class="py-2">
	{#if !!sectionTitle}
		<strong>{sectionTitle}</strong>
	{/if}
	<p>
		{@render children?.()}
	</p>
</div>
