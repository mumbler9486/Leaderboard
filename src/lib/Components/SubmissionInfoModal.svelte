<script lang="ts">
	import Alert from './Alert.svelte';
	import Button from './Button.svelte';
	import LoadingBar from './LoadingBar.svelte';
	import Modal from './Modal.svelte';
	import PlayerNameBadge from './PlayerNameBadge.svelte';
	import VideoPlayer from './VideoPlayer.svelte';

	import type { Submission } from '$lib/types/api/submissions/submissions';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import { createEventDispatcher } from 'svelte';

	const dispatcher = createEventDispatcher();

	export let submission: Submission | undefined;

	$: player1 = submission?.players[0];

	let modal: Modal;
	let modNotes: string;

	let processing = false;
	let errorMessage = '';

	export const showModal = () => {
		modal.show();
	};

	const approveRun = async () => {
		if (processing) {
			return;
		}

		if (!submission) {
			console.error('Submission does not exist.');
			return;
		}

		const { userId, username } = await getLogin();

		const approveRequest = {
			category: submission?.category,
			runId: submission?.runId,
			moderatorName: username,
			modNotes: modNotes ?? ''
		};

		processing = true;
		try {
			const response = await fetch('/ngs-api/submissions/approve', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(approveRequest)
			});
			const result = await response.json();

			if (result.error) {
				errorMessage = result.details[0];
			}
			if (result.code == 'unexpected') {
				errorMessage = 'Unexpected error, please contact site admin.';
			}
			if (result.data == 'success') {
				closeModal();
				dispatcher('submissionChanged', 'approved');
			}
		} catch (err) {
			console.error(err);
		} finally {
			processing = false;
		}
	};

	const denyRun = async () => {
		if (processing) {
			return;
		}

		if (!submission) {
			console.error('Submission does not exist.');
			return;
		}

		const { userId, username } = await getLogin();

		const denyRequest = {
			category: submission.category,
			runId: submission?.runId,
			moderatorName: username,
			modNotes: modNotes ?? ''
		};

		processing = true;
		try {
			const response = await fetch('/ngs-api/submissions/deny', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(denyRequest)
			});
			const result = await response.json();

			if (result.error) {
				errorMessage = result.details[0];
			}
			if (result.code == 'unexpected') {
				errorMessage = 'Unexpected error, please contact site admin.';
			}
			if (result.data == 'success') {
				closeModal();
				dispatcher('submissionChanged', 'approved');
			}
		} catch (err) {
			console.error(err);
		} finally {
			processing = false;
		}
	};

	const getLogin = async () => {
		try {
			const res = await fetch('/.auth/me');
			const clientPrincipal = (await res.json()).clientPrincipal;
			const userId = clientPrincipal.userId as string;
			const username = clientPrincipal.userDetails as string;
			return {
				userId,
				username
			};
		} catch (err) {
			console.error('Failed to get user login', err);
			throw err;
		}
	};

	const closeModal = () => {
		modal.close();
	};
</script>

<Modal
	modalId="submission-info"
	title="Submission Information"
	bind:this={modal}
	allowDefocusClose={false}
>
	{#if processing}
		<LoadingBar />
	{:else}
		{#if errorMessage != ''}
			<Alert type="error" message={errorMessage} />
		{/if}
		<VideoPlayer url={player1?.linkPov} />
		<div
			class="flex basis-full justify-center rounded-md border border-secondary bg-secondary/25 p-2"
		>
			<div class="flex flex-col text-center">
				<span class="text-lg font-semibold"><i class="bi bi-youtube" />Video Link:</span>
				<a
					class="link-primary link"
					href={player1?.linkPov}
					target="_blank"
					rel="noreferrer noopener">{player1?.linkPov}</a
				>
			</div>
		</div>
		<div class="flex flex-col gap-2 p-2 md:flex-row md:gap-0">
			<div class="flex basis-full flex-col justify-center md:flex-row">
				<span class="flex place-content-center md:mr-1">Run By:</span>
				<PlayerNameBadge
					showLink
					player={submission ? mapToNamePref(submission?.players[0]) : {}}
				/>
			</div>

			<div class="flex basis-full flex-col justify-center md:flex-row">
				<span class="flex place-content-center md:mr-1">Submitted By:</span>
				<PlayerNameBadge showLink player={submission ? mapToNamePref(submission?.submitter) : {}} />
			</div>

			{#if false}
				<!-- TODO add video tags -->
				<div class="flex basis-full justify-center">
					<span><i class="bi bi-film mr-1" /> Low Video Quality</span>
				</div>
			{/if}
		</div>
		<div class="flex grow flex-col gap-1 md:flex-row">
			<div
				class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2 md:basis-full"
			>
				<div class="flex grow flex-col">
					<span class="text-center text-lg font-semibold">Runner's Notes:</span>
					<div class="whitespace-pre-wrap p-2">{submission?.notes ?? ''}</div>
				</div>
			</div>
			<div
				class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2 md:basis-full"
			>
				<div class="flex grow flex-col">
					<span class="text-center text-lg font-semibold">Moderator's Notes:</span>
					<div class="whitespace-pre-wrap p-2">
						<textarea
							class="widget-discord textarea-bordered textarea w-full grow"
							placeholder="(Optional) Type any moderator notes you want to display here!"
							maxlength="500"
							bind:value={modNotes}
						/>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<svelte:fragment slot="actions">
		<Button
			class="btn-outline btn-error"
			on:click={denyRun}
			on:keyup={denyRun}
			disabled={processing}>Deny</Button
		>
		<Button
			class="btn-outline btn-success"
			on:click={approveRun}
			on:keyup={approveRun}
			disabled={processing}>Approve</Button
		>
		<Button
			class="btn-outline btn-secondary"
			on:click={closeModal}
			on:keyup={closeModal}
			disabled={processing}>Close</Button
		>
	</svelte:fragment>
</Modal>

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
