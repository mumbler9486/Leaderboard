<script lang="ts">
	import ColorInput from '$lib/Components/ColorInput.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import Modal from '$lib/Components/Modal.svelte';
	import PlayerNameBadge, { type PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
	import { clientPrincipleStore, playerInfoStore } from '$lib/stores/userLogin';
	import { countries } from '$lib/types/api/countries';
	import {
		profileUpdateRequestSchema,
		type ProfileUpdateRequest,
	} from '$lib/types/api/validation/profileUpdate';
	import { fetchPutApi } from '$lib/utils/fetch';
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	import Alert from '$lib/Components/Alert.svelte';
	import Button from '$lib/Components/Button.svelte';
	import Divider from '$lib/Components/Divider.svelte';
	import FormControl from '$lib/Components/FormControl.svelte';
	import TextInput from '$lib/Components/TextInput.svelte';
	import { useValidation } from '$lib/types/api/formValidation';
	import { BadRequestError, InternalServerError } from '$lib/types/api/error';
	import { NameStyle } from '$lib/types/api/players/nameStyle';
	import { PreferredName } from '$lib/types/api/players/preferredName';
	import { ServerRegion } from '$lib/types/api/serverRegions';
	import TextArea from '$lib/Components/TextArea.svelte';

	const dispatcher = createEventDispatcher();

	let modal: Modal;

	let isLoading = false;
	let isSubmitting = false;
	let serverError: string | undefined = undefined;

	$: nameOptions = [
		{
			label: `Player Name (${namePreview.playerName})`,
			value: PreferredName.Player.toString(),
		},
		{
			label: `Character Name (${namePreview.characterName})`,
			value: PreferredName.Character.toString(),
		},
	] satisfies { label: string; value: string }[];

	const nameEffectOptions = [
		{ label: 'No Effect', value: NameStyle.None.toString() },
		{ label: 'Solid Color', value: NameStyle.Solid.toString() },
		{ label: 'Gradient', value: NameStyle.Gradient.toString() },
		{ label: 'Glowing', value: NameStyle.Glow.toString() },
	] satisfies { label: string; value: string }[];

	const countryOptions = countries.map((c) => ({ label: c.name, value: c.code.toLowerCase() }));

	const serverRegionOptions = [
		{ label: '(None)', value: '' },
		{ label: 'Global', value: ServerRegion.Global },
		{ label: 'Japan', value: ServerRegion.Japan },
	] satisfies { label: string; value: string }[];

	$: shipOptions =
		$form.serverRegion === ServerRegion.Global
			? [
					{ label: '(None)', value: '' },
					{ label: 'Ship 1 (global)', value: 'global_1' },
					{ label: 'Ship 2 (global)', value: 'global_2' },
					{ label: 'Ship 3 (global)', value: 'global_3' },
					{ label: 'Ship 4 (global)', value: 'global_4' },
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
					{ label: 'Ship 10 (japan)', value: 'japan_10' },
			  ];

	const shipOptionsInfo: {
		[shipOption: string]: { region: ServerRegion.Global | ServerRegion.Japan; ship: number };
	} = {
		global_1: { region: ServerRegion.Global, ship: 1 },
		global_2: { region: ServerRegion.Global, ship: 2 },
		global_3: { region: ServerRegion.Global, ship: 3 },
		global_4: { region: ServerRegion.Global, ship: 4 },
		japan_1: { region: ServerRegion.Japan, ship: 1 },
		japan_2: { region: ServerRegion.Japan, ship: 2 },
		japan_3: { region: ServerRegion.Japan, ship: 3 },
		japan_4: { region: ServerRegion.Japan, ship: 4 },
		japan_5: { region: ServerRegion.Japan, ship: 5 },
		japan_6: { region: ServerRegion.Japan, ship: 6 },
		japan_7: { region: ServerRegion.Japan, ship: 7 },
		japan_8: { region: ServerRegion.Japan, ship: 8 },
		japan_9: { region: ServerRegion.Japan, ship: 9 },
		japan_10: { region: ServerRegion.Japan, ship: 10 },
	};
	$: selectedShip = shipOptionsInfo[$form.ship ?? ''];

	const defaultSettings: ProfileUpdateRequest = {
		mainCharacterName: '',
		preferredName: 0,
		youtubeHandle: '',
		twitterHandle: '',
		twitchChannel: '',
		discordUsername: '',
		ship: undefined,
		playerCountry: '',
		serverRegion: undefined,
		primaryColor: '#ffffff',
		secondaryColor: '#ffffff',
		nameEffect: 0,
		description: '',
	};

	$: namePreview = {
		playerId: -1,
		flag: $form.playerCountry?.toLowerCase(),
		ship: selectedShip?.ship,
		serverRegion: selectedShip?.region,
		playerName: $playerInfoStore?.playerName ?? '<Unknown>',
		runCharacterName: 'Run character name',
		characterName: $form.mainCharacterName,
		namePreference: parseInt($form.preferredName ?? '0'),
		nameEffectType: parseInt($form.nameEffect ?? '0'),
		nameColor1: $form.primaryColor?.substring(1),
		nameColor2: $form.secondaryColor?.substring(1),
	} satisfies PlayerNameDisplay;

	export const show = async () => {
		resetForm();
		loadProfile();
		modal.show();
	};
	export const close = async () => modal.close();

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
			description: player.bio,
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

		let updateRequest: Record<keyof ProfileUpdateRequest, string | undefined> = {
			mainCharacterName: $form.mainCharacterName,
			preferredName: $form.preferredName,
			youtubeHandle: $form.youtubeHandle,
			twitterHandle: $form.twitterHandle,
			twitchChannel: $form.twitchChannel,
			discordUsername: $form.discordUsername,
			ship: selectedShip?.ship.toString(),
			playerCountry: $form.playerCountry,
			serverRegion: $form.serverRegion === '' ? undefined : $form.serverRegion,
			primaryColor: $form.primaryColor?.substring(1),
			secondaryColor: $form.secondaryColor?.substring(1),
			nameEffect: $form.nameEffect,
			description: $form.description,
		};

		clearAllErrors();
		const validRequest = await validate(updateRequest);
		if (!validRequest) return;

		isSubmitting = true;
		serverError = undefined;

		try {
			const result = await fetchPutApi<boolean>(`/ngs-api/users/my-profile`, validRequest);

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
		useValidation<ProfileUpdateRequest>(profileUpdateRequestSchema, defaultSettings);

	const profileUpdated = () => {
		dispatcher('profileUpdated');
		close();
	};
</script>

<!-- TODO form control needed? Refactor -->
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
						primary
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
					<Dropdown
						options={shipOptions}
						disabled={$form.serverRegion == ''}
						bind:value={$form.ship}
					/>
				</FormControl>
				<FormControl label="Country" error={$errors.playerCountry}>
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
				<TextArea maxlength={500} placeholder="(Optional)" bind:value={$form.description} />
			</FormControl>
		</div>
	{:else}
		<div class="flex flex-col place-content-center place-items-center gap-1">
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
