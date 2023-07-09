<script lang="ts">
	import Button from '$lib/Components/Button.svelte';
	import ArksId from '$lib/PageComponents/Profile/ArksId.svelte';
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Player } from '$lib/types/api/player';
	import { fetchGetApi } from '$lib/utils/fetch';

	let isLoading: boolean = false;
	let player: Player;

	const reloadProfile = async () => {
		isLoading = true;
		try {
			const playerId = parseInt($page.params.playerId);
			player = await fetchGetApi<Player>(`/ngs-api/users/${playerId}`);
		} catch (err) {
			console.error(err);
		} finally {
			isLoading = false;
		}
	};

	onMount(reloadProfile);
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Your ARKs ID</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<ArksId {player} {isLoading} />
</div>
