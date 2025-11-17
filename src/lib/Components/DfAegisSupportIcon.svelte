<script lang="ts">
	import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';

	interface Props {
		support: DfAegisSupport;
	}

	let { support }: Props = $props();

	const supportMap: { [support: string]: { label: string; icon: string } } = {
		[DfAegisSupport.Ilma]: { label: 'Ilma', icon: 'ilma.png' },
		[DfAegisSupport.AinaManon]: { label: 'Aina & Manon', icon: 'ainamanon.png' }, //TODO replace DB values
		[DfAegisSupport.Nadereh]: { label: 'Nadereh', icon: 'nadereh.png' },
		[DfAegisSupport.Glen]: { label: 'Glen', icon: 'glen.png' },
		[DfAegisSupport.None]: { label: 'N/A', icon: '' },
	};

	let supportInfo = $derived(supportMap[support]);
</script>

{#if !support}
	-
{:else if support === DfAegisSupport.None}
	-
{:else}
	<img
		class="pointer-events-none mr-1 inline"
		src="/icons/dfaegis/{supportInfo.icon}"
		alt={supportInfo.label}
	/>
	{supportInfo.label}
{/if}
