<script lang="ts">
	interface Props {
		title?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { title = undefined, children }: Props = $props();
</script>

<div class="w-full rounded-md border-base-100 bg-base-100">
	{#if !!title}
		<div class="pt-6 text-center text-4xl font-light">{title}</div>
	{/if}
	{@render children?.()}
</div>
