<script lang="ts">
	import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';
	import FilterTag from './FilterTag.svelte';

	interface Props {
		support: string;
	}

	let { support }: Props = $props();


	const supportMap: Record<string, { label: string; icon: string }> = {
		[DfAegisSupport.Ilma]: { label: 'Ilma', icon: '/icons/dfaegis/ilma.png' },
		[DfAegisSupport.AinaManon]: { label: 'Aina & Manon', icon: '/icons/dfaegis/ainamanon.png' },
		[DfAegisSupport.Nadereh]: { label: 'Nadereh', icon: '/icons/dfaegis/nadereh.png' },
		[DfAegisSupport.Glen]: { label: 'Glen', icon: '/icons/dfaegis/glen.png' }
	};
	let supportInfo = $derived(supportMap[support]);
</script>

<FilterTag icon={supportInfo.icon} label={supportInfo.label} on:click />
