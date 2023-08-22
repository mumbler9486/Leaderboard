<script lang="ts">
	import ArksId from '$lib/PageComponents/Profile/ArksId.svelte';
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { PlayerProfile } from '$lib/types/api/players/player';
	import { fetchGetApi } from '$lib/utils/fetch';

	let isLoading: boolean = false;
	let player: PlayerProfile;
	let error: string | undefined;

	const reloadProfile = async () => {
		isLoading = true;
		error = undefined;

		try {
			const playerId = parseInt($page.params.playerId);
			const result = await fetchGetApi<PlayerProfile>(`/ngs-api/users/${playerId}`);

			if (typeof result == 'string') {
				error = 'Unknown user';
				return;
			}
			player = result;
		} catch (err) {
			error = 'Unknown user';
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

{#if error}
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div class="flex grow flex-col content-center p-4">{error}</div>
	</div>
{:else}
	<div class="flex grow flex-col content-center">
		<ArksId {player} {isLoading} />
	</div>
{/if}
