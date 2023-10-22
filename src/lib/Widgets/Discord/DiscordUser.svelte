<script lang="ts">
	import { browser } from '$app/environment';

	export let avatar: string;
	export let name: string;
	export let status: string;
	export let game: string | undefined = undefined;

	$: statusBadgeClass = getStatusClass(status);
	$: isStreamerMode = getStreamerMode();

	const getStatusClass = (status: string) => {
		switch (status) {
			case 'dnd':
				return 'badge-error';
			case 'idle':
				return 'badge-warning';
			case 'online':
				return 'badge-success';
			default:
				return 'badge-secondary';
		}
	};

	const getStreamerMode = () => {
		if (browser) {
			return (localStorage.getItem('user-streamermode') ?? 'false') === 'false';
		}
		return false;
	};
</script>

<div class="flex flex-row items-center gap-1">
	<div class="indicator">
		<span
			class="indicator-center indicator-bottom badge indicator-item badge-xs h-2 w-4 border-2 border-base-100 {statusBadgeClass}"
		/>
		<div class="avatar">
			<div class="w-4 rounded-full">
				{#if isStreamerMode}
					<img class="pointer-events-none" src={avatar} alt="discord-user-avatar" />
				{:else}
					<img
						class="pointer-events-none"
						src="system/avatar-none.png"
						alt="discord-user-no-avatar"
					/>
				{/if}
			</div>
		</div>
	</div>
	<p class="w-1/2 truncate text-sm text-base-content/60">{name}</p>
	{#if game != null}
		{#if isStreamerMode}
			<p class="ml-auto w-1/2 truncate text-right text-sm text-base-content/30">
				{game}
			</p>
		{/if}
	{/if}
</div>
