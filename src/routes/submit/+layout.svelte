<script lang="ts">
	import { playerInfoStore } from '$lib/stores/userLogin';

	playerInfoStore.refreshInfo();
</script>

{#await playerInfoStore.refreshInfo() then}
	<slot />
{/await}
