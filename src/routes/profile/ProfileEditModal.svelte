<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import Modal from '$lib/Components/Modal.svelte';
	import Tooltip from '$lib/Components/Tooltip.svelte';
	import PlayerNameBadge, { type PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
	import { clientPrincipleStore, playerInfoStore } from '$lib/stores/userLogin';
	import { countries } from '$lib/types/api/countries';
	import {
		profileUpdateRequestSchema,
		type ProfileUpdateRequest
	} from '$lib/types/api/validation/profileUpdate';
	import { fetchPutApi } from '$lib/utils/fetch';
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	import Alert from '$lib/Components/Alert.svelte';
	import Button from '$lib/Components/Button.svelte';

	const dispatcher = createEventDispatcher();

	let modal: Modal;

	let isLoading = false;
	let isSubmitting = false;
	let serverError: string | undefined = undefined;

	$: nameOptions = [
		{
			label: `Player Name (${namePreview.playerName})`,
			value: '0'
		},
		{
			label: `Character Name (${namePreview.characterName})`,
			value: '1'
		}
	];

	const nameEffectOptions = [
		{ label: 'No Effect', value: '0' },
		{ label: 'Solid Color', value: '1' },
		{ label: 'Gradient', value: '2' },
		{ label: 'Glowing', value: '3' }
	];

	const countryOptions = [{ label: '(None)', value: '' }].concat(
		countries.map((c) => ({ label: c.name, value: c.code.toLowerCase() }))
	);

	const serverRegionOptions = [
		{ label: 'Global', value: 'global' },
		{ label: 'Japan', value: 'japan' }
	];

	$: shipOptions =
		profileSettings.serverRegion === 'global'
			? [
					{ label: '(None)', value: '' },
					{ label: 'Ship 1 (global)', value: 'global_1' },
					{ label: 'Ship 2 (global)', value: 'global_2' },
					{ label: 'Ship 3 (global)', value: 'global_3' },
					{ label: 'Ship 4 (global)', value: 'global_4' }
			  ]
			: [
					{ label: '(None)', value: '' },
					{ label: 'Ship 1 (japan)', value: 'japan_1' },
					{ label: 'Ship 2 (japan)', value: 'japan_2' },
					{ label: 'Ship 3 (japan)', value: 'japan_3' },
					{ label: 'Ship 4 (japan)', value: 'japan_4' },
					{ label: 'Ship 5 (japan)', value: 'japan_5' },
					{ label: 'Ship 6 (japan)', value: 'japan_6' },
					{ label: 'Ship 7 (japan)', value: 'japan_7' },
					{ label: 'Ship 8 (japan)', value: 'japan_8' },
					{ label: 'Ship 9 (japan)', value: 'japan_9' },
					{ label: 'Ship 10 (japan)', value: 'japan_10' }
			  ];

	const shipOptionsInfo: { [shipOption: string]: { region: 'global' | 'japan'; ship: number } } = {
		global_1: { region: 'global', ship: 1 },
		global_2: { region: 'global', ship: 2 },
		global_3: { region: 'global', ship: 3 },
		global_4: { region: 'global', ship: 4 },
		japan_1: { region: 'japan', ship: 1 },
		japan_2: { region: 'japan', ship: 2 },
		japan_3: { region: 'japan', ship: 3 },
		japan_4: { region: 'japan', ship: 4 },
		japan_5: { region: 'japan', ship: 5 },
		japan_6: { region: 'japan', ship: 6 },
		japan_7: { region: 'japan', ship: 7 },
		japan_8: { region: 'japan', ship: 8 },
		japan_9: { region: 'japan', ship: 9 },
		japan_10: { region: 'japan', ship: 10 }
	};
	$: selectedShip = shipOptionsInfo[profileSettings.ship];

	const defaultSettings = {
		mainCharacterName: '',
		preferredName: '0',
		youtubeHandle1: '',
		youtubeHandle2: '',
		twitterHandle: '',
		twitchChannel: '',
		discordUsername: '',
		ship: '',
		playerCountry: '',
		serverRegion: 'global',
		primaryColor: '#ffffff',
		secondaryColor: '#ffffff',
		nameEffect: '0',
		description: ''
	};
	let profileSettings = { ...defaultSettings };

	$: namePreview = {
		playerId: -1,
		flag: profileSettings.playerCountry.toLowerCase(),
		ship: selectedShip?.ship,
		region: selectedShip?.region,
		playerName: $playerInfoStore?.playerName ?? '<Unknown>',
		runCharacterName: 'Run character name',
		characterName: profileSettings.mainCharacterName,
		namePreference: parseInt(profileSettings.preferredName),
		nameType: parseInt(profileSettings.nameEffect),
		nameColor1: profileSettings.primaryColor.substring(1),
		nameColor2: profileSettings.secondaryColor.substring(1)
	} satisfies PlayerNameDisplay;

	export const show = () => {
		profileSettings = { ...defaultSettings };
		loadProfile();
		modal.show();
	};
	export const close = () => modal.close();

	const loadProfile = async () => {
		isLoading = true;
		const player = await playerInfoStore.refreshInfo();

		const serverRegion = player.server;
		const ship = player.ship;
		const regionShip = ship && serverRegion ? `${serverRegion}_${ship}` : '';

		profileSettings = {
			mainCharacterName: player.characterName,
			preferredName: player.preferredName.toString(),
			youtubeHandle1: player.youtube,
			youtubeHandle2: '',
			twitterHandle: player.twitter,
			twitchChannel: player.twitch,
			discordUsername: player.discord,
			ship: regionShip,
			playerCountry: player.flag?.toLowerCase() ?? '',
			serverRegion: player.server ?? '',
			primaryColor: `#${player.nameColor1}`,
			secondaryColor: `#${player.nameColor2}`,
			nameEffect: player.nameType.toString(),
			description: player.description
		};

		isLoading = false;
	};

	const saveChanges = async () => {
		if (isSubmitting) {
			return;
		}

		let userInfo = $clientPrincipleStore;
		if (!userInfo) {
			serverError = 'Not logged in, please refresh the page and try again';
			return;
		}

		isSubmitting = true;
		serverError = undefined;

		let updateRequest: ProfileUpdateRequest = {
			mainCharacterName: profileSettings.mainCharacterName,
			preferredName: parseInt(profileSettings.preferredName),
			youtubeHandle1: profileSettings.youtubeHandle1,
			youtubeHandle2: profileSettings.youtubeHandle2,
			twitterHandle: profileSettings.twitterHandle,
			twitchChannel: profileSettings.twitchChannel,
			discordUsername: profileSettings.discordUsername,
			ship: selectedShip?.ship,
			playerCountry: profileSettings.playerCountry.toLowerCase(),
			serverRegion: profileSettings.serverRegion,
			primaryColor: profileSettings.primaryColor.substring(1),
			secondaryColor: profileSettings.secondaryColor.substring(1),
			nameEffect: parseInt(profileSettings.nameEffect),
			description: profileSettings.description
		};
		try {
			updateRequest = await profileUpdateRequestSchema.validate(updateRequest);
		} catch (err) {
			serverError = (err as Error).message;
			console.log(serverError);
			return;
		} finally {
			isSubmitting = false;
		}

		try {
			const result = await fetchPutApi<boolean>(
				`/ngs-api/users/${userInfo?.userId}/profile`,
				updateRequest
			);

			if (result === true) {
				profileUpdated();
			} else {
				console.log(result);
				serverError = (result as any)?.details[0];
			}
		} catch (err) {
			console.error(err);
			serverError = (err as Error).message;
		} finally {
			isSubmitting = false;
		}
	};

	const profileUpdated = () => {
		dispatcher('profileUpdated');
		close();
	};
</script>

<Modal
	modalId="profile-edit-modal"
	allowDefocusClose={false}
	title="Edit ARKs ID"
	bind:this={modal}
>
	{#if !isLoading}
		<div>
			<div>
				<span
					class="flex w-[70vw] justify-center text-2xl font-bold md:w-auto md:justify-start md:text-4xl"
				>
					<PlayerNameBadge player={namePreview} showLink={false} />
				</span>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Main Character Name</span>
				</div>
				<input
					class="input-bordered input bg-neutral"
					type="text"
					placeholder="(Required)"
					required
					maxlength="25"
					bind:value={profileSettings.mainCharacterName}
				/>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Preferred Name</span>
				</div>
				<Dropdown options={nameOptions} bind:value={profileSettings.preferredName} />
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Server Region</span>
				</div>
				<Dropdown
					options={serverRegionOptions}
					bind:value={profileSettings.serverRegion}
					on:change={() => {
						profileSettings.ship = '';
					}}
				/>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Ship</span>
				</div>
				<Dropdown options={shipOptions} bind:value={profileSettings.ship} />
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Country</span>
				</div>
				<Dropdown options={countryOptions} bind:value={profileSettings.playerCountry} />
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Primary Color</span>
				</div>
				<input
					type="color"
					class="input-bordered input w-full"
					bind:value={profileSettings.primaryColor}
				/>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Secondary Color</span>
				</div>
				<input
					type="color"
					class="input-bordered input w-full"
					bind:value={profileSettings.secondaryColor}
				/>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Name Effect</span>
				</div>
				<Dropdown options={nameEffectOptions} bind:value={profileSettings.nameEffect} />
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Youtube Handle (Primary)</span>
				</div>
				<label class="input-group">
					<span>youtube.com/@</span>
					<input
						placeholder="(Optional)"
						class="input-bordered input w-full"
						maxlength="30"
						bind:value={profileSettings.youtubeHandle1}
					/>
				</label>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Youtube Handle (Secondary)</span>
				</div>
				<label class="input-group">
					<span>youtube.com/@</span>
					<input
						placeholder="(Optional)"
						class="input-bordered input w-full"
						maxlength="30"
						bind:value={profileSettings.youtubeHandle2}
					/>
				</label>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Twitter</span>
				</div>
				<label class="input-group">
					<span>twitter.com/</span>
					<input
						placeholder="(Optional)"
						class="input-bordered input w-full"
						maxlength="30"
						bind:value={profileSettings.twitterHandle}
					/>
				</label>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Twitch Channel</span>
				</div>
				<label class="input-group">
					<span>twitch.tv/</span>
					<input
						placeholder="(Optional)"
						class="input-bordered input w-full"
						maxlength="30"
						bind:value={profileSettings.twitchChannel}
					/>
				</label>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Discord name</span>
				</div>
				<input
					placeholder="(Optional)"
					class="input-bordered input w-full"
					maxlength="30"
					bind:value={profileSettings.discordUsername}
				/>
			</div>
			<div class="form-control">
				<div class="label">
					<span class="label-text text-base font-semibold">Profile Description</span>
				</div>
				<textarea
					class="widget-discord textarea-bordered textarea h-24"
					placeholder="(Optional)"
					maxlength="500"
					bind:value={profileSettings.description}
				/>
			</div>
		</div>
	{:else}
		<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
			Loading - Please Wait...<br /><progress
				class="progress progress-primary w-56 border border-neutral-content/20"
			/>
		</div>
	{/if}

	<svelte:fragment slot="actions">
		{#if serverError}
			<Alert type="error" message={serverError} />
		{/if}
		<Button class="btn-outline btn-secondary" on:click={close} on:keyup={close}>Close</Button>
		<Button
			class="btn-outline btn-success"
			on:click={saveChanges}
			on:keyup={saveChanges}
			disabled={isLoading || isSubmitting}>Save</Button
		>
	</svelte:fragment>
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
