<script lang="ts">
	import { t } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import Button from '$lib/Components/Button.svelte';
	import type { CreateAccountRequest } from '$lib/server/types/api/createAccount';
	import { fetchPostApi } from '$lib/utils/fetch';
	import { goto } from '$app/navigation';
	import { clientPrincipleStore } from '$lib/stores/userLogin';
	import { UserRole } from '$lib/types/api/users/userRole';
	import Alert from '$lib/Components/Alert.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import { ErrorCodes } from '$lib/types/api/error';

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
			username: $clientPrincipleStore.userDetails,
			characterName: characterName,
		} satisfies CreateAccountRequest;

		isLoading = true;
		try {
			const response = await fetchPostApi<any>('/ngs-api/users', createAccountRequest);

			if (response.error == ErrorCodes.ValidationError) {
				serverError = response.details[0];
				isLoading = false;
			} else if (response.error == ErrorCodes.BadRequest) {
				serverError = response.details[0];
				isLoading = false;
			} else if (response.error == ErrorCodes.Unexpected) {
				serverError = 'Unexpected error, please contact site admin.';
				isLoading = false;
			}
			if (response === true) {
				goto('/logout');
				return;
			}
		} catch (err) {
			serverError = 'An error has ocurred. Please contact a moderator on our Discord.';
			isLoading = false;
		}
	};
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
				<p class="my-8">
					Before you can use your leaderboard account, please finish setting up your account.
				</p>
				<div class="form-control mb-4">
					<label class="label" for="charname-form">
						<span class="label-text">Your Main Character Name (Required)</span>
					</label>
					<input
						type="text"
						placeholder="Please enter a character name..."
						class="input input-bordered"
						maxlength="25"
						required
						bind:value={characterName}
					/>
					<label class="label">
						<span class="label-text-alt"
							>You can change this name and how others see your name from your profile later.</span
						>
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
