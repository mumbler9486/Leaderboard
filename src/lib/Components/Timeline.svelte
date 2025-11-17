<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
	{@render children?.()}
</ul>
