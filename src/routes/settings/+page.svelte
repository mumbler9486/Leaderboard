<script lang="ts">
	import { t } from 'svelte-i18n';
	import { userStreamerMode } from '$lib/stores/preferences';
	import {
		consentSelected,
		consentPreferences,
		consentTwitch,
		consentGoogle,
		consentDiscord,
	} from '$lib/stores/consent';
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Settings</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col rounded-md border border-secondary bg-base-100 p-4 px-8 md:flex-col"
		>
			<div class="text-center text-4xl font-light">Settings</div>
			<div class="divider -mx-8" />
			<div class="text-center text-2xl font-medium">
				User Settings
				<div class="divider -mx-8" />
			</div>
			<span class="mb-4 text-center text-warning"
				>User Settings can only be saved if Preference Cookies are enabled.</span
			>
			<label class="label cursor-pointer place-self-center">
				<span class="label-text mr-2 font-semibold">Enable Streamer Mode</span>
				<input type="checkbox" class="toggle toggle-primary" bind:checked={$userStreamerMode} />
			</label>
			<span class="text-center">Streamer mode hides user avatars and user descriptions.</span><span
				class="text-center text-warning"
				>We don't allow overly NSFW content, but this can help add peace of mind if you want to show
				the leaderboard in live content!</span
			>
			<div class="divider -mx-8" />
			<div class="text-center text-2xl font-medium">
				Cookies
				<div class="divider -mx-8" />
			</div>
			<div class="flex flex-col place-items-center">
				<p class="mb-4 text-2xl font-light md:text-3xl">This website uses cookies.</p>
				<p class="mb-4">
					We use cookies (and local storage) to log you in and store your settings.
				</p>
				<a href="/privacy-policy" target="_blank" rel="noreferrer noopener" class="link link-accent"
					>Please review our Privacy Policy for more information.</a
				>

				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div
					tabindex="0"
					class="collapse collapse-plus w-full rounded-box border border-neutral-content/50 bg-neutral"
				>
					<div
						class="collapse-title border-b border-b-neutral-content/50 text-xl font-light text-neutral-content"
					>
						Necessary Information
					</div>
					<div class="collapse-content bg-base-100">
						<p class="my-4 text-xl font-semibold">Registration:</p>
						<p class="mb-4">Registering stores information securely on our servers, including:</p>
						<p class="mb-4 font-semibold">Email Address, Username, and Player Name.</p>
						<p class="mb-4 text-xl font-semibold">Logging in:</p>
						<p class="mb-4">
							Logging in stores the following information as a cookie on your system, including:
						</p>
						<p class="mb-4 font-semibold">
							Your User Account Information (Username, Player Name, etc.)
						</p>
					</div>
				</div>
				<label class="label mb-4 w-full cursor-pointer">
					<span class="label-text font-semibold">Enable Necessary Cookies</span>
					<input type="checkbox" class="toggle toggle-primary" disabled checked />
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div
					tabindex="0"
					class="collapse collapse-plus w-full rounded-box border border-neutral-content/50 bg-neutral"
				>
					<div
						class="collapse-title border-b border-b-neutral-content/50 text-xl font-light text-neutral-content"
					>
						Preference Information
					</div>
					<div class="collapse-content bg-base-100">
						<p class="my-4 text-xl font-semibold">User Settings:</p>
						<p class="mb-4">
							User settings are stored <strong>locally to your device</strong>
							and are not saved to our servers.<br />They are, however, processed by our site to
							allow non-default functionality.<br /><br /><strong
								>Examples of user settings are:</strong
							>
						</p>
						<p class="mb-4">
							Your language preferences.<br />Leaderboard timer display preferences.<br />Streamer
							mode status.<br /><strong>And other user settings.</strong>
						</p>
					</div>
				</div>
				<label class="label mb-4 w-full cursor-pointer">
					<span class="label-text font-semibold">Enable Preference Cookies</span>
					<input type="checkbox" class="toggle toggle-primary" bind:checked={$consentPreferences} />
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div
					tabindex="0"
					class="collapse collapse-plus w-full rounded-box border border-neutral-content/50 bg-neutral"
				>
					<div
						class="collapse-title border-b border-b-neutral-content/50 text-xl font-light text-neutral-content"
					>
						Third-Party Information
					</div>
					<div class="collapse-content bg-base-100">
						<p class="my-4 text-xl font-semibold">Google:</p>
						<p class="mb-4">
							Enabling third-party cookies will allow Google to place their own trackers, cookies,
							and analytics on your system.
						</p>
						<p class="mb-4">
							In exchange, this allows us to enable Youtube embeds and other features.
						</p>
						<p class="my-4 text-xl font-semibold">Twitch:</p>
						<p class="mb-4">
							Enabling third-party cookies will allow Twitch.tv to place their own trackers,
							cookies, and analytics on your system.
						</p>
						<p class="mb-4">
							In exchange, this allows us to enable Twitch.tv embeds and other features.
						</p>
						<p class="my-4 text-xl font-semibold">Discord:</p>
						<p class="mb-4">
							Enabling third-party cookies will allow Discord to place their own trackers, cookies,
							and analytics on your system.
						</p>
						<p class="mb-4">
							In exchange, this allows us to enable the Discord widget on our home page.
						</p>
					</div>
				</div>
				<label class="label w-full cursor-pointer">
					<span class="label-text font-semibold">Enable Google Cookies</span>
					<input type="checkbox" class="toggle toggle-primary" bind:checked={$consentGoogle} />
				</label>
				<label class="label w-full cursor-pointer">
					<span class="label-text font-semibold">Enable Twitch Cookies</span>
					<input type="checkbox" class="toggle toggle-primary" bind:checked={$consentTwitch} />
				</label>
				<label class="label mb-4 w-full cursor-pointer">
					<span class="label-text font-semibold">Enable Discord Cookies</span>
					<input type="checkbox" class="toggle toggle-primary" bind:checked={$consentDiscord} />
				</label>
				<button
					class="btn btn-warning btn-sm mb-4 rounded-none md:btn-md"
					on:click={() => {
						$consentSelected = true;
					}}>Update Cookie Settings</button
				>

				<p class="font-semibold">We do NOT share your personal information.</p>
			</div>
			<div class="divider" />
		</div>
	</div>
</div>
