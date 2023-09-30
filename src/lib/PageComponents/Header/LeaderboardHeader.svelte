<script lang="ts">
	import HeaderMenu, { type MenuGroup } from './HeaderMenu.svelte';
	import LanguageSelector from './LanguageSelector.svelte';
	import { t } from 'svelte-i18n';
	import { clientPrincipleStore, playerInfoStore } from '../../stores/userLogin';
	import { UserRole } from '../../types/api/users/userRole';
	import { consentSelected } from '../../stores/consent';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: staticMenuItems = [
		{
			title: $t('navigation.purpleTriggers'),
			image: '/icons/quests/trigger.png',
			items: [
				{ label: 'Solo', link: '/runs/purple/solo' },
				{ label: 'Duo', link: '/runs/purple/duo' },
				{ label: 'Party', link: '/runs/purple/party' }
			]
		},
		{
			title: $t('navigation.bosses'),
			image: '/icons/quests/uq.png',
			items: [
				{ label: 'Dark Falz Solus', link: '/runs/dfsolus/solo' },
				{ label: 'Venogia', link: '/runs/venogia/solo' },
				{ label: 'Dark Falz Aegis', link: '/runs/dfaegis/solo' }
			]
		},
		{
			title: $t('navigation.duels'),
			image: '/icons/quests/duel.png',
			items: [
				{ label: 'Nex Aelio', link: '/runs/duels/nex-aelio' },
				{ label: 'Renus Retem', link: '/runs/duels/renus-retem' },
				{ label: 'Ams Kvaris', link: '/runs/duels/ams-kvaris' },
				{ label: 'Nils Stia', link: '/runs/duels/nils-stia' },
				{ label: 'Halvaldi', link: '/runs/duels/halvaldi' }
			]
		}
	] satisfies MenuGroup[];

	$: loginTitle = (() => {
		if (isLoadingLogin) return 'Loading...';
		return !isLoggedIn ? 'Login' : $playerInfoStore?.playerName ?? '<Unknown>';
	})();
	$: loginMenu = {
		title: loginTitle,
		link: !isLoggedIn ? '/login' : undefined,
		show: $consentSelected && !isNotCompleteAccountSetup,
		items: isLoggedIn
			? [
					{ label: 'Profile', link: '/profile', icon: 'bi-person-vcard' },
					{ label: 'Settings', link: '/settings', icon: 'bi-gear' },
					{ label: 'Logout', link: '/logout', icon: 'bi-box-arrow-right' }
			  ]
			: []
	} satisfies MenuGroup;

	$: consentMenu = {
		title: 'Login',
		link: '/',
		disabled: true,
		disabledTooltip: 'Accept cookies to use Account features',
		show: !$consentSelected
	} satisfies MenuGroup;

	$: accountSetupMenu = {
		title: $clientPrincipleStore?.userDetails ?? '<Unknown>',
		show: isNotCompleteAccountSetup,
		items: [{ label: 'Logout', link: '/logout', icon: 'bi-box-arrow-right' }]
	};

	$: submitMenu = {
		title: 'Submit a Run',
		show: isLoggedIn,
		icon: 'bi-envelope-paper',
		link: '/submit'
	} satisfies MenuGroup;

	$: moderationMenu = {
		title: 'Moderation',
		show: (isMod || isAdmin) && isLoggedIn,
		icon: 'bi-shield-shaded',
		link: '/moderator/submissions'
	} satisfies MenuGroup;

	$: dynamicMenuItems = [
		submitMenu,
		moderationMenu,
		consentMenu,
		loginMenu,
		accountSetupMenu
	] as MenuGroup[];
	$: headerMenuItems = [...staticMenuItems, ...dynamicMenuItems];

	let isLoadingLogin: boolean = false;

	$: isLoggedIn =
		$consentSelected &&
		!!$clientPrincipleStore &&
		($clientPrincipleStore.userRoles?.includes(UserRole.User) ?? false) &&
		!!$playerInfoStore;

	$: isNotCompleteAccountSetup =
		!!$clientPrincipleStore &&
		!($clientPrincipleStore?.userRoles?.includes(UserRole.User) ?? false);
	$: isAdmin = $clientPrincipleStore?.userRoles?.includes(UserRole.Administrator) ?? false;
	$: isMod = $clientPrincipleStore?.userRoles?.includes(UserRole.Moderator) ?? false;

	const loadLogin = async () => {
		isLoadingLogin = true;
		const userInfo = await clientPrincipleStore.fetchClientPrinciple();
		if (!userInfo) {
			//User not logged in
			isLoadingLogin = false;
			return;
		}

		if (isNotCompleteAccountSetup && !accountSetupIgnoredPage) {
			isLoadingLogin = false;
			goto('/account-setup');
			return;
		}

		await playerInfoStore.refreshInfo();
		isLoadingLogin = false;
	};

	$: accountSetupIgnoredPage = accountSetupIgnorePaths.some((path) =>
		$page.url.pathname.startsWith(path)
	);

	const accountSetupIgnorePaths = [
		'/login',
		'/logout',
		'/account-setup',
		'/privacy-policy',
		'/tos'
	];
	afterNavigate(() => {
		if (accountSetupIgnorePaths.some((path) => $page.url.pathname.startsWith(path))) {
			return;
		}
		if (!$clientPrincipleStore) {
			return;
		}

		const isFinishedAccountSetup =
			$clientPrincipleStore.userRoles?.includes(UserRole.User) ?? false;
		if (!isFinishedAccountSetup) {
			console.log('User account not finished setup. Redirecting to account setup page.');
			goto('/account-setup');
		}
	});

	// This will load when this script is loaded
	consentSelected.subscribe((consentSelection) => {
		if (consentSelection && !isLoadingLogin) {
			loadLogin();
		}
	});
</script>

<header class="sticky top-0 z-50" style="background-color:RGBA(5,15,29,0.8);">
	<div class="container mx-auto px-2">
		<div class="navbar">
			<div class="navbar-start">
				<a href="/">
					<img class="h-9 object-contain" src="/logos/logo.png" alt={$t('shared.siteName')} />
				</a>
			</div>

			<HeaderMenu title="Menu" groups={headerMenuItems} />
			<LanguageSelector />
		</div>
	</div>
</header>
