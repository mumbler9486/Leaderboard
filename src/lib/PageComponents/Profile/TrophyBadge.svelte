<script lang="ts">
	import Tooltip from '$lib/Components/Tooltip.svelte';
	import type { Trophy } from '$lib/types/api/players/trophy';

	export let trophy: Trophy;
</script>

<Tooltip tip={trophy.description}>
	<img class="h-32 w-32 place-self-center drop-shadow-lg" src={trophy.image} alt={trophy.name} />
	<span class="place-self-center text-lg font-semibold">{trophy.name}</span>
</Tooltip>
