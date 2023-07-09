<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import Button from '$lib/Components/Button.svelte';
	import type { CreateAccountRequest } from '$lib/server/types/api/createAccount';
	import { fetchPostApi } from '$lib/utils/fetch';
	import { goto } from '$app/navigation';
	import { clientPrincipleStore } from '$lib/stores/userLogin';
	import { UserRole } from '$lib/types/api/users/userRole';
	import Alert from '$lib/Components/Alert.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';

	let serverRegion = 'global';
	let characterName = '';

	let isLoading = true;
	let serverError: string | undefined = undefined;

	onMount(async () => {
		isLoading = true;
		const userInfo = await clientPrincipleStore.fetchClientPrinciple();

		// Not logged in, go back to home
		if (!userInfo) {
			goto('/');
			return;
		}

		// User finished setup?
		const isFinishedAccountSetup = userInfo?.userRoles.includes(UserRole.User);
		if (isFinishedAccountSetup) {
			goto('/');
			return;
		}
		isLoading = false;
	});

	const submitChanges = async () => {
		serverError = undefined;

		if (!$clientPrincipleStore) {
			serverError = 'Not logged in!';
			return;
		}

		const createAccountRequest: CreateAccountRequest = {
			userId: $clientPrincipleStore.userId,
			username: $clientPrincipleStore.userDetails,
			characterName: characterName,
			serverRegion: serverRegion
		} satisfies CreateAccountRequest;

		isLoading = true;
		try {
			const result = await fetchPostApi<boolean>('/ngs-api/users', createAccountRequest);

			if (result === true) {
				goto('/logout');
			} else {
				console.log(result);
				serverError = (result as any)?.details[0];
			}
		} catch (err) {
			serverError = 'An error has ocurred. Please contact an administrator on our Discord.';
			isLoading = false;
		}
	};

	const serverRegionOptions = [
		{ label: 'Global', value: 'global' },
		{ label: 'Japan', value: 'japan' }
	];
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | User Setup</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col place-content-center rounded-md border border-secondary bg-base-100 p-4 px-8 md:flex-col"
		>
			<div class="text-center text-4xl font-light">Account Setup</div>
			{#if isLoading}
				<LoadingBar />
			{:else}
				<div class="form-control">
					<label class="label" for="server-form">
						<span class="label-text">Your Server</span>
					</label>
					<Dropdown options={serverRegionOptions} bind:value={serverRegion} />
					<label class="label">
						<span class="label-text-alt text-warning"
							>This cannot be changed later without the help of an administrator.</span
						>
					</label>
				</div>
				<div class="form-control mb-4">
					<label class="label" for="charname-form">
						<span class="label-text">Your Main Character Name</span>
					</label>
					<input
						type="text"
						placeholder="Please enter a character name..."
						class="input-bordered input"
						maxlength="25"
						required
						bind:value={characterName}
					/>
					<label class="label">
						<span class="label-text-alt">You can change this from your profile later.</span>
					</label>
				</div>
				<div class="flex place-content-end">
					{#if serverError}
						<Alert type="error" message={serverError} />
					{/if}
					<Button class="btn-outline btn-success" on:click={submitChanges} on:keyup={submitChanges}>
						Complete Setup
					</Button>
				</div>
			{/if}
		</div>
	</div>
</div>
