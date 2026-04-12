<script lang="ts">
	import { playerInfoStore } from '$lib/stores/userLogin';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	playerInfoStore.refreshInfo();
</script>

{#await playerInfoStore.refreshInfo() then}
	{@render children?.()}
{/await}
