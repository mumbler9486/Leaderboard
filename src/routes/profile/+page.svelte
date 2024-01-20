<script lang="ts">
	import ProfileEditModal from './ProfileEditModal.svelte';
	import Button from '$lib/Components/Button.svelte';
	import ArksId from '$lib/PageComponents/Profile/ArksId.svelte';
	import { t } from 'svelte-i18n';
	import { playerInfoStore } from '$lib/stores/userLogin';
	import { onMount } from 'svelte';
	import { Cog8Tooth } from 'svelte-heros-v2';

	let modalEdit: ProfileEditModal;
	let isLoading: boolean = false;

	const reloadProfile = async () => {
		isLoading = true;
		try {
			await playerInfoStore.refreshInfo();
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
	<ArksId player={$playerInfoStore} {isLoading}>
		<svelte:fragment slot="actions">
			<Button
				class="mr-2 mt-2 justify-self-end bg-[#54a851] text-white hover:bg-[#54a851] hover:brightness-75"
				on:click={modalEdit.show}
			>
				<!-- TODO Icon -->
				<Cog8Tooth size="18" />Edit Profile
			</Button>
		</svelte:fragment>
	</ArksId>
</div>

<ProfileEditModal bind:this={modalEdit} on:profileUpdated={reloadProfile} />
