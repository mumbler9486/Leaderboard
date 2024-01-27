<script lang="ts">
	import Alert from './Alert.svelte';
	import Modal from './Modal.svelte';
	import PlayerNameBadge from './PlayerNameBadge.svelte';
	import VideoPlayer from './VideoPlayer.svelte';

	import { mapPlayerInfoNamePref, mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import type { Run } from '$lib/types/api/runs/run';
	import Button from './Button.svelte';
	import YouTubeIcon from './Icons/YouTubeIcon.svelte';

	let run: Run | undefined;

	$: isSolo = run?.party.length == 0;
	$: partySize = run?.party.length ?? 0;

	let modal: Modal;

	let errorMessage = '';

	export const showModal = (viewRun: Run<any>) => {
		run = viewRun;
		modal.show();
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
	modalId="run-info"
	title="Run Information"
	size="wide"
	btn2="Close"
	on:btn2Click={closeModal}
	bind:this={modal}
	allowDefocusClose={true}
	on:closed={stopAllVideoPlayers}
>
	{#if errorMessage != ''}
		<Alert type="error" message={errorMessage} />
	{/if}
	{#if isSolo}
		<VideoPlayer url={run?.party[0].linkPov} />
	{:else}
		{#each run?.party.filter((p) => p.linkPov != undefined) ?? [] as player, i}
			<PlayerNameBadge player={mapPartyMemberToNamePref(player)} />
			<VideoPlayer bind:this={videoPlayers[i]} url={player.linkPov} />
			<div class="flex justify-center rounded-md border border-secondary bg-secondary/25 p-2">
				<div class="flex flex-col text-center">
					<span class="flex flex-row items-center gap-2 text-lg font-semibold"
						><YouTubeIcon />Video Link:</span
					>
					<a
						class="link link-primary"
						href={player.linkPov}
						target="_blank"
						rel="noreferrer noopener">{player.linkPov}</a
					>
				</div>
			</div>
		{/each}
	{/if}
	<div class="flex w-full flex-col justify-around gap-2 p-2 md:flex-row md:gap-0">
		<div class="flex flex-col justify-center">
			<span class="place-content-center md:mr-1">{partySize > 1 ? 'Runners:' : 'Runner:'}</span>
			<div
				class="grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 md:gap-x-4"
				class:md:grid-cols-2={partySize > 4}
				class:md:grid-rows-4={partySize > 4}
			>
				{#each run?.party ?? [] as player}
					<PlayerNameBadge showLink player={mapPartyMemberToNamePref(player)} />
				{/each}
			</div>
		</div>

		<div class="flex flex-col justify-center">
			<span class="place-content-center md:mr-1">Submitted By:</span>
			<div class="grid grid-cols-1">
				<PlayerNameBadge
					showLink
					player={run?.submitter ? mapPlayerInfoNamePref(run.submitter) : undefined}
				/>
			</div>
		</div>
	</div>
	<div class="flex grow flex-col gap-1 md:flex-row">
		<div
			class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2"
		>
			<div class="flex grow flex-col">
				<span class="text-center text-lg font-semibold">Runner's Notes:</span>
				<div class="whitespace-pre-wrap p-2">{run?.notes ?? ''}</div>
			</div>
		</div>
		<div
			class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2"
		>
			<div class="flex grow flex-col">
				<span class="text-center text-lg font-semibold">Moderator's Notes:</span>
				<span class="text-center text-xs"
					>{run?.reviewedBy ? `Reviewer: ${run?.reviewedBy}` : ''}</span
				>
				<div class="whitespace-pre-wrap p-2">
					{run?.modNotes ?? ''}
				</div>
			</div>
		</div>
	</div>
</Modal>
