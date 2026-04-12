<script lang="ts">
	interface Props {
		tip: string | undefined;
		left?: boolean;
		bottom?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		tip,
		left = false,
		bottom = false,
		children,
		...rest
	}: Props = $props();
</script>

<div
	class:tooltip={!!tip}
	class:tooltip-info={!!tip}
	class:tooltip-left={left}
	class:tooltip-bottom={bottom}
	class={rest.class}
	data-tip={tip}
>
	{@render children?.()}
</div>
