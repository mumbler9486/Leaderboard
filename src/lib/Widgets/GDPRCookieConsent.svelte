<script lang="ts">
	import {
		consentSelected,
		consentPreferences,
		consentTwitch,
		consentGoogle,
		consentDiscord
	} from '$lib/stores/consent';

	let customize: boolean = $state(false);

	const setConsent = (type: string) => {
		switch (type) {
			case 'all':
				$consentSelected = true;
				$consentPreferences = true;
				$consentTwitch = true;
				$consentGoogle = true;
				$consentDiscord = true;
				break;
			case 'necessary':
				$consentSelected = true;
				$consentPreferences = false;
				$consentTwitch = false;
				$consentGoogle = false;
				$consentDiscord = false;
				break;
			case 'selected':
				$consentSelected = true;
				break;
		}
	};

	let showConsentCurrent = $state(false);
	consentSelected.subscribe((consent) => {
		console.debug(`Consent loaded. Value=${consent}`);
		showConsentCurrent = !consent;
	});
</script>

{#if showConsentCurrent}
	<div class="fixed bottom-0 right-0 left-0 z-50 md:bottom-10 md:left-auto md:right-10">
		<div
			class="m-2 flex max-h-[32rem] max-w-[32rem] flex-col place-items-center space-y-2 overflow-y-auto rounded-md border border-neutral-content/50 bg-neutral p-4 px-4 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] md:max-h-[52vh] md:max-w-[32vw]"
		>
			<div class="flex flex-col place-items-center">
				<p class="mb-4 text-2xl font-light text-neutral-content md:text-3xl">
					This website uses cookies.
				</p>
				<p class="mb-4 text-neutral-content">
					We use cookies (and local storage) to log you in and store your settings.
				</p>
				<a href="/privacy-policy" target="_blank" rel="noreferrer noopener" class="link-accent link"
					>Please review our Privacy Policy for more information.</a
				>
				{#if customize == true}
					<p class="mb-4 font-bold text-neutral-content">
						Expand a section to read more about each setting.
					</p>
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<div
						tabindex="0"
						class="collapse-plus rounded-box collapse w-full border border-neutral-content/50 bg-neutral"
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
						<span class="label-text font-semibold text-neutral-content"
							>Enable Necessary Cookies</span
						>
						<input type="checkbox" class="toggle-primary toggle" disabled checked />
					</label>
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<div
						tabindex="0"
						class="collapse-plus rounded-box collapse w-full border border-neutral-content/50 bg-neutral"
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
						<span class="label-text font-semibold text-neutral-content"
							>Enable Preference Cookies</span
						>
						<input
							type="checkbox"
							class="toggle-primary toggle"
							bind:checked={$consentPreferences}
						/>
					</label>
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<div
						tabindex="0"
						class="collapse-plus rounded-box collapse w-full border border-neutral-content/50 bg-neutral"
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
								Enabling third-party cookies will allow Discord to place their own trackers,
								cookies, and analytics on your system.
							</p>
							<p class="mb-4">
								In exchange, this allows us to enable the Discord widget on our home page.
							</p>
						</div>
					</div>
					<label class="label w-full cursor-pointer">
						<span class="label-text font-semibold text-neutral-content">Enable Google Cookies</span>
						<input type="checkbox" class="toggle-primary toggle" bind:checked={$consentGoogle} />
					</label>
					<label class="label w-full cursor-pointer">
						<span class="label-text font-semibold text-neutral-content">Enable Twitch Cookies</span>
						<input type="checkbox" class="toggle-primary toggle" bind:checked={$consentTwitch} />
					</label>
					<label class="label mb-4 w-full cursor-pointer">
						<span class="label-text font-semibold text-neutral-content">Enable Discord Cookies</span
						>
						<input type="checkbox" class="toggle-primary toggle" bind:checked={$consentDiscord} />
					</label>
					<button
						class="btn-warning btn-sm btn mb-4 rounded-none md:btn-md"
						onclick={() => setConsent('selected')}>Allow Selected</button
					>
				{/if}
				<p class="font-semibold text-neutral-content">We do NOT share your personal information.</p>
			</div>
			<div class="divider"></div>
			<div>
				<button
					class="btn-secondary btn-sm btn rounded-none md:btn-md"
					onclick={() => setConsent('necessary')}>Deny</button
				>
				<button
					class="btn-secondary btn-sm btn rounded-none md:btn-md"
					onclick={() => setConsent('all')}>Allow All</button
				>
				<button
					class="btn-secondary btn-sm btn rounded-none md:btn-md"
					onclick={() => (customize = true)}>Customize</button
				>
			</div>
		</div>
	</div>
{/if}
