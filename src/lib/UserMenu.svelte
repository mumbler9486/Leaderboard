<script lang="ts">
	import { t } from 'svelte-i18n';
	import { locale, locales } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

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
</script>

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
				><i class="bi bi-shield-shaded mr-2" />Moderation<i class="bi bi-caret-down ml-2" /></span
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
