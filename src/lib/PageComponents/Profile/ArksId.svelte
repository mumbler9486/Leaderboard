<script lang="ts">
	import TrophyList from '$lib/PageComponents/Profile/TrophyList.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import Badge from '$lib/Components/Badge.svelte';
	import Divider from '$lib/Components/Divider.svelte';
	import type { PlayerProfile } from '$lib/types/api/players/player';
	import { isNullOrEmpty } from '$lib/utils/string';
	import { countriesMap } from '$lib/types/api/countries';
	import { mapPlayerToNamePref } from '$lib/types/api/mapNamePref';
	import { PreferredName } from '$lib/types/api/players/preferredName';

	export let player: PlayerProfile | undefined;
	export let isLoading: boolean;

	const serverRegionMap: Record<string, string> = {
		global: 'Global',
		japan: 'Japan',
	};

	$: playerCountry = player?.flag
		? countriesMap[player.flag.toUpperCase()].name ?? '<Unknown>'
		: undefined;

	$: serverRegion = player?.server ? serverRegionMap[player.server] : '';
</script>

<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
	<div class="m-2 flex grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8">
		<div class="text-center text-4xl font-light">Your ARKs ID</div>
		<Divider class="-mx-8" />
		{#if player && !isLoading}
			<div class="flex rounded-md border border-secondary bg-secondary/25 p-2 md:flex-row">
				<div class="avatar mr-0 place-self-center md:mr-2 md:place-self-auto">
					<div class="w-32 rounded">
						{#if false}
							<img
								class="pointer-events-none"
								src="/system/avatar-punishment.png"
								alt="avatar-user-banned"
							/>
						{:else}
							<img
								class="pointer-events-none"
								src="/system/avatar-none.png"
								alt="avatar-none-user"
							/>
						{/if}
					</div>
				</div>
				<div class="mt-1 flex basis-full flex-col place-items-center md:mt-0 md:place-items-start">
					<div class="w-full md:flex md:justify-between">
						<span class="flexs text-2xl md:justify-start md:text-4xl">
							<PlayerNameBadge player={mapPlayerToNamePref(player)} />
						</span>
						<slot name="actions" />
					</div>
					<div class="flex flex-col items-start place-self-stretch">
						{#if player.preferredName !== PreferredName.Player}
							<span>Player Name: {player.playerName}</span>
						{:else}
							<span>Character Name: {player.characterName}</span>
						{/if}
						<div>
							{#if player.ship}
								Ship {player.ship} - {serverRegion}
							{:else}
								{serverRegion}
							{/if}
						</div>
						<div>
							{#if player.flag}
								Country: {playerCountry}
							{/if}
						</div>
					</div>
					<div class="mt-4 flex w-full justify-between">
						<div class="flex flex-row flex-wrap gap-1">
							{#if !isNullOrEmpty(player.twitch)}
								<Badge
									label="Twitch"
									color="bg-[#803be5]"
									icon="twitch"
									link="https://twitch.tv/{player.twitch}"
								/>
							{/if}
							{#if !isNullOrEmpty(player.youtube)}
								<Badge
									label="Youtube"
									color="bg-[#d11414]"
									icon="youtube"
									link="https://youtube.com/@{player.youtube}"
								/>
							{/if}
							{#if !isNullOrEmpty(player.twitter)}
								<Badge
									label="Twitter"
									color="bg-[#1d9bf9]"
									icon="twitter"
									link="https://twitter.com/{player.twitter}"
								/>
							{/if}
							{#if !isNullOrEmpty(player.discord)}
								<Badge
									label="Discord"
									color="bg-[#5865f2]"
									icon="discord"
									tooltip={player.discord}
								/>
							{/if}
						</div>
						<Badge label="Share" icon="share" link="/users/{player.playerId}" />
					</div>
				</div>
			</div>
			<div class="flex justify-center rounded-md border border-secondary bg-secondary/25 p-2">
				<div class="flex grow flex-col">
					<span class="text-center text-lg font-semibold">Profile:</span>
					<div
						class="break-anywhere w-full whitespace-pre-wrap rounded bg-base-100 p-2 text-sm md:text-base"
					>
						{isNullOrEmpty(player.bio)
							? `We don't have a profile for ${player.playerName} but they're definitely cool!`
							: player.bio}
					</div>
				</div>
			</div>
			{#if player.trophies.length > 0}
				<div class="flex justify-center rounded-md border border-secondary bg-secondary/25 p-2">
					<div class="flex grow flex-col">
						<span class="text-center text-lg font-semibold">Trophies:</span>
						<TrophyList trophies={player.trophies} />
					</div>
				</div>
			{/if}
		{:else}
			<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
				Loading - Please Wait...<br /><progress
					class="progress progress-primary w-56 border border-neutral-content/20"
				/>
			</div>
		{/if}
	</div>
</div>

<style scoped>
	.break-anywhere {
		overflow-wrap: anywhere;
	}
</style>
