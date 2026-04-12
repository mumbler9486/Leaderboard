<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	interface Props {
		link?: string | undefined;
		color?: string | undefined;
		tooltip?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let {
		link = undefined,
		color = undefined,
		tooltip = undefined,
		children
	}: Props = $props();

	let colorClass = $derived(color ?? '');
</script>

{#if link}
	<Tooltip tip={tooltip}>
		<a href={link} target="_blank" rel="noreferrer noopener"
			><span
				class="badge badge-lg rounded border-0 font-semibold text-white md:badge-md hover:brightness-75 {colorClass}"
				>{@render children?.()}</span
			></a
		>
	</Tooltip>
{:else}
	<Tooltip tip={tooltip}>
		<span
			class="badge badge-lg cursor-pointer rounded border-0 font-semibold text-white md:badge-md hover:brightness-75 {colorClass}"
		>
			{@render children?.()}
		</span>
	</Tooltip>
{/if}
