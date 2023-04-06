<script lang="ts">
	import { t } from 'svelte-i18n';
	// @ts-nocheck

	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import CategoryOptions from './CategoryOptions.svelte';
	import PartySizeOptions from './PartySizeOptions.svelte';

	import DfaOptions from './DfaOptions.svelte';
	import PurpleOptions from './PurpleOptions.svelte';
	import DuelsIndomitableOptions from './DuelsIndomitableOptions.svelte';

	import { onMount } from 'svelte';
	import PurplepartyModalRuninfo from '$lib/LeaderboardComponents/Modals/PurpleParty/purpleparty_modal_runinfo.svelte';
	import { json } from '@sveltejs/kit';
	import { runForm } from './runStore';
	import Divider from '$lib/Components/Divider.svelte';
	import PlayerInformationInput from './PlayerInformationInput.svelte';

	let selectedCategory: string = 'purples';

	let partySizes = {
		purple: [
			{ text: 'Solo (1 Player)', value: '1' },
			{ text: 'Duo (2 Players)', value: '2' },
			{ text: 'Party (4 Players)', value: '4' }
		],
		aegis: [
			{ text: 'Solo (1 Player)', value: '1' },
			{ text: 'Duo (2 Players)', value: '2' },
			{ text: 'Full MPA (8 Players)', value: '8' }
		],
		duelIndomitable: [{ text: 'Solo (1 Player)', value: '1' }]
	};

	let regionRanks = {
		aelio: [1, 2, 3],
		retem: [1, 2, 3],
		kvaris: [1, 2],
		stia: [1]
	};

	let regex = `^(?:https?:)?(?:[/][/])?(?:youtu[.]be[/]|(?:www[.]|m[.])?youtube[.]com[/](?:watch|v|embed)(?:[.]php)?(?:[?].*v=|[/]))([a-zA-Z0-9[\\\]_-]{7,15})(?:[\?&][a-zA-Z0-9[\\\]_-]+=[a-zA-Z0-9[\\\]_-]+)*$`;

	let selectedPartySize = '';

	let submitting = false;
	let submitted = false;
	let errored = false;
	let approvalwait = false;

	onMount(async () => {
		const response = await fetch('/ngs-api/GetNamesIDs', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	});

	async function submitRun() {
		var input = {};
	}
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Submit a Run</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<div class="flex grow flex-col content-center">
		<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
			<div
				class="m-2 flex grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8"
			>
				<div class="text-center text-4xl font-light">Submit a Run</div>
				<div class="divider -mx-8" />
				{#if submitting && !submitted && !errored && !approvalwait}
					<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
						Submitting - Please Wait...<br /><progress
							class="progress progress-primary w-56 border border-neutral-content/20"
						/>
					</div>
				{:else if submitted}
					<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
						Your run has been submitted and will be reviewed as soon as possible!<br /><a
							class="link-primary link"
							href="/">Click here to return to the home page!</a
						>
					</div>
				{:else if errored}
					<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
						A issue occured, please refresh and try again.
					</div>
				{:else if approvalwait}
					<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
						Your run is still awaiting approval. If it's been a while, poke us on the discord!
					</div>
				{:else}
					<form id="submitForm" on:submit={submitRun}>
						<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
							<div class="text-center text-xl font-semibold">Run</div>
							<Divider />
							<div class="text-center text-lg font-semibold">Information</div>
							<div class="form-control">
								<CategoryOptions />
							</div>
							<div class="form-control">
								{#if $runForm.category == 'purples'}
									<PurpleOptions />
								{:else if $runForm.category == 'dfa'}
									<DfaOptions />
								{:else if $runForm.category == 'duels-indomitables'}
									<DuelsIndomitableOptions />
								{/if}
							</div>
						</div>
						{#each $runForm.players as player, i}
							<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
								<div class="text-center text-xl font-semibold">Player {i + 1}</div>
								<Divider />
								<div class="text-center text-lg font-semibold">Information</div>
								<PlayerInformationInput playerNumber={i + 1} />
							</div>
						{/each}
						<div class="m-2 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8">
							<div class="form-control">
								<label class="label" for="notes-form">
									<span class="label-text">Notes</span>
								</label>
								<textarea
									class="widget-discord textarea-bordered textarea h-24"
									placeholder="(Optional) Type any notes, extra run information, or descriptions here!"
									id="notes-form"
								/>
							</div>
						</div>

						<div class="grid grid-cols-1 text-center">
							<button
								class="btn-outline btn-success btn mt-4 w-1/2 justify-self-center"
								id="subbutton"
								type="submit">Submit Run</button
							>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
	<LeaderboardFooter />
</div>

<BackgroundRandomizer />

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
