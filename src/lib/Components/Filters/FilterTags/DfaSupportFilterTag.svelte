<script lang="ts">
	import FilterTag from './FilterTag.svelte';

	export let support: string;

	$: supportInfo = supportMap[support];

	const supportMap: { [support: string]: { label: string; icon: string } } = {
		ilma: { label: 'Ilma', icon: '/icons/dfa/ilma.png' },
		ainamanon: { label: 'Aina & Manon', icon: '/icons/dfa/ainamanon.png' },
		'aina-manon': { label: 'Aina & Manon', icon: '/icons/dfa/ainamanon.png' }, //TODO replace DB values
		nadereh: { label: 'Nadereh', icon: '/icons/dfa/nadereh.png' },
		glen: { label: 'Glen', icon: '/icons/dfa/glen.png' }
	};
</script>

<FilterTag icon={supportInfo.icon} label={supportInfo.label} on:click />
