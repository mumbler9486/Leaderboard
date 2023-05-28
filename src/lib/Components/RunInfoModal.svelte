<script lang="ts">
	import Alert from './Alert.svelte';
	import Modal from './Modal.svelte';
	import PlayerNameBadge from './PlayerNameBadge.svelte';
	import VideoPlayer from './VideoPlayer.svelte';

	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import type { PlayerInfo } from '$lib/types/api/playerInfo';

	export let videoUrl: string;
	export let players: PlayerInfo[];
	export let submitter: PlayerInfo | undefined;
	export let notes: string;

	let modal: Modal;
	let modNotes: string;

	let errorMessage = '';

	export const showModal = () => {
		modal.show();
	};

	const closeModal = () => {
		modal.close();
	};
</script>

<Modal
	modalId="run-info"
	title="Run Information"
	btn2="Close"
	on:btn2Click={closeModal}
	bind:this={modal}
	allowDefocusClose={false}
>
	{#if errorMessage != ''}
		<Alert type="error" message={errorMessage} />
	{/if}
	<VideoPlayer url={videoUrl} />
	<div
		class="flex basis-full justify-center rounded-md border border-secondary bg-secondary/25 p-2"
	>
		<div class="flex flex-col text-center">
			<span class="text-lg font-semibold"><i class="bi bi-youtube" />Video Link:</span>
			<a class="link-primary link" href={videoUrl} target="_blank" rel="noreferrer noopener"
				>{videoUrl}</a
			>
		</div>
	</div>
	<div class="flex w-full flex-col justify-around gap-2 p-2 md:flex-row md:gap-0">
		<div class="flex flex-col justify-center">
			<span class="place-content-center md:mr-1">{players.length > 1 ? 'Runners:' : 'Runner:'}</span
			>
			<div
				class="grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 md:gap-x-4"
				class:md:grid-cols-2={players.length > 4}
				class:md:grid-rows-4={players.length > 4}
			>
				{#each players as player}
					<PlayerNameBadge showLink player={mapToNamePref(player)} />
				{/each}
			</div>
		</div>

		<div class="flex flex-col justify-center">
			<span class="place-content-center md:mr-1">Submitted By:</span>
			<div class="grid grid-cols-1">
				<PlayerNameBadge showLink player={submitter ? mapToNamePref(submitter) : undefined} />
			</div>
		</div>
	</div>
	<div class="flex grow flex-col gap-1 md:flex-row">
		<div
			class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2 md:basis-full"
		>
			<div class="flex grow flex-col">
				<span class="text-center text-lg font-semibold">Runner's Notes:</span>
				<div class="whitespace-pre-wrap p-2">{notes}</div>
			</div>
		</div>
	</div>
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
