<script lang="ts">
	import Tooltip from '$lib/Components/Tooltip.svelte';
	import type { Trophy } from '$lib/types/api/players/trophy';

	interface Props {
		trophy: Trophy;
	}

	let { trophy }: Props = $props();
</script>

<Tooltip tip={trophy.description}>
	<img
		class="pointer-events-none h-32 w-32 place-self-center drop-shadow-lg"
		src={trophy.image}
		alt={trophy.name}
	/>
	<span class="place-self-center text-lg font-semibold">{trophy.name}</span>
</Tooltip>
