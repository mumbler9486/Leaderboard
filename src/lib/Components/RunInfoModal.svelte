<script lang="ts">
	import Alert from './Alert.svelte';

	import Modal from './Modal.svelte';
	import PlayerNameBadge from './PlayerNameBadge.svelte';
	import VideoPlayer from './VideoPlayer.svelte';

	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import type { IndomitableRun } from '$lib/types/api/duels/indomitable';

	export let run: IndomitableRun | undefined;

	$: player1 = run?.players[0];

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
	<VideoPlayer url="" />
	<div
		class="flex basis-full justify-center rounded-md border border-secondary bg-secondary/25 p-2"
	>
		<div class="flex flex-col text-center">
			<span class="text-lg font-semibold"><i class="bi bi-youtube" />Video Link:</span>
			<a class="link-primary link" href={player1?.linkPov} target="_blank" rel="noreferrer noopener"
				>{player1?.linkPov}</a
			>
		</div>
	</div>
	<div class="flex flex-col gap-2 p-2 md:flex-row md:gap-0">
		<div class="flex basis-full flex-col justify-center md:flex-row">
			<span class="flex place-content-center md:mr-1">Run By:</span>
			<PlayerNameBadge showLink player={run ? mapToNamePref(run?.players[0]) : {}} />
		</div>

		<div class="flex basis-full flex-col justify-center md:flex-row">
			<span class="flex place-content-center md:mr-1">Submitted By:</span>
			<PlayerNameBadge showLink player={run ? mapToNamePref(run?.submitter) : {}} />
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
				<div class="whitespace-pre-wrap p-2">{run?.notes ?? ''}</div>
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
