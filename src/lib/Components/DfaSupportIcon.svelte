<script lang="ts">
	export let support: string;

	const supportMap: { [support: string]: { label: string; icon: string } } = {
		ilma: { label: 'Ilma', icon: 'ilma.png' },
		ainamanon: { label: 'Aina & Manon', icon: 'ainamanon.png' },
		'aina-manon': { label: 'Aina & Manon', icon: 'ainamanon.png' }, //TODO replace DB values
		aina_manon: { label: 'Aina & Manon', icon: 'ainamanon.png' }, //TODO replace DB values
		nadereh: { label: 'Nadereh', icon: 'nadereh.png' },
		glen: { label: 'Glen', icon: 'glen.png' }
	};

	$: supportInfo = supportMap[support];
</script>

<img class="mr-1 inline" src="/icons/dfa/{supportInfo.icon}" alt={supportInfo.label} />
{supportInfo.label}
