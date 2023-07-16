<script lang="ts">
	import ColorInput from '$lib/Components/ColorInput.svelte';
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
	import Divider from '$lib/Components/Divider.svelte';
	import FormControl from '$lib/Components/FormControl.svelte';
	import TextInput from '$lib/Components/TextInput.svelte';
	import { writable } from 'svelte/store';
	import { useValidation } from '$lib/types/api/formValidation';
	import { BadRequestError, InternalServerError } from '$lib/types/api/error';

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

	const countryOptions = countries.map((c) => ({ label: c.name, value: c.code.toLowerCase() }));

	const serverRegionOptions = [
		{ label: 'Global', value: 'global' },
		{ label: 'Japan', value: 'japan' }
	];

	$: shipOptions =
		$form.serverRegion === 'global'
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
	$: selectedShip = shipOptionsInfo[$form.ship];

	const defaultSettings = {
		mainCharacterName: '',
		preferredName: '0',
		youtubeHandle: '',
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

	$: namePreview = {
		playerId: -1,
		flag: $form.playerCountry.toLowerCase(),
		ship: selectedShip?.ship,
		region: selectedShip?.region,
		playerName: $playerInfoStore?.playerName ?? '<Unknown>',
		runCharacterName: 'Run character name',
		characterName: $form.mainCharacterName,
		namePreference: parseInt($form.preferredName),
		nameType: parseInt($form.nameEffect),
		nameColor1: $form.primaryColor.substring(1),
		nameColor2: $form.secondaryColor.substring(1)
	} satisfies PlayerNameDisplay;

	export const show = () => {
		resetForm();
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

		form.set({
			mainCharacterName: player.characterName,
			preferredName: player.preferredName.toString(),
			youtubeHandle: player.youtube,
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
		});

		isLoading = false;
	};

	const saveChanges = async () => {
		if (isSubmitting) {
			return;
		}

		const userInfo = $clientPrincipleStore;
		if (!userInfo) {
			serverError = 'Not logged in, please refresh the page and try again';
			return;
		}

		let updateRequest: ProfileUpdateRequest = {
			mainCharacterName: $form.mainCharacterName,
			preferredName: parseInt($form.preferredName),
			youtubeHandle: $form.youtubeHandle,
			twitterHandle: $form.twitterHandle,
			twitchChannel: $form.twitchChannel,
			discordUsername: $form.discordUsername,
			ship: selectedShip?.ship,
			playerCountry: $form.playerCountry.toLowerCase(),
			serverRegion: $form.serverRegion,
			primaryColor: $form.primaryColor.substring(1),
			secondaryColor: $form.secondaryColor.substring(1),
			nameEffect: parseInt($form.nameEffect),
			description: $form.description
		};

		clearAllErrors();
		const validRequest = await validate(updateRequest);
		if (!validRequest) return;

		isSubmitting = true;
		serverError = undefined;

		try {
			const result = await fetchPutApi<boolean>(
				`/ngs-api/users/${userInfo?.userId}/profile`,
				validRequest
			);

			if (result === true) {
				profileUpdated();
			}
		} catch (err) {
			if (err instanceof BadRequestError) {
				setValidationErrors(err.response);
			} else if (err instanceof InternalServerError) {
				console.error(err);
				serverError = (err as Error).message;
			} else {
				console.error(err);
			}
		} finally {
			isSubmitting = false;
		}
	};

	const { form, errors, validate, resetForm, setValidationErrors, clearAllErrors } =
		useValidation<ProfileUpdateRequest>(profileUpdateRequestSchema, { ...defaultSettings });

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
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
				<FormControl label="Main Character Name" error={$errors.mainCharacterName}>
					<TextInput
						class="bg-neutral"
						placeholder="(Required)"
						maxlength={25}
						bind:value={$form.mainCharacterName}
					/>
				</FormControl>
				<FormControl label="Preferred Name" error={$errors.preferredName}>
					<Dropdown options={nameOptions} bind:value={$form.preferredName} />
				</FormControl>
			</div>
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
				<FormControl label="Server Region">
					<Dropdown
						options={serverRegionOptions}
						bind:value={$form.serverRegion}
						on:change={() => {
							$form.ship = '';
						}}
					/>
				</FormControl>
				<FormControl label="Ship" error={$errors.ship}>
					<Dropdown options={shipOptions} bind:value={$form.ship} />
				</FormControl>
				<FormControl label="Country" error={$errors.country}>
					<Dropdown options={countryOptions} bind:value={$form.playerCountry} />
				</FormControl>
			</div>
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
				<FormControl label="Primary Color" error={$errors.primaryColor}>
					<ColorInput bind:value={$form.primaryColor} />
				</FormControl>
				<FormControl label="Secondary Color" error={$errors.secondaryColor}>
					<ColorInput bind:value={$form.secondaryColor} />
				</FormControl>
				<FormControl label="Name Effect" error={$errors.nameEffect}>
					<Dropdown options={nameEffectOptions} bind:value={$form.nameEffect} />
				</FormControl>
			</div>
			<Divider />
			<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
				<FormControl label="Youtube" error={$errors.youtubeHandle}>
					<TextInput
						placeholder="(Required)"
						prompt="youtube.com/@"
						maxlength={25}
						bind:value={$form.youtubeHandle}
					/>
				</FormControl>
				<FormControl label="Twitter" error={$errors.twitterHandle}>
					<TextInput
						placeholder="(Optional)"
						prompt="twitter.com/"
						maxlength={30}
						bind:value={$form.twitterHandle}
					/>
				</FormControl>
				<FormControl label="Twitch Channel" error={$errors.twitchChannel}>
					<TextInput
						placeholder="(Optional)"
						prompt="twitch.tv/"
						maxlength={30}
						bind:value={$form.twitchChannel}
					/>
				</FormControl>
				<FormControl label="Discord Username" error={$errors.discordUsername}>
					<TextInput placeholder="(Optional)" maxlength={30} bind:value={$form.discordUsername} />
				</FormControl>
			</div>
			<FormControl label="Profile Description" error={$errors.description}>
				<textarea
					class="widget-discord textarea-bordered textarea h-24"
					placeholder="(Optional)"
					maxlength={500}
					bind:value={$form.description}
				/>
			</FormControl>
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
