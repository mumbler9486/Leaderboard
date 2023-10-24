<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import ServerRegionSelector from '../ServerRegionSelector.svelte';
	import Alert from '$lib/Components/Alert.svelte';
	import PartyOptions from '../PartyOptions.svelte';
	import DfSolusOptions from './DfSolusOptions.svelte';

	import { t } from 'svelte-i18n';
	import { resetForm, runForm } from '../runStore';
	import { partyForm } from '../partyFormStore';
	import { submitDfSolusRun } from './submit';
	import { ErrorCodes } from '$lib/types/api/error';
	import { afterNavigate } from '$app/navigation';
	import SubmitFinish from '../SubmitFinish.svelte';

	let submitting: boolean = false;
	let serverErrorMessage: string | undefined = undefined;
	let submitFinish = false;

	afterNavigate(() => {
		resetForm();
		partyForm.setPartySize(1);
	});

	async function submitRun() {
		if (submitting) {
			return;
		}

		try {
			serverErrorMessage = undefined;
			submitting = true;
			const response: any = await submitDfSolusRun();

			if (response.code == ErrorCodes.ValidationError) {
				serverErrorMessage = response.details[0].message;
			} else if (response.error == ErrorCodes.BadRequest) {
				serverErrorMessage = response.details[0];
			} else if (response.code == ErrorCodes.Unexpected) {
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
				<SubmitFinish />
			{:else}
				<form id="submitForm" on:submit|preventDefault={submitRun}>
					<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
						<div class="text-center text-xl font-semibold">
							Signs of the Planetbreaker (Dark Falz Solus)
						</div>
						<Divider />
						<div class="text-center text-lg font-semibold">Information</div>
						<div class="form-control">
							<ServerRegionSelector />
						</div>
						<div class="form-control">
							<DfSolusOptions />
						</div>
					</div>
					<PartyOptions />
					<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
						<div class="form-control">
							<label class="label" for="notes-form">
								<span class="label-text">Notes</span>
							</label>
							<textarea
								class="widget-discord textarea textarea-bordered h-24"
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
							class="btn btn-success btn-outline mt-4 w-1/2 justify-self-center"
							on:click={submitRun}>Submit Run</button
						>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>
