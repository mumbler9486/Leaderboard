<script lang="ts">
	import FilterTag from './FilterTag.svelte';

	export let support: string;

	$: supportInfo = supportMap[support];

	const supportMap: { [support: string]: { label: string; icon: string } } = {
		ilma: { label: 'Ilma', icon: '/icons/dfaegis/ilma.png' },
		ainamanon: { label: 'Aina & Manon', icon: '/icons/dfaegis/ainamanon.png' },
		aina_manon: { label: 'Aina & Manon', icon: '/icons/dfaegis/ainamanon.png' },
		'aina-manon': { label: 'Aina & Manon', icon: '/icons/dfaegis/ainamanon.png' }, //TODO replace DB values
		nadereh: { label: 'Nadereh', icon: '/icons/dfaegis/nadereh.png' },
		glen: { label: 'Glen', icon: '/icons/dfaegis/glen.png' }
	};
</script>

<FilterTag icon={supportInfo.icon} label={supportInfo.label} on:click />
