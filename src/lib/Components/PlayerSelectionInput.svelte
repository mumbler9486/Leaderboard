<script lang="ts">
	import Modal from './Modal.svelte';
	import PlayerNameBadge from './PlayerNameBadge.svelte';
	import { mapPlayerInfoNamePref } from '$lib/types/api/mapNamePref';
	import { clientPrincipleStore } from '$lib/stores/userLogin';
	import { UserRole } from '$lib/types/api/users/userRole';
	import { partyForm } from '../../routes/submit/partyFormStore';
	import type { PlayerSearchResult } from '$lib/types/api/players/playerInfoAutoFill';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { onMount } from 'svelte';

	export let playerIndex: number;
	export let playerNameSelection: string | undefined = $partyForm[playerIndex].playerName;

	let modal: Modal;
	let searchInput: HTMLInputElement;

	let error: string | undefined = undefined;
	let searchTerms: string = '';
	let playerNameChanged: boolean = true;
	let firstSearched = false;

	let searchResults: PlayerSearchResult[] = [];

	$: isModerator = $clientPrincipleStore?.userRoles.includes(UserRole.Moderator);
	$: isPlayer1 = playerIndex == 0;
	$: isAnonymousPlayer = playerNameChanged && (playerNameSelection?.length ?? -1 > 0);

	const playerSelected = (player: PlayerSearchResult) => {
		playerNameSelection = player.playerName;
		playerNameChanged = false;
		partyForm.update((p) => {
			p[playerIndex].playerName = player.playerName;
			p[playerIndex].playerId = player.playerId;
			return p;
		});

		modal.close();
	};

	const searchName = async () => {
		if (searchTerms.length < 0) {
			return;
		}

		searchResults = [];

		try {
			searchResults = await fetchGetApi('/ngs-api/users/search', {
				name: searchTerms.toLowerCase(),
				take: 20,
			});
		} catch (err) {
			console.error(err);
		} finally {
			firstSearched = true;
		}
	};

	const textChanged = () => {
		playerNameChanged = true;
		partyForm.update((p) => {
			p[playerIndex].playerName = playerNameSelection ?? '';
			p[playerIndex].playerId = -1;
			return p;
		});
	};
	const searchEntered = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			searchName();
		}
	};

	const showModal = () => {
		firstSearched = false;
		searchResults = [];
		searchTerms = '';
		modal.show();
		searchInput.focus();
	};

	onMount(() => {
		// Component loaded with an initial player name, set check to true
		if (playerNameSelection?.length ?? -1 > 0) {
			playerNameChanged = false;
		}
	});
</script>

<label class="form-control">
	<div class="label">
		<span class="label-text">Player or Character Name</span>
	</div>
	<div class="join">
		<div>
			<input
				class="input join-item input-bordered w-96"
				placeholder="Search or enter name..."
				maxlength="50"
				disabled={isPlayer1 && !isModerator}
				readonly={isPlayer1 && !isModerator}
				class:player-exists={!playerNameChanged}
				bind:value={playerNameSelection}
				on:change={textChanged}
				on:keypress={textChanged}
				on:paste={textChanged}
				on:input={textChanged}
			/>
		</div>
		<div class="indicator">
			<button class="btn join-item" on:click={showModal} disabled={isPlayer1 && !isModerator}
				>Search</button
			>
		</div>
	</div>
	<div class="label">
		{#if !!error && error.length > 0}
			<span class="label-text-alt text-error">{error}</span>
		{/if}
		{#if isModerator && isPlayer1}
			<span class="label-text-alt">Moderator mode: can submit a run not their own.</span>
		{:else if isPlayer1}
			<span class="label-text-alt">You must be a participant of your own run.</span>
		{:else if isAnonymousPlayer}
			<span class="label-text-alt text-warning"
				>Player has no account. Run can still be submitted without one.</span
			>
		{/if}
	</div>
</label>

<Modal
	bind:this={modal}
	modalId="player-selection-modal"
	title="Player Search"
	size="narrow"
	btn2="Cancel"
>
	<div class="form-control">
		<div class="join">
			<div>
				<input
					bind:this={searchInput}
					class="input join-item input-bordered w-72"
					placeholder="Enter a player name"
					on:keyup={searchEntered}
					bind:value={searchTerms}
				/>
			</div>
			<div class="indicator">
				<button class="btn join-item" on:click|preventDefault={searchName}>Search</button>
			</div>
		</div>
		{#if !!error && error.length > 0}
			<div class="label">
				<span class="label-text-alt text-error">{error}</span>
			</div>
		{/if}
	</div>
	<div class="mt-4 overflow-x-auto">
		{#if searchResults.length > 0}
			<table class="table table-zebra table-sm">
				<thead>
					<tr>
						<th>Player Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each searchResults as user}
						<tr class="hover">
							<td><PlayerNameBadge showLink player={mapPlayerInfoNamePref(user.playerInfo)} /></td>
							<td class="float-right">
								<button class="btn btn-neutral btn-sm" on:click={() => playerSelected(user)}>
									Select
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else if !firstSearched}
			<div class="hero h-36 bg-base-200">
				<div class="hero-content text-center">
					<div class="w-full">
						<p class="py-6">Enter search terms to search for a player</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="hero h-36 bg-base-200">
				<div class="hero-content text-center">
					<div class="w-full">
						<p class="py-6">No search fesults found</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</Modal>

<style scoped>
	.player-exists {
		background: url(/icons/submit/green_checkmark.png) no-repeat scroll right 1rem top 1rem;
		background-size: 16px 16px;
		background-color: var(--fallback-b1, oklch(var(--b1) / var(--tw-bg-opacity)));
	}
</style>
