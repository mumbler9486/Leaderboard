<script lang="ts">
	import HeaderMenu, { type MenuGroup } from './HeaderMenu.svelte';
	import LanguageSelector from './LanguageSelector.svelte';
	import { t } from 'svelte-i18n';
	import { clientPrincipleStore, playerInfoStore } from './stores/userLogin';
	import { UserRole } from './types/api/users/userRole';
	import { consentSelected } from './stores/consent';

	const staticMenuItems: MenuGroup[] = [
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
			title: $t('navigation.darkFalzAegis'),
			image: '/icons/quests/uq.png',
			items: [
				{ label: 'Solo', link: '/runs/dfa/solo' },
				{ label: 'Duo', link: '/runs/dfa/duo' },
				{ label: 'Party', link: '/runs/dfa/party' }
			]
		},
		{
			title: $t('navigation.duels'),
			image: '/icons/quests/duel.png',
			items: [
				{ label: 'Nex Aelio', link: '/runs/indomitable/nexaelio' },
				{ label: 'Renus Retem', link: '/runs/indomitable/renusretem' },
				{ label: 'Ams Kvaris', link: '/runs/indomitable/amskvaris' },
				{ label: 'Nils Stia', link: '/runs/indomitable/nilsstia' },
				{ label: 'Halvaldi', link: '/runs/indomitable/halvaldi' }
			]
		}
	];

	$: loginTitle = (() => {
		if (isLoadingLogin) return 'Loading...';
		return !isLoggedIn ? 'Login' : $playerInfoStore?.playerName ?? '<Unknown>';
	})();
	$: loginMenu = {
		title: loginTitle,
		link: !isLoggedIn ? '/login' : undefined,
		show: $consentSelected,
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

	$: dynamicMenuItems = [submitMenu, moderationMenu, consentMenu, loginMenu] as MenuGroup[];
	$: headerMenuItems = staticMenuItems.concat(dynamicMenuItems);

	let isLoadingLogin: boolean = false;

	$: isLoggedIn =
		$consentSelected &&
		!!$clientPrincipleStore &&
		($clientPrincipleStore.userRoles?.includes(UserRole.User) ?? false) &&
		!!$playerInfoStore;

	$: isAdmin = $clientPrincipleStore?.userRoles?.includes(UserRole.Administrator) ?? false;
	$: isMod = $clientPrincipleStore?.userRoles?.includes(UserRole.Moderator) ?? false;

	const loadLogin = async () => {
		isLoadingLogin = true;
		const userInfo = await clientPrincipleStore.fetchClientPrinciple();
		if (!userInfo) {
			//User not logged in
			return;
		}
		await playerInfoStore.refreshInfo();
		isLoadingLogin = false;
	};

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
