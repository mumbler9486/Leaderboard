<script lang="ts">
	import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';

	export let support: string;

	const supportMap: { [support: string]: { label: string; icon: string } } = {
		[DfAegisSupport.Ilma]: { label: 'Ilma', icon: 'ilma.png' },
		[DfAegisSupport.AinaManon]: { label: 'Aina & Manon', icon: 'ainamanon.png' }, //TODO replace DB values
		[DfAegisSupport.Nadereh]: { label: 'Nadereh', icon: 'nadereh.png' },
		[DfAegisSupport.Glen]: { label: 'Glen', icon: 'glen.png' }
	};

	$: supportInfo = supportMap[support];
</script>

<img class="mr-1 inline" src="/icons/dfa/{supportInfo.icon}" alt={supportInfo.label} />
{supportInfo.label}
