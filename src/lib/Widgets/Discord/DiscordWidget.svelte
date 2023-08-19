<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import DiscordUser from '$lib/Widgets/Discord/DiscordUser.svelte';
	import { onMount } from 'svelte';

	let discordServer: DiscordServerInfo = {
		id: '0',
		name: 'PSO2 Central',
		instant_invite: '',
		presence_count: 0,
		channels: [],
		members: []
	};

	$: presenseCount = `${discordServer?.presence_count} Member${
		discordServer?.presence_count > 1 ? 's' : ''
	}s Online`;

	interface DiscordServerInfo {
		id: string;
		name: string;
		instant_invite: string;
		presence_count: number;
		channels: DiscordChannel[];
		members: DiscordUsers[];
	}

	interface DiscordChannel {
		id: string;
		name: string;
		position: number;
	}

	interface DiscordUsers {
		id: string;
		username: string;
		discriminator: string;
		avatar: string;
		status: string;
		avatar_url: string;
		game: DiscordGame;
	}

	interface DiscordGame {
		name: string;
	}

	const getDiscord = async () => {
		const response = await fetch('https://discord.com/api/guilds/1070314956991512636/widget.json', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		discordServer = (await response.json()) as DiscordServerInfo;
	};

	onMount(getDiscord);
	afterNavigate(getDiscord);
</script>

<div class="m-2 mt-0 grow md:ml-0">
	<div
		class="flex flex-col items-center rounded-t-md border border-secondary border-b-secondary/25 bg-base-100 py-4 text-lg font-light text-base-content"
	>
		<p class="text-2xl font-normal">
			{discordServer?.name}<i class="bi bi-discord ml-2" />
		</p>
		<span class="text-base-content/50">{presenseCount}</span>
	</div>
	<div
		style="box-shadow: inset 0px -4px 8px rgba(0,0,0,0.4);"
		class="widget-discord flex h-96 max-h-96 flex-col gap-1 overflow-y-auto border border-t-0 border-b-0 border-secondary bg-base-300 p-5"
	>
		{#each discordServer?.members ?? [] as member}
			<DiscordUser
				avatar={member.avatar_url}
				name={member.username}
				status={member.status}
				game={member.game?.name}
			/>
		{/each}
	</div>
	<div
		class="flex flex-row items-center justify-between rounded-b-md border border-secondary border-t-secondary/25 bg-base-100 p-4 px-8"
	>
		<p class="text-xl font-light text-base-content/50">Join us on Discord!</p>
		<a
			href={discordServer?.instant_invite}
			target="_blank"
			rel="noreferrer noopener"
			role="button"
			class="btn-outline btn-secondary btn-sm btn rounded-md">Connect</a
		>
	</div>
</div>

<style scoped>
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
