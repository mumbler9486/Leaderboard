<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	export let link: string | undefined = undefined;
	export let color: string | undefined = undefined; //format bg-[#ffffff]
	export let tooltip: string | undefined = undefined;

	$: colorClass = color ?? '';
</script>

{#if link}
	<Tooltip tip={tooltip}>
		<a href={link} target="_blank" rel="noreferrer noopener"
			><span
				class="badge badge-lg rounded border-0 font-semibold text-white md:badge-md hover:brightness-75 {colorClass}"
				><slot /></span
			></a
		>
	</Tooltip>
{:else}
	<Tooltip tip={tooltip}>
		<span
			class="badge badge-lg cursor-pointer rounded border-0 font-semibold text-white md:badge-md hover:brightness-75 {colorClass}"
		>
			<slot />
		</span>
	</Tooltip>
{/if}
