<script lang="ts">
	import { t } from 'svelte-i18n';
	import UserPageTrophy from '$lib/LeaderboardComponents/UserParts/UserPageTrophy.svelte';
	import ProfileEditModal from './ProfileEditModal.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import Button from '$lib/Components/Button.svelte';
	import { mapToNamePref } from '$lib/types/api/mapNamePref';
	import { playerInfoStore } from '$lib/stores/userLogin';
	import { onMount } from 'svelte';
	import Badge from '$lib/Components/Badge.svelte';
	import { isNullOrEmpty } from '$lib/utils/string';

	let isLoading = false;
	let modalEdit: ProfileEditModal;

	const reloadProfile = async () => {
		isLoading = true;
		try {
			await playerInfoStore.refreshInfo();
		} catch (err) {
			console.error(err);
		} finally {
			isLoading = false;
		}
	};

	onMount(reloadProfile);
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Your ARKs ID</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8"
		>
			<div class="text-center text-4xl font-light">Your ARKs ID</div>
			<div class="divider -mx-8" />
			{#if !isLoading}
				<div class="flex rounded-md border border-secondary bg-secondary/25 p-2 md:flex-row">
					<div class="avatar mr-0 place-self-center md:mr-2 md:place-self-auto">
						<div class="w-32 rounded">
							{#if false}
								<img src="/system/avatar-punishment.png" alt="avatar-user-banned" />
							{:else}
								<img src="/system/avatar-none.png" alt="avatar-none-user" />
							{/if}
						</div>
					</div>
					<div
						class="mt-1 flex basis-full flex-col place-items-center md:mt-0 md:place-items-start"
					>
						<div class="w-full md:flex md:justify-between">
							<span class="flexs text-2xl md:justify-start md:text-4xl">
								<PlayerNameBadge player={mapToNamePref($playerInfoStore)} />
							</span>
							<Button
								class="mt-2 mr-2 justify-self-end bg-[#54a851] text-white hover:bg-[#54a851] hover:brightness-75"
								on:click={modalEdit.show}
							>
								<i class="bi bi-gear mr-2" />Edit Profile
							</Button>
						</div>
						<div class="flex flex-col items-start place-self-stretch">
							{#if $playerInfoStore?.preferredName == 1 || $playerInfoStore?.preferredName == 2}
								<span>Player Name: {$playerInfoStore?.playerName}</span>
							{:else}
								<span>Character Name: {$playerInfoStore?.characterName}</span>
							{/if}
							<div>
								{#if $playerInfoStore?.ship}
									Ship {$playerInfoStore?.ship} - {$playerInfoStore?.server}
								{:else}
									{$playerInfoStore?.server}
								{/if}
							</div>
							<div>
								{#if $playerInfoStore?.flag}
									Country: {$playerInfoStore?.flag.toUpperCase()}
								{/if}
							</div>
						</div>
						<div class="mt-4 flex w-full justify-between">
							<div class="flex flex-row flex-wrap gap-1">
								{#if !isNullOrEmpty($playerInfoStore?.twitch)}
									<Badge
										label="Twitch"
										color="803be5"
										icon="twitch"
										link="https://twitch.tv/{$playerInfoStore?.twitch}"
									/>
								{/if}
								{#if !isNullOrEmpty($playerInfoStore?.youtube)}
									<Badge
										label="Youtube"
										color="d11414"
										icon="youtube"
										link="https://youtube.com/@{$playerInfoStore?.youtube}"
									/>
								{/if}
								{#if false}
									<Badge
										label="Youtube Alt"
										color="d11414"
										icon="youtube"
										link="https://youtube.com/@{$playerInfoStore?.youtube}"
									/>
								{/if}
								{#if !isNullOrEmpty($playerInfoStore?.twitter)}
									<Badge
										label="Twitter"
										color="1d9bf9"
										icon="twitter"
										link="https://youtube.com/@{$playerInfoStore?.twitter}"
									/>
								{/if}
								{#if !isNullOrEmpty($playerInfoStore?.discord)}
									<Badge
										label="Discord"
										color="5865f2"
										icon="discord"
										tooltip={$playerInfoStore?.discord}
									/>
								{/if}
							</div>
							<Badge label="Share" icon="share" link="/users?id={$playerInfoStore?.playerId}" />
						</div>
					</div>
				</div>
				<div
					class="flex grow justify-center rounded-md border border-secondary bg-secondary/25 p-2"
				>
					<div class="flex grow flex-col">
						<span class="text-center text-lg font-semibold">Profile:</span>
						<div class="whitespace-pre-wrap rounded bg-base-100 p-2 text-sm md:text-base">
							{$playerInfoStore?.description ?? ''}
						</div>
					</div>
				</div>
				<!-- {#if $playerInfoStore?.trophies}
				<div class="flex justify-center rounded-md border border-secondary bg-secondary/25 p-2">
					<div class="flex grow flex-col">
						<span class="text-center text-lg font-semibold">Trophies:</span>
						<div class="flex grow flex-row flex-wrap justify-center gap-8 p-2">
							{#each $playerInfoStore.trophies as trophies}
								<UserPageTrophy trophyReference={trophies} />
							{/each}
						</div>
					</div>
				</div>
			{/if} -->
			{:else}
				<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
					Loading - Please Wait...<br /><progress
						class="progress progress-primary w-56 border border-neutral-content/20"
					/>
				</div>
			{/if}
		</div>
	</div>
</div>

<ProfileEditModal bind:this={modalEdit} on:profileUpdated={reloadProfile} />
