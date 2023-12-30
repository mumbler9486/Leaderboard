<script lang="ts">
	export let color: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | undefined | null =
		undefined;

	const colorClassMap: Record<string, string> = {
		neutral: 'badge-neutral',
		primary: 'badge-primary',
		secondary: 'badge-secondary',
		accent: 'badge-accent',
		ghost: 'badge-ghost',
	};

	$: colorClass = !color ? '' : colorClassMap[color];
</script>

<div class="badge {colorClass}">
	<slot />
</div>
