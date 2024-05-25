<script lang="ts">
	import { t } from 'svelte-i18n';
	import { clientPrincipleStore, playerInfoStore } from '../../stores/userLogin';
	import { UserRole } from '../../types/api/users/userRole';
	import { consentSelected } from '../../stores/consent';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Navbar, { type MenuGroup } from '$lib/PageComponents/Header/Navbar.svelte';

	$: staticMenuItems = [
		{
			title: 'Info',
			icon: 'info-circle',
			link: '/info',
		} satisfies MenuGroup,
		{
			title: $t('navigation.purpleTriggers'),
			image: '/icons/quests/trigger.png',
			items: [
				{ label: 'Aelio Intruders', link: '/runs/purples/aelio-intruders' },
				{ label: 'Stia', link: '/runs/purples/stia' },
				{ label: 'Kvaris', link: '/runs/purples/kvaris' },
				{ label: 'Retem', link: '/runs/purples/retem' },
				{ label: 'Aelio', link: '/runs/purples/aelio' },
			],
		},
		{
			title: $t('navigation.bosses'),
			image: '/icons/quests/uq.png',
			items: [
				{ label: 'Dark Falz Dalion', link: '/runs/dfdalion/quest' },
				{ label: 'Dark Falz Solus', link: '/runs/dfsolus/solo' },
				{ label: 'Venogia', link: '/runs/venogia/solo' },
				{ label: 'Dark Falz Aegis', link: '/runs/dfaegis/quest' },
			],
		},
		{
			title: $t('navigation.duels'),
			image: '/icons/quests/duel.png',
			items: [
				{ label: 'Nex Aelio', link: '/runs/duels/nex-aelio' },
				{ label: 'Renus Retem', link: '/runs/duels/renus-retem' },
				{ label: 'Ams Kvaris', link: '/runs/duels/ams-kvaris' },
				{ label: 'Nils Stia', link: '/runs/duels/nils-stia' },
				{ label: 'Halvaldi', link: '/runs/duels/halvaldi' },
				{ label: 'Zelvin', link: '/runs/duels/zelvin' },
				{ label: 'Ringwedge', link: '/runs/duels/ringwedge' },
			],
		},
	] satisfies MenuGroup[];

	$: loginTitle = (() => {
		if (isLoadingLogin) return 'Loading...';
		return !isLoggedIn ? 'Login' : $playerInfoStore?.playerName ?? '<Unknown>';
	})();
	$: loginMenu = {
		title: loginTitle,
		link: !isLoggedIn ? '/login' : undefined,
		show: $consentSelected && !isNotCompleteAccountSetup,
		icon: !isLoggedIn ? 'login' : 'person-circle',
		items: isLoggedIn
			? [
					{ label: 'My Runs', link: '/profile/submissions', icon: 'envelope-paper' },
					{ label: 'Profile', link: '/profile', icon: 'profile' },
					{ label: 'Settings', link: '/settings', icon: 'gear' },
					{ label: 'Logout', link: '/logout', icon: 'logout' },
			  ]
			: [],
	} satisfies MenuGroup;

	$: consentMenu = {
		title: 'Login',
		link: '/',
		icon: 'login',
		disabled: true,
		disabledTooltip: 'Accept cookies to use Account features',
		show: !$consentSelected,
	} satisfies MenuGroup;

	$: accountSetupMenu = {
		title: $clientPrincipleStore?.userDetails ?? '<Unknown>',
		show: isNotCompleteAccountSetup,
		items: [{ label: 'Logout', link: '/logout', icon: 'box-arrow-right' }],
	};

	$: submitMenu = {
		title: 'Submit a Run',
		show: isLoggedIn,
		icon: 'envelope-paper',
		link: '/submit',
	} satisfies MenuGroup;

	$: moderationMenu = {
		title: 'Moderation',
		show: isMod && isLoggedIn,
		icon: 'shield',
		link: '/moderator/submissions',
	} satisfies MenuGroup;

	$: dynamicMenuItems = [
		submitMenu,
		moderationMenu,
		consentMenu,
		loginMenu,
		accountSetupMenu,
	] satisfies MenuGroup[];
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
		'/tos',
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

<Navbar groups={headerMenuItems}>
	<slot />
</Navbar>
