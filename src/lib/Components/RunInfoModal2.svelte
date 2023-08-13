<script lang="ts">
	import Alert from './Alert.svelte';
	import Modal from './Modal.svelte';
	import PlayerNameBadge from './PlayerNameBadge.svelte';
	import VideoPlayer from './VideoPlayer.svelte';

	import { mapPlayerInfoNamePref, mapToNamePref, mapToNamePref2 } from '$lib/types/api/mapNamePref';
	import type { Run } from '$lib/types/api/runs/run';
	import { Game } from '$lib/types/api/game';
	import { ServerRegion } from '$lib/types/api/serverRegions';
	import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';

	const defaultRun: Run = {
		rank: -1,
		runId: -1,
		game: Game.Unknown,
		serverRegion: ServerRegion.Unknown,
		quest: '',
		category: '',
		patch: '',
		party: [
			{
				playerId: -1,
				playerName: '',
				runCharacterName: '',
				mainClass: NgsPlayerClass.Unknown,
				subClass: NgsPlayerClass.Unknown,
				linkPov: '',
				weapons: [],
				playerInfo: {
					playerId: -1,
					ship: -1,
					server: ServerRegion.Unknown,
					flag: '',
					name: '',
					characterName: '',
					preferredNameType: -1,
					nameEffectType: -1,
					nameColor1: '',
					nameColor2: ''
				}
			}
		],
		time: { hours: 0, minutes: 0, seconds: 0 },
		notes: '',
		modNotes: '',
		questRank: -1,
		submitter: {
			playerId: -1,
			ship: -1,
			server: ServerRegion.Unknown,
			flag: '',
			name: '',
			characterName: '',
			preferredNameType: -1,
			nameEffectType: -1,
			nameColor1: '',
			nameColor2: ''
		},
		submissionDate: '',
		submissionStatus: -1,
		dateApproved: ''
	};
	let run: Run = defaultRun;

	$: isSolo = run.party.length == 0;
	$: player1 = run.party[0];
	$: partySize = run.party.length;

	let modal: Modal;

	let errorMessage = '';

	export const showModal = (viewRun: Run) => {
		run = viewRun;
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
	{#if isSolo}
		<VideoPlayer url={player1.linkPov} />
	{:else}
		{#each run.party.filter((p) => p.linkPov != undefined) as player}
			<PlayerNameBadge player={mapToNamePref2(player)} />
			<div
				class="flex basis-full justify-center rounded-md border border-secondary bg-secondary/25 p-2"
			>
				<div class="flex flex-col text-center">
					<span class="text-lg font-semibold"><i class="bi bi-youtube" />Video Link:</span>
					<a
						class="link-primary link"
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
				{#each run.party as player}
					<PlayerNameBadge showLink player={mapToNamePref2(player)} />
				{/each}
			</div>
		</div>

		<div class="flex flex-col justify-center">
			<span class="place-content-center md:mr-1">Submitted By:</span>
			<div class="grid grid-cols-1">
				<PlayerNameBadge
					showLink
					player={run.submitter ? mapPlayerInfoNamePref(run.submitter) : undefined}
				/>
			</div>
		</div>
	</div>
	<div class="flex grow flex-col gap-1 md:flex-row">
		<div
			class="flex basis-1/2 justify-center rounded-md border border-secondary bg-secondary/25 p-2 md:basis-full"
		>
			<div class="flex grow flex-col">
				<span class="text-center text-lg font-semibold">Runner's Notes:</span>
				<div class="whitespace-pre-wrap p-2">{run.notes}</div>
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
