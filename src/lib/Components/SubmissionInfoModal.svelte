<script lang="ts">
	import Alert from './Alert.svelte';
	import Button from './Button.svelte';
	import LoadingBar from './LoadingBar.svelte';
	import Modal from './Modal.svelte';
	import PlayerNameBadge from './PlayerNameBadge.svelte';
	import VideoPlayer from './VideoPlayer.svelte';

	import { mapPlayerInfoNamePref, mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import { createEventDispatcher } from 'svelte';
	import type { ApproveRequest, DenyRequest } from '$lib/types/api/validation/submissions';
	import type { Run } from '$lib/types/api/runs/run';
	import { fetchPostApi } from '$lib/utils/fetch';
	import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';
	import { ErrorCodes } from '$lib/types/api/error';
	import YouTubeIcon from './Icons/YouTubeIcon.svelte';
	import TextArea from './TextArea.svelte';

	const dispatcher = createEventDispatcher();

	let submission: Run | undefined;

	let modal: Modal;
	let modNotes: string;

	let processing = false;
	let errorMessage = '';

	$: canReview = submission?.submissionStatus === RunSubmissionStatus.AwaitingApproval;

	export const showModal = (viewRun: Run<any>) => {
		submission = viewRun;
		modNotes = '';
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

		const approveRequest: ApproveRequest = {
			runId: submission?.runId,
			modNotes: modNotes ?? '',
		};

		processing = true;
		try {
			const result = await fetchPostApi<any>(`/ngs-api/runs/submissions/approve`, approveRequest);

			if (result.error) {
				errorMessage = result.details[0];
			}
			if (result.code == ErrorCodes.Unauthorized) {
				errorMessage = result.details[0];
			}
			if (result.code == ErrorCodes.Unexpected) {
				errorMessage = 'Unexpected error, please contact site admin.';
			}
			if (result.data == 'success') {
				closeModal();
				dispatcher('submissionChanged', 'approved');
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'Unexpected error, please contact site admin.';
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

		const denyRequest: DenyRequest = {
			runId: submission?.runId,
			modNotes: modNotes ?? '',
		};

		processing = true;
		try {
			const result = await fetchPostApi<any>(`/ngs-api/runs/submissions/deny`, denyRequest);

			if (result.error) {
				errorMessage = result.details[0];
			}
			if (result.code == ErrorCodes.Unauthorized) {
				errorMessage = result.details[0];
			}
			if (result.code == ErrorCodes.Unexpected) {
				errorMessage = 'Unexpected error, please contact site admin.';
			}
			if (result.data == 'success') {
				closeModal();
				dispatcher('submissionChanged', 'denied');
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'Unexpected error, please contact site admin.';
		} finally {
			processing = false;
		}
	};

	const closeModal = () => {
		modal.close();
	};

	const videoPlayers: Record<string, VideoPlayer> = {};
	$: videoPlayersList = Object.values(videoPlayers) ?? [];

	const stopAllVideoPlayers = () => {
		videoPlayersList.forEach((v) => v?.stop());
	};
</script>

<Modal
	modalId="submission-info"
	size="wide"
	title="Submission Information"
	bind:this={modal}
	allowDefocusClose={false}
	on:closed={stopAllVideoPlayers}
>
	{#if processing}
		<LoadingBar />
	{:else}
		{#if errorMessage != ''}
			<Alert type="error" message={errorMessage} />
		{/if}
		{#each submission?.party ?? [] as player, playerIndex}
			{#if player.linkPov}
				<PlayerNameBadge player={mapPartyMemberToNamePref(player)} />
				<VideoPlayer bind:this={videoPlayers[playerIndex]} url={player.linkPov} />
				<div class="flex justify-center rounded-md border border-secondary bg-secondary/25 p-2">
					<div class="flex flex-col text-center">
						<span class="inline flex flex-row items-center gap-1 text-lg font-semibold"
							><YouTubeIcon />
							{!player.playerId ? player.runCharacterName : player.playerName}'s POV Video Link:</span
						>
						<a
							class="link link-primary"
							href={player?.linkPov}
							target="_blank"
							rel="noreferrer noopener">{player?.linkPov}</a
						>
					</div>
				</div>
			{:else}
				<div
					class="flex justify-center rounded-md border border-secondary bg-info bg-secondary/25 p-2"
				>
					<div class="flex flex-col text-center">
						<span class="text-lg font-semibold"
							>No Video POV for {!player.playerId
								? player.runCharacterName
								: player.playerName}</span
						>
					</div>
				</div>
			{/if}
		{/each}
		<div class="flex flex-col gap-2 p-2">
			<div class="flex flex-col justify-center md:flex-row">
				<span class="flex place-content-center md:mr-1">Run By:</span>
				<PlayerNameBadge
					showLink
					player={submission ? mapPartyMemberToNamePref(submission?.party[0]) : undefined}
				/>
			</div>

			<div class="flex flex-col justify-center md:flex-row">
				<span class="flex place-content-center md:mr-1">Submitted By:</span>
				<PlayerNameBadge
					showLink
					player={submission ? mapPlayerInfoNamePref(submission.submitter) : undefined}
				/>
			</div>
		</div>
		<div class="flex grow flex-col gap-1 md:flex-row">
			<div
				class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2"
			>
				<div class="flex grow flex-col">
					<span class="text-center text-lg font-semibold">Runner's Notes:</span>
					<div class="whitespace-pre-wrap p-2">{submission?.notes ?? ''}</div>
				</div>
			</div>
			<div
				class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2"
			>
				<div class="flex grow flex-col">
					<span class="text-center text-lg font-semibold">Moderator's Notes:</span>
					<span class="text-center text-xs"
						>{submission?.reviewedBy ? `Reviewer: ${submission?.reviewedBy}` : ''}</span
					>
					<div class="whitespace-pre-wrap p-2">
						{#if canReview}
							<TextArea
								maxlength={500}
								placeholder="(Optional) Type any moderator notes you want to display here!"
								bind:value={modNotes}
							/>
						{:else}
							{submission?.modNotes ?? ''}
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
	<svelte:fragment slot="actions">
		<Button
			class="btn-outline btn-error"
			disabled={!canReview || processing}
			on:click={denyRun}
			on:keyup={denyRun}>Deny</Button
		>
		<Button
			class="btn-outline btn-success"
			disabled={!canReview || processing}
			on:click={approveRun}
			on:keyup={approveRun}>Approve</Button
		>
		<Button
			class="btn-outline btn-secondary"
			on:click={closeModal}
			on:keyup={closeModal}
			disabled={processing}>Close</Button
		>
	</svelte:fragment>
</Modal>
