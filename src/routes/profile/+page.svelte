<script lang="ts">
	import ProfileEditModal from './ProfileEditModal.svelte';
	import Button from '$lib/Components/Button.svelte';
	import ArksId from '$lib/PageComponents/ArksId.svelte';
	import { t } from 'svelte-i18n';
	import { playerInfoStore } from '$lib/stores/userLogin';
	import { onMount } from 'svelte';

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
				class="mt-2 mr-2 justify-self-end bg-[#54a851] text-white hover:bg-[#54a851] hover:brightness-75"
				on:click={modalEdit.show}
			>
				<i class="bi bi-gear mr-2" />Edit Profile
			</Button>
		</svelte:fragment>
	</ArksId>
</div>

<ProfileEditModal bind:this={modalEdit} on:profileUpdated={reloadProfile} />
