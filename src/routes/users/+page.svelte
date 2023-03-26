<script lang="ts">
	import { t } from 'svelte-i18n';
	// @ts-nocheck

	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import UserPageTrophy from '$lib/LeaderboardComponents/UserParts/UserPageTrophy.svelte';

	import { onMount } from 'svelte';

	var d;
	var primaryNameOutput;
	var secondaryNameOutput;
	var cssOutput;
	var defaultDescription = '';

	var AlliancePosition = 'Member';

	var shipSrc;
	let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

	onMount(async () => {
		var params = window.location.search;
		const response = await fetch('/ngs-api/UserInfo' + params, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		d = await response.json();
		d = d[0];
		if (d == undefined || d.PlayerID == 106 || d.PlayerID == 107) {
			d = { Error: 1 };
		}
		//console.log(d);
		generateNames();
		checkDescription();
		shipSrc = shipGenerate();
		flagGenerate();
		defaultDescription = `Streamer Mode is enabled. To view profile descriptions, disable Streamer Mode!`;
	});

	function shipGenerate() {
		var smile = null;
		var serverref = d.Server.toLowerCase();
		if (serverref != 'global') {
			switch (serverref) {
				case 'jp':
					serverref = 'japan';
					break;
				case 'japan':
					break;
				case 'jpn':
					serverref = 'japan';
					break;
			}
		}
		if (d.Ship != null && d.Ship != '' && d.Server != null && d.Server != '') {
			var iconref = 'ship' + d.Ship + '-' + serverref;
			smile = '/icons/ships/' + iconref + '.png';
		}
		d.Server = serverref.charAt(0).toUpperCase() + serverref.slice(1).toLowerCase();
		return smile;
	}

	function checkDescription() {
		if (d.Description == null || d.Description == '') {
			d.Description =
				`We don't have a profile for ` + primaryNameOutput + `, but they're definitely cool!`;
		}
	}

	function flagGenerate() {
		// If we do have a flag, go ahead and generate.
		if (d.Flag != null && d.Flag != '') {
			d.Country = regionNames.of(d.Flag.toUpperCase());
		}
	}

	function generateNames() {
		switch (d.PreferredName) {
			// Main Character Name
			case 1:
				primaryNameOutput = d.CharacterName;
				secondaryNameOutput = d.PlayerName;
				break;
			// Run Character Name
			case 2:
				primaryNameOutput = d.CharacterName;
				secondaryNameOutput = d.PlayerName;
				break;
			// Player Name
			default:
				primaryNameOutput = d.PlayerName;
				secondaryNameOutput = d.CharacterName;
				break;
		}
		if (primaryNameOutput == null || primaryNameOutput == '') {
			primaryNameOutput = secondaryNameOutput;
		}

		if (d.PlayerID != (106 || 107)) {
			cssOutput = ``;
			switch (d.NameType) {
				case 1:
					cssOutput += `color: #` + d.NameColor1 + `;`;
					break;
				case 2:
					cssOutput +=
						`background: -webkit-linear-gradient(0deg, #` +
						d.NameColor1 +
						`, #` +
						d.NameColor2 +
						`);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
					break;
				case 3:
					cssOutput +=
						`color: #` +
						d.NameColor2 +
						`; text-shadow: 0px 0px 5px #` +
						d.NameColor1 +
						`, 0px 0px 5px #` +
						d.NameColor1 +
						`, 0px 0px 5px #` +
						d.NameColor1 +
						`;`;
					break;
				default:
					break;
			}
		} else {
			cssOutput = ``;
		}
	}
</script>

<svelte:head>
	{#if primaryNameOutput !== undefined}
		<title>{$t('shared.siteName')} | ARKs ID: {primaryNameOutput}</title>
	{:else}
		<title>{$t('shared.siteName')} | ARKs ID</title>
	{/if}
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<div class="flex grow flex-col content-center">
		<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
			<div
				class="m-2 flex grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8"
			>
				<div class="text-center text-4xl font-light">ARKS ID</div>
				<div class="divider -mx-8" />
				{#if d !== undefined && !d.Error}
					<div
						class="flex flex-col rounded-md border border-secondary bg-secondary/25 p-2 md:flex-row"
					>
						<div class="avatar mr-2 place-self-center md:place-self-auto">
							<div class="w-32 rounded">
								{#if d.Avatar && d.AvatarBan != '1' && (localStorage.getItem('user-streamermode') ?? 'false') === 'false'}
									<img src={d.Avatar} />
								{:else if d.Avatar && d.AvatarBan == '1' && (localStorage.getItem('user-streamermode') ?? 'false') === 'false'}
									<img src="/system/avatar-punishment.png" />
								{:else}
									<img src="/system/avatar-none.png" />
								{/if}
							</div>
						</div>
						<div
							class="mt-1 flex basis-full flex-col place-items-center md:mt-0 md:place-items-start"
						>
							<span
								class="flex w-[70vw] justify-center text-2xl font-bold md:w-auto md:justify-start md:text-4xl"
								><span style={cssOutput}>{primaryNameOutput}</span></span
							>
							{#if d.AllianceID || d.Twitch || d.Youtube || d.Youtube2 || d.Twitter || d.Discord}
								<div class="divider my-0 mb-auto" />
							{:else}
								<div class="divider my-0 mt-0" />
							{/if}
							<div class="flex flex-col flex-wrap place-self-stretch md:flex-row">
								<div class="flex flex-col place-items-center md:flex-row">
									{#if secondaryNameOutput !== null && secondaryNameOutput !== ''}
										{#if d.PreferredName == 1 || d.PreferredName == 2}
											<span>Player Name:</span>
										{:else}
											<span>Character Name:</span>
										{/if}
										<span class="ml-0 md:ml-1">{secondaryNameOutput}</span>
										<span class="mx-2 text-base-content/50">—</span>
									{/if}
									{#if d.Ship != null && d.Ship != ''}<img
											src={shipSrc}
											class="mr-0 inline object-none object-center md:mr-1"
											alt="Ship {d.Ship} - {d.Server}"
										/>Ship {d.Ship} -
									{:else}<img
											class="mr-0 inline object-none object-center md:mr-1"
											src="/icons/server/server-{d.Server.toLowerCase()}.png"
											alt={d.Server}
										/>{/if}{d.Server}
									{#if d.Flag != null && d.Flag != ''}
										<span class="mx-2 text-base-content/50">—</span>
										<span
											class="fi fi-{d.Flag} mr-0 md:mr-1"
											style="max-height:16px;min-width: 25px;"
										/>
										{d.Country}
									{/if}
								</div>
							</div>
							{#if d.AllianceID || d.Twitch || d.Youtube || d.Youtube2 || d.Twitter || d.Discord}
								<div class="divider my-0 mt-auto" />
							{/if}

							<div class="flex flex-col flex-wrap place-self-stretch md:flex-row">
								{#if d.AllianceID}
									{#if d.AllianceIcon}
										<img
											class="mr-0 h-8 w-8 place-self-center rounded md:mr-1 md:h-6 md:w-6"
											src={d.AllianceIcon}
										/>
									{/if}
									<span class="place-self-center font-semibold">{d.AllianceName}</span>
									<span class="mx-1 hidden place-self-center md:inline">-</span>
									<span class="place-self-center">{AlliancePosition}</span>

									<div class="divider my-0 mt-auto" />
								{/if}
								<div class="ml-0 flex flex-row flex-wrap justify-center gap-1 md:ml-auto">
									{#if d.Twitch != null && d.Twitch != ''}
										<a href="https://twitch.tv/{d.Twitch}" target="_blank" rel="noreferrer noopener"
											><span
												class="badge badge-lg rounded border-0 bg-[#803be5] font-semibold text-white md:badge-md hover:brightness-75"
												><i class="bi bi-twitch mr-1" />Twitch</span
											></a
										>
									{/if}
									{#if d.Youtube != null && d.Youtube != ''}
										<a
											href="https://youtube.com/@{d.Youtube}"
											target="_blank"
											rel="noreferrer noopener"
											><span
												class="badge badge-lg rounded border-0 bg-[#d11414] font-semibold text-white md:badge-md hover:brightness-75"
												><i class="bi bi-youtube mr-1" />Youtube</span
											></a
										>
									{/if}
									{#if d.Youtube2 != null && d.Youtube2 != ''}
										<a
											href="https://youtube.com/@{d.Youtube2}"
											target="_blank"
											rel="noreferrer noopener"
											><span
												class="badge badge-lg rounded border-0 bg-[#d11414] font-semibold text-white md:badge-md hover:brightness-75"
												><i class="bi bi-youtube mr-1" />2nd Youtube</span
											></a
										>
									{/if}
									{#if d.Twitter != null && d.Twitter != ''}
										<a
											href="https://twitter.com/{d.Twitter}"
											target="_blank"
											rel="noreferrer noopener"
											><span
												class="badge badge-lg rounded border-0 bg-[#1D9BF9] font-semibold text-white md:badge-md hover:brightness-75"
												><i class="bi bi-twitter mr-1" />Twitter</span
											></a
										>
									{/if}
									{#if d.Discord != null && d.Discord != ''}
										<div class="tooltip" data-tip={d.Discord}>
											<span
												style="cursor: pointer;"
												class="badge badge-lg rounded border-0 bg-[#5865f2] font-semibold text-white md:badge-md hover:brightness-75"
												><i class="bi bi-discord mr-1" />Discord</span
											>
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
					<div
						class="flex grow justify-center rounded-md border border-secondary bg-secondary/25 p-2"
					>
						<div class="flex grow flex-col">
							<span class="text-center text-lg font-semibold">Profile:</span>
							{#if (localStorage.getItem('user-streamermode') ?? 'false') === 'false'}
								<div class="whitespace-pre-wrap p-2 text-sm md:text-base">
									{d.Description}
								</div>
							{:else}
								<div class="whitespace-pre-wrap p-2 text-sm md:text-base">
									{defaultDescription}
								</div>
							{/if}
						</div>
					</div>
					{#if d.Trophies}
						<div class="flex justify-center rounded-md border border-secondary bg-secondary/25 p-2">
							<div class="flex grow flex-col">
								<span class="text-center text-lg font-semibold">Trophies:</span>
								<div class="flex grow flex-row flex-wrap justify-center gap-8 p-2">
									{#each d.Trophies as trophies}
										<UserPageTrophy trophyReference={trophies} />
									{/each}
								</div>
							</div>
						</div>
					{/if}
				{:else if d !== undefined && d.Error}
					<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
						User Not Found
					</div>
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
	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
