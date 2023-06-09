<script lang="ts">
	import PurpleOptions from './PurpleOptions.svelte';
	import Divider from '$lib/Components/Divider.svelte';
	import ServerRegionSelector from '../ServerRegionSelector.svelte';
	import Alert from '$lib/Components/Alert.svelte';
	import PartyOptions from '../PartyOptions.svelte';

	import { t } from 'svelte-i18n';
	import { runForm } from '../runStore';
	import { loadPlayerInfo } from '../playerInfoStore';
	import { onMount } from 'svelte';
	import { submitForm } from '../submit';

	let notes: string;
	let submitting: boolean = false;
	let serverErrorMessage: string | undefined = undefined;
	let submitFinish = false;

	$: $runForm.notes = notes;

	$runForm.category = 'purples';
	onMount(loadPlayerInfo);

	async function submitRun() {
		if (submitting) {
			return;
		}

		try {
			serverErrorMessage = undefined;
			submitting = true;
			await setLoginInfoToForm();
			const response = await submitForm();
			if (response.error) {
				serverErrorMessage = response.details[0];
			}
			if (response.code == 'unexpected') {
				serverErrorMessage = 'Unexpected error, please contact site admin.';
			}
			if (response.data == 'success') {
				submitFinish = true;
			}
		} catch (err) {
			console.error(err);
		} finally {
			submitting = false;
		}
	}

	const setLoginInfoToForm = async () => {
		try {
			const res = await fetch('/.auth/me');
			const clientPrincipal = (await res.json()).clientPrincipal;
			$runForm.userId = clientPrincipal.userId as string;
			$runForm.username = clientPrincipal.userDetails as string;
		} catch (err) {
			console.error('Failed to get user login', err);
			throw err;
		}
	};
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Submit a Run</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8"
		>
			<div class="text-center text-4xl font-light">Submit a Run</div>
			<div class="divider -mx-8" />
			{#if submitFinish}
				<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
					Your run has been submitted and will be reviewed as soon as possible!
					<br />
					<a class="link-primary link" href="/">Click here to return to the home page!</a>
				</div>
			{:else}
				<form id="submitForm" on:submit|preventDefault={submitRun}>
					<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
						<div class="text-center text-xl font-semibold">Purples</div>
						<Divider />
						<div class="text-center text-lg font-semibold">Information</div>
						<div class="form-control">
							<ServerRegionSelector />
						</div>
						<div class="form-control">
							<PurpleOptions />
						</div>
					</div>
					<PartyOptions />
					<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
						<div class="form-control">
							<label class="label" for="notes-form">
								<span class="label-text">Notes</span>
							</label>
							<textarea
								class="widget-discord textarea-bordered textarea h-24"
								placeholder="(Optional) Type any notes, extra run information, or descriptions here!"
								bind:value={notes}
							/>
						</div>
					</div>

					{#if serverErrorMessage}
						<Alert type="error" message={serverErrorMessage} />
					{/if}
					{#if submitting}
						<Alert type="info" message="Submitting - Please Wait..." />
						<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
							Submitting - Please Wait...<br /><progress
								class="progress progress-primary w-56 border border-neutral-content/20"
							/>
						</div>
					{/if}
					<div class="grid grid-cols-1 text-center">
						<button
							disabled={submitting}
							class="btn-outline btn-success btn mt-4 w-1/2 justify-self-center"
							on:click={submitRun}>Submit Run</button
						>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	.widget-discord::-webkit-scrollbar {
		width: 10px;
	}
	.widget-discord::-webkit-scrollbar-thumb,
	::-webkit-scrollbar-track-piece {
		background-clip: padding-box;
		border: 3px solid transparent;
		border-radius: 5px;
	}
	.widget-discord::-webkit-scrollbar-thumb {
		background-color: hsla(0, 0%, 100%, 0.1);
	}
	.widget-discord::-webkit-scrollbar-track-piece {
		background-color: transparent;
	}
</style>
