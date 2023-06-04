<script lang="ts">
	import { t } from 'svelte-i18n';
	import { locale, locales } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { consentPreferences } from './stores/consent';

	let storedUser = browser ? localStorage.getItem('loginreference-last') ?? null : null;
	let storedName = browser ? localStorage.getItem('playerreference-name') ?? null : null;
	let storedStyle = browser ? localStorage.getItem('playerreference-style') ?? null : null;
	let userInfo = null;

	onMount(async () => {
		const response = await fetch('/.auth/me');
		const payload = await response.json();
		const { clientPrincipal } = payload;
		userInfo = clientPrincipal;

		if (
			userInfo != null &&
			storedUser != userInfo.userDetails &&
			userInfo.userRoles.includes('user')
		) {
			var params = '?asdf=' + userInfo.userId;
			const response2 = await fetch('/ngs-api/CreateNavName' + params, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const MyPlayer = await response2.json();
			console.log(MyPlayer);
			localStorage.setItem('loginreference-last', userInfo.userDetails.toString());
			localStorage.setItem('playerreference-name', MyPlayer.PlayerName.toString());
			localStorage.setItem('playerreference-style', MyPlayer.PlayerStyle.toString());
			storedUser = browser ? localStorage.getItem('loginreference-last') ?? null : null;
			storedName = browser ? localStorage.getItem('playerreference-name') ?? null : null;
			storedStyle = browser ? localStorage.getItem('playerreference-style') ?? null : null;
		}
	});

	function storeLocale(localeReference) {
		if ($consentPreferences === true) {
			localStorage.setItem('language', localeReference.toString());
		}
	}

	function cleanLocale(localeReference) {
		const languageList = `{
            "en":"English (Global)",
            "en-alt":"English (Japan)",
            "ja":"日本語"
        }`;
		let cleanedLanguage = JSON.parse(languageList);
		return cleanedLanguage[localeReference];
	}
</script>

<header
	class="sticky top-0 z-50 border-b border-b-secondary"
	style="background-color:RGBA(5,15,29,0.8);"
>
	<div class="container mx-auto px-2">
		<div class="navbar">
			<div class="navbar-start">
				<a href="/">
					<img class="h-9 object-contain" src="/logos/logo.png" alt={$t('shared.siteName')} />
				</a>
			</div>

			<div class="dropdown-end dropdown ml-auto md:hidden">
				<label tabindex="0" class="btn-ghost rounded-btn btn">Menu</label>
				<ul tabindex="0" class="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow">
					<span class="m-2 flex text-center text-xs font-semibold uppercase"
						><img src="/icons/quests/trigger.png" class="mr-2" />Purple Triggers</span
					>
					<li>
						<a href="/runs/purple/solo" tabindex="0" style="border-radius: 0px"> Solo </a>
					</li>
					<li>
						<a href="/runs/purple/duo" tabindex="0" style="border-radius: 0px"> Duo </a>
					</li>
					<li>
						<a href="/runs/purple/party" tabindex="0" style="border-radius: 0px"> Party </a>
					</li>
					<span class="m-2 flex text-center text-xs font-semibold uppercase"
						><img src="/icons/quests/uq.png" class="mr-2" />Dark Falz Aegis</span
					>
					<li>
						<a href="/runs/dfa/solo" tabindex="0" style="border-radius: 0px"> Solo </a>
					</li>
					<li>
						<a href="/runs/dfa/duo" tabindex="0" style="border-radius: 0px"> Duo </a>
					</li>
					<li>
						<a href="/runs/dfa/party" tabindex="0" style="border-radius: 0px"> Multi-Party </a>
					</li>
					<span class="m-2 flex text-center text-xs font-semibold uppercase"
						><span class="mr-2">⚔️</span>Duels</span
					>
					<li>
						<a href="/runs/indomitable/nexaelio" tabindex="0" style="border-radius: 0px">
							Nex Aelio
						</a>
					</li>
					<li>
						<a href="/runs/indomitable/renusretem" tabindex="0" style="border-radius: 0px">
							Renus Retem
						</a>
					</li>
					<li>
						<a href="/runs/indomitable/amskvaris" tabindex="0" style="border-radius: 0px">
							Ams Kvaris
						</a>
					</li>
					<li>
						<a href="/runs/indomitable/nilsstia" tabindex="0" style="border-radius: 0px">
							Nils Stia
						</a>
					</li>
					{#if userInfo != null && userInfo.userRoles.includes('user')}
						<li>
							<a href="/submit" tabindex="0" style="border-radius: 0px">
								<i class="bi bi-envelope-paper mr-2" />
								<span>{$t('navigation.submitRun')}</span>
							</a>
						</li>{/if}
					{#if userInfo != null && (userInfo.userRoles.includes('moderator') || userInfo.userRoles.includes('administrator'))}
						<li>
							<a href="/moderator/submissions" tabindex="0" style="border-radius: 0px">
								<i class="bi bi-inboxes mr-0" />{$t('navigation.modadmin.submissionQueue')}
							</a>
						</li>{/if}
					{#if userInfo != null && userInfo.userRoles.includes('user')}
						<li>
							<a href="/profile" tabindex="0" style="border-radius: 0px">
								<i class="bi bi-person-vcard mr-0" />{$t('navigation.profile')}
							</a>
						</li>
					{/if}
					{#if userInfo == null}
						<li>
							<a href="/login" tabindex="0" style="border-radius: 0px">
								<i class="bi bi-box-arrow-in-right mr-2" />
								<span>{$t('navigation.login')}</span>
							</a>
						</li>
					{/if}
					{#if userInfo != null && userInfo.userRoles.includes('user')}
						<li>
							<a href="/logout" tabindex="0" style="border-radius: 0px">
								<i class="bi bi-box-arrow-right mr-0" />{$t('navigation.logout')}
							</a>
						</li>
					{/if}
				</ul>
			</div>

			<div class="navbar-end hidden md:flex">
				<div class="dropdown-end dropdown">
					<label tabindex="0" class="btn-ghost no-animation btn rounded-none"
						><span class="flex whitespace-nowrap"
							><img src="/icons/quests/trigger.png" class="mr-2" />
							{$t('navigation.purpleTriggers')}<i class="bi bi-caret-down ml-2" /></span
						></label
					>
					<ul
						tabindex="-1"
						class="dropdown-content menu whitespace-nowrap border border-secondary bg-neutral shadow"
					>
						<li>
							<a href="/runs/purple/solo" tabindex="0" style="border-radius: 0px"> Solo </a>
						</li>
						<li>
							<a href="/runs/purple/duo" tabindex="0" style="border-radius: 0px"> Duo </a>
						</li>
						<li>
							<a href="/runs/purple/party" tabindex="0" style="border-radius: 0px"> Party </a>
						</li>
					</ul>
				</div>
				<div class="dropdown-end dropdown">
					<label tabindex="0" class="btn-ghost no-animation btn rounded-none"
						><span class="flex whitespace-nowrap"
							><img src="/icons/quests/uq.png" class="mr-2" />{$t('navigation.darkFalzAegis')}<i
								class="bi bi-caret-down ml-2"
							/></span
						></label
					>
					<ul
						tabindex="-1"
						class="dropdown-content menu whitespace-nowrap border border-secondary bg-neutral shadow"
					>
						<li>
							<a href="/runs/dfa/solo" tabindex="0" style="border-radius: 0px"> Solo </a>
						</li>
						<li>
							<a href="/runs/dfa/duo" tabindex="0" style="border-radius: 0px"> Duo </a>
						</li>
						<li>
							<a href="/runs/dfa/party" tabindex="0" style="border-radius: 0px"> Multi-Party </a>
						</li>
					</ul>
				</div>
				<div class="dropdown-end dropdown">
					<label tabindex="0" class="btn-ghost no-animation btn rounded-none"
						><span class="flex whitespace-nowrap"
							><span class="mr-2">⚔️</span>{$t('navigation.duels')}<i
								class="bi bi-caret-down ml-2"
							/></span
						></label
					>
					<ul
						tabindex="-1"
						class="dropdown-content menu whitespace-nowrap border border-secondary bg-neutral shadow"
					>
						<li>
							<a href="/runs/indomitable/nexaelio" tabindex="0" style="border-radius: 0px">
								Nex Aelio
							</a>
						</li>
						<li>
							<a href="/runs/indomitable/renusretem" tabindex="0" style="border-radius: 0px">
								Renus Retem
							</a>
						</li>
						<li>
							<a href="/runs/indomitable/amskvaris" tabindex="0" style="border-radius: 0px">
								Ams Kvaris
							</a>
						</li>
						<li>
							<a href="/runs/indomitable/nilsstia" tabindex="0" style="border-radius: 0px">
								Nils Stia
							</a>
						</li>
					</ul>
				</div>
				{#if userInfo != null && !userInfo.userRoles.includes('user')}
					<a href="/settings" class="btn-ghost no-animation btn rounded-none">
						<i class="bi bi-gear mr-2" />
						<span>{$t('navigation.settings')}</span>
					</a>
				{/if}
				{#if userInfo != null && userInfo.userRoles.includes('user')}
					<a href="/submit" class="btn-ghost no-animation btn rounded-none">
						<i class="bi bi-envelope-paper mr-2" />
						<span>{$t('navigation.submitRun')}</span>
					</a>
				{/if}
				{#if userInfo != null && (userInfo.userRoles.includes('moderator') || userInfo.userRoles.includes('administrator'))}
					<div class="dropdown-end dropdown">
						<label tabindex="0" class="btn-ghost no-animation btn rounded-none"
							><span class="flex"
								><i class="bi bi-shield-shaded mr-2" />Moderation<i
									class="bi bi-caret-down ml-2"
								/></span
							></label
						>
						<ul
							tabindex="-1"
							class="dropdown-content menu whitespace-nowrap border border-secondary bg-neutral shadow"
						>
							<li>
								<a href="/moderator/submissions" tabindex="0" style="border-radius: 0px">
									<i class="bi bi-inboxes mr-0" />{$t('navigation.modadmin.submissionQueue')}
								</a>
							</li>
						</ul>
					</div>
				{/if}
				{#if userInfo == null}
					<a href="/login" class="btn-ghost no-animation btn rounded-none">
						<i class="bi bi-box-arrow-in-right mr-2" />
						<span>{$t('navigation.login')}</span>
					</a>
				{/if}
				{#if userInfo != null && userInfo.userRoles.includes('user')}
					<div class="dropdown-end dropdown">
						{#if storedName == undefined || storedName == null}
							<label tabindex="0" class="btn-ghost no-animation btn rounded-none"
								><span class="flex" style="font-weight:bold; text-transform: none;"
									>{$t('common.loading')}<i class="bi bi-caret-down ml-2" /></span
								></label
							>
						{:else}
							<label tabindex="0" class="btn-ghost no-animation btn rounded-none"
								><span class="flex font-bold" style={storedStyle}>{storedName}</span><i
									class="bi bi-caret-down ml-2"
								/></label
							>
						{/if}
						<ul
							tabindex="-1"
							class="dropdown-content menu whitespace-nowrap border border-secondary bg-neutral shadow"
						>
							<li>
								<a href="/profile" tabindex="0" style="border-radius: 0px">
									<i class="bi bi-person-vcard mr-0" />{$t('navigation.profile')}
								</a>
							</li>
							<li>
								<a href="/settings" tabindex="0" style="border-radius: 0px">
									<i class="bi bi-gear mr-0" />
									{$t('navigation.settings')}
								</a>
							</li>
							<li>
								<a href="/logout" tabindex="0" style="border-radius: 0px">
									<i class="bi bi-box-arrow-right mr-0" />{$t('navigation.logout')}
								</a>
							</li>
						</ul>
					</div>
				{/if}
			</div>
			<label for="modal-lang" class="btn-ghost no-animation btn rounded-none"
				><i class="bi bi-translate" /></label
			>
		</div>
		{#if userInfo != null && !userInfo.userRoles.includes('user')}
			<a href="/setup" class="alert alert-warning m-2 shadow-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 flex-shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/></svg
					>
					<span class="font-bold"
						>You must finish user setup to upload runs and access certain other features! Click or
						Tap here to do so!</span
					>
				</div>
			</a>
		{/if}
	</div>
</header>

<input type="checkbox" id="modal-lang" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative max-w-4xl rounded">
		<div class="flex flex-row">
			<span class="flex-1 self-center text-3xl font-light md:text-4xl">Language</span>
			<label
				for="modal-lang"
				class="btn-outline btn-secondary btn-square btn-sm btn flex-initial self-center rounded"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</label>
		</div>
		<div class="divider -mx-6" />
		<div class="flex flex-row flex-wrap justify-center gap-1">
			{#each $locales as localeref}
				{#each [cleanLocale(localeref)] as cleanedLocale}
					<label
						class="label w-64 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2"
					>
						<span class="label-text text-neutral-content">{cleanedLocale}</span>
						<input
							type="radio"
							bind:group={$locale}
							id="radio-classFilter-force"
							value={localeref}
							name="radio-shared-languagePreference"
							class="radio radio-sm rounded border-neutral-content/25 checked:bg-[#DBDBDB]"
							on:click={() => storeLocale(localeref)}
						/>
					</label>
				{/each}
			{/each}
		</div>
		<div class="divider -mx-6" />
		<div class="modal-action">
			<label for="modal-lang" class="btn-outline btn-secondary btn rounded md:btn-sm">Close</label>
		</div>
	</div>
</div>
