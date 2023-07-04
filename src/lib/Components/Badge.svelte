<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	export let label: string;
	export let link: string | undefined = undefined;
	export let color: string | undefined = undefined; //format bg-[#ffffff]
	export let tooltip: string | undefined = undefined;
	export let icon: string | undefined = undefined;

	$: colorClass = color ?? '';
	$: iconClass = icon ? `bi bi-${icon}` : '';
</script>

{#if link}
	<Tooltip tip={tooltip}>
		<a href={link} target="_blank" rel="noreferrer noopener"
			><span
				class="badge badge-lg rounded border-0 font-semibold text-white md:badge-md hover:brightness-75 {colorClass}"
				><i class="mr-1 {iconClass}" />{label}</span
			></a
		>
	</Tooltip>
{:else}
	<Tooltip tip={tooltip}>
		<span
			class="badge badge-lg cursor-pointer rounded border-0 font-semibold text-white md:badge-md hover:brightness-75 {colorClass}"
		>
			<i class="mr-1 {iconClass}" />{label}
		</span>
	</Tooltip>
{/if}
