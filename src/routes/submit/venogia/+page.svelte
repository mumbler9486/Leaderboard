<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import ServerRegionSelector from '../ServerRegionSelector.svelte';
	import Alert from '$lib/Components/Alert.svelte';
	import PartyOptions from '../PartyOptions.svelte';
	import VenogiaOptions from './VenogiaOptions.svelte';

	import { t } from 'svelte-i18n';
	import { resetForm, runForm } from '../runStore';
	import { partyForm } from '../partyFormStore';
	import { submitVenogiaRun } from './submit';
	import { ErrorCodes } from '$lib/types/api/error';
	import { afterNavigate } from '$app/navigation';

	let submitting: boolean = false;
	let serverErrorMessage: string | undefined = undefined;
	let submitFinish = false;

	afterNavigate(() => {
		resetForm();
		$runForm.category = 'venogia';
		partyForm.setPartySize(1);
	});

	async function submitRun() {
		if (submitting) {
			return;
		}

		try {
			serverErrorMessage = undefined;
			submitting = true;
			const response: any = await submitVenogiaRun();

			if (response.code == ErrorCodes.ValidationError) {
				serverErrorMessage = response.details[0].message;
			}
			if (response.code == 'unexpected') {
				serverErrorMessage = 'Unexpected error, please contact site admin.';
			}
			if (response.success) {
				submitFinish = true;
			}
		} catch (err) {
			serverErrorMessage = 'Unexpected error, please contact site admin.';
			console.error(err);
		} finally {
			submitting = false;
		}
	}
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
						<div class="text-center text-xl font-semibold">
							Remnants of Ambition (Venogia Vera UQ)
						</div>
						<Divider />
						<div class="text-center text-lg font-semibold">Information</div>
						<div class="form-control">
							<ServerRegionSelector />
						</div>
						<div class="form-control">
							<VenogiaOptions />
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
								bind:value={$runForm.notes}
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
