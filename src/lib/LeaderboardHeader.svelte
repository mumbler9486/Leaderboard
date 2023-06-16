<script lang="ts">
	import HeaderMenu from './HeaderMenu.svelte';

	import { t } from 'svelte-i18n';
	import UserMenu from './UserMenu.svelte';
	import LanguageSelector from './LanguageSelector.svelte';
</script>

<header class="sticky top-0 z-50" style="background-color:RGBA(5,15,29,0.8);">
	<div class="container mx-auto px-2">
		<div class="navbar">
			<div class="navbar-start">
				<a href="/">
					<img class="h-9 object-contain" src="/logos/logo.png" alt={$t('shared.siteName')} />
				</a>
			</div>

			<HeaderMenu
				title="Runs"
				groups={[
					{
						title: $t('navigation.purpleTriggers'),
						icon: '/icons/quests/trigger.png',
						items: [
							{ label: 'Solo', link: '/runs/purple/solo' },
							{ label: 'Duo', link: '/runs/purple/duo' },
							{ label: 'Party', link: '/runs/purple/party' }
						]
					},
					{
						title: $t('navigation.darkFalzAegis'),
						icon: '/icons/quests/uq.png',
						items: [
							{ label: 'Solo', link: '/runs/dfa/solo' },
							{ label: 'Duo', link: '/runs/dfa/duo' },
							{ label: 'Party', link: '/runs/dfa/party' }
						]
					},
					{
						title: $t('navigation.duels'),
						icon: '/icons/quests/duel.png',
						items: [
							{ label: 'Nex Aelio', link: '/runs/indomitable/nexaelio' },
							{ label: 'Renus Retem', link: '/runs/indomitable/renusretem' },
							{ label: 'Ams Kvaris', link: '/runs/indomitable/amskvaris' },
							{ label: 'Nils Stia', link: '/runs/indomitable/nilsstia' },
							{ label: 'Halvaldi', link: '/runs/indomitable/halvaldi' }
						]
					}
				]}
			/>
			<UserMenu />
			<LanguageSelector />
		</div>
	</div>
</header>
