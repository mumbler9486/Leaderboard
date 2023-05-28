<script lang="ts">
	import { t } from 'svelte-i18n';
	// @ts-nocheck
	import { onMount } from 'svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';

	let userInfo = null;

	onMount(async () => {
		const response = await fetch('/.auth/me');
		const payload = await response.json();
		const { clientPrincipal } = payload;
		userInfo = clientPrincipal;
	});

	async function submitChanges() {
		let data = {
			setupServer: null,
			setupName: null,
			setupPlayerName: null,
			setupUserID: null
		};

		data.setupServer = document.getElementById('server-form').value;
		data.setupName = document.getElementById('charname-form').value;
		data.setupPlayerName = userInfo.userDetails;
		data.setupUserID = userInfo.userId;

		console.log(data);

		const response = await fetch('/ngs-api/FinishSetup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		var evt = await response.json();
		if (evt.Successful && evt.Successful == 'Aye') {
			window.location.replace('/logout');
		}
	}
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | User Setup</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col place-content-center rounded-md border border-secondary bg-base-100 p-4 px-8 md:flex-col"
		>
			{#if userInfo != null && !userInfo.userRoles.includes('user')}
				<form id="editingForm" on:submit={submitChanges}>
					<div class="form-control">
						<label class="label" for="server-form">
							<span class="label-text">Your Server</span>
						</label>
						<select id="server-form" class="select-bordered select" required>
							<option value="" disabled selected>Select a Server...</option>
							<option value="global">Global</option>
							<option value="japan">Japan</option>
						</select>
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
							id="charname-form"
							type="text"
							placeholder="Please enter a character name..."
							class="input-bordered input"
							maxlength="24"
							required
						/>
						<label class="label">
							<span class="label-text-alt">You can change this from your profile later.</span>
						</label>
					</div>
					<div class="flex place-content-end">
						<span class="mr-2 text-warning"
							>You will need to log in again after finishing setup.</span
						><button
							class="btn-outline btn-success btn rounded md:btn-sm"
							type="submit"
							form="editingForm">Confirm</button
						>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>

<BackgroundRandomizer />
