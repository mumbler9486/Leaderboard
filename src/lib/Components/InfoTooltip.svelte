<script lang="ts">
	import { InformationCircle } from 'svelte-heros-v2';

	// 1. Define the Props Interface named Props
	interface Props {
		tip: string;
		below?: boolean;
	}

	// 2. Use $props() to get typed props
	const { tip, below = false }: Props = $props();
</script>

<div class="tooltip cursor-pointer tooltip-info" class:tooltip-bottom={below} data-tip={tip}>
	<InformationCircle size="18" />
</div>
