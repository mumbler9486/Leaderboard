<script lang="ts">
	import { NgsPlayerStyleClass } from '$lib/types/api/ngsPlayerStyleClass';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		styleClass: NgsPlayerStyleClass;
		showLabel?: boolean;
		showTooltip?: boolean;
	}

	let { styleClass, showLabel = false, showTooltip = false }: Props = $props();

	const styleClassMap = {
		[NgsPlayerStyleClass.Adras]: { name: 'Adras', icon: '/icons/styles/style-adras.png' },
		[NgsPlayerStyleClass.Blitz]: { name: 'Blitz', icon: '/icons/styles/style-blitz.png' },
		[NgsPlayerStyleClass.Celeste]: { name: 'Celeste', icon: '/icons/styles/style-celeste.png' },
		[NgsPlayerStyleClass.None]: { name: 'Style None', icon: '/icons/styles/style-none.png' },
	};

	let styleInfo = $derived(styleClassMap[styleClass ?? NgsPlayerStyleClass.None]);
</script>

{#if showTooltip}
	<Tooltip tip={styleInfo.name}>
		<img
			src={styleInfo.icon}
			class="pointer-events-none h-[16px] w-[16px] object-cover"
			alt={styleInfo.name}
		/>
		{#if showLabel}
			{styleInfo.name}
		{/if}
	</Tooltip>
{:else}
	<img
		src={styleInfo.icon}
		class="pointer-events-none h-[16px] w-[16px] object-cover"
		alt={styleInfo.name}
	/>
	{#if showLabel}
		{styleInfo.name}
	{/if}
{/if}
