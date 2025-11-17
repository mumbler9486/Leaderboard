<script lang="ts">
	interface Props {
		color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | undefined | null;
		children?: import('svelte').Snippet;
	}

	let { color = undefined, children }: Props = $props();

	const colorClassMap: Record<string, string> = {
		neutral: 'badge-neutral',
		primary: 'badge-primary',
		secondary: 'badge-secondary',
		accent: 'badge-accent',
		ghost: 'badge-ghost',
	};

	let colorClass = $derived(!color ? '' : colorClassMap[color]);
</script>

<div class="badge {colorClass}">
	{@render children?.()}
</div>
