<script context="module" lang="ts">
	export interface MenuGroup {
		title: string;
		icon?: string;
		image?: string;
		show?: boolean;
		link?: string;
		disabled?: boolean;
		disabledTooltip?: string;
		items?: MenuItem[];
	}

	export interface MenuItem {
		label: string;
		link: string;
		icon?: string;
	}
</script>

<script lang="ts">
	import { t } from 'svelte-i18n';
	import AlertInfoIcon from '../../Components/Icons/AlertInfoIcon.svelte';
	import {
		Inbox,
		Identification,
		Cog8Tooth,
		ArrowRightOnRectangle,
		ShieldCheck,
		UserCircle,
		Bars3,
		ArrowLeftOnRectangle,
	} from 'svelte-heros-v2';
	import { onDestroy, type ComponentType, onMount } from 'svelte';
	import Tooltip from '../../Components/Tooltip.svelte';
	import LanguageSelector from '$lib/PageComponents/Header/LanguageSelector.svelte';

	export let groups: MenuGroup[];

	const dropdowns: Record<number, HTMLDetailsElement> = {};
	$: allDropdowns = Object.values(dropdowns);

	let drawerOpen = false;

	const iconMap: Record<string, ComponentType> = {
		'info-circle': AlertInfoIcon,
		'envelope-paper': Inbox,
		profile: Identification,
		gear: Cog8Tooth,
		logout: ArrowRightOnRectangle,
		shield: ShieldCheck,
		'person-circle': UserCircle,
		login: ArrowLeftOnRectangle,
	};

	const closeMenuAfterClick = async (e: MouseEvent) => {
		Object.values(dropdowns).forEach((d) => {
			d.open = false;
		});
	};

	const closeSidebarAfterClick = async () => {
		drawerOpen = false;
	};

	const closeOtherMenus = async (e: Event, groupIndex: number) => {
		const toggleEvent = e as ToggleEvent; //It should be a toggle event. Maybe bug on svelte
		if (toggleEvent.newState !== 'open') {
			return;
		}
		Object.entries(dropdowns)
			.filter((d) => d[0] !== groupIndex.toString())
			.forEach((d) => {
				d[1].open = false;
			});
	};

	const defocusClick = async (e: MouseEvent) => {
		if (!e.target) {
			return;
		}
		const targetElement = e.target as HTMLDetailsElement;
		if (!allDropdowns.includes(targetElement)) {
			closeMenuAfterClick(e);
		}
	};

	onMount(() => document.addEventListener('click', defocusClick));
	onDestroy(() => document.removeEventListener('click', defocusClick));
</script>

<div class="drawer fixed z-20">
	<input id="navbar-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar w-full bg-[#050f1d]">
			<div class="flex-none lg:hidden">
				<label for="navbar-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<Bars3 />
				</label>
			</div>
			<div class="mx-2 flex-1 justify-center px-2 lg:justify-start">
				<!-- Logo -->
				<a href="/">
					<img
						class="pointer-events-none h-9 select-none object-contain"
						src="/logos/logo.png"
						alt={$t('shared.siteName')}
					/>
				</a>
			</div>
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					{#each groups.filter((g) => g.show ?? true) as group, groupIndex}
						{#if group.link}
							{#if !group.disabled}
								<!-- Menu without children -->
								<li>
									<a href={group.link} on:click={closeMenuAfterClick}>
										{#if group.image}
											<img src={group.image} class="pointer-events-none mr-2" alt={group.title} />
										{:else if group.icon}
											<svelte:component this={iconMap[group.icon]} />
										{/if}
										{group.title}
									</a>
								</li>
							{:else}
								<!-- Disabled Menu without children -->
								<Tooltip left tip={group.disabledTooltip ?? ''}>
									<li>
										<div>
											{#if group.image}
												<img src={group.image} class="pointer-events-none mr-2" alt={group.title} />
											{:else if group.icon}
												<svelte:component this={iconMap[group.icon]} />
											{/if}
											{group.title}
										</div>
									</li>
								</Tooltip>
							{/if}
						{:else if group.items}
							<!-- Item with submenu -->
							<li>
								<details
									class="menu-group"
									bind:this={dropdowns[groupIndex]}
									on:toggle={(e) => closeOtherMenus(e, groupIndex)}
									on:blur={() => console.log('monkye')}
								>
									<summary
										>{#if group.image}
											<img src={group.image} class="pointer-events-none mr-2" alt={group.title} />
										{:else if group.icon}
											<svelte:component this={iconMap[group.icon]} />
										{/if}
										{group.title}
									</summary>
									<ul class="p-2">
										<!-- Submenu -->
										{#each group.items as item}
											<li>
												<a href={item.link} on:click={closeMenuAfterClick}>
													{#if item.icon}
														<svelte:component this={iconMap[item.icon]} />
													{/if}
													{item.label}
												</a>
											</li>
										{/each}
									</ul>
								</details>
							</li>
						{/if}
					{/each}
				</ul>
				<LanguageSelector />
			</div>
		</div>
		<!-- Page content here -->
		<div>
			<slot />
		</div>
	</div>
	<div class="drawer-side">
		<label for="navbar-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu min-h-full w-80 bg-[#050f1d] p-4">
			<div
				data-sveltekit-preload-data=""
				class="sticky top-0 z-20 mb-4 items-center gap-2 px-4 py-2 shadow-sm backdrop-blur lg:flex"
			>
				<div class="font-title inline-flex text-lg">PSO2 Central Leaderboard</div>
			</div>
			<!-- Sidebar content here -->
			{#each groups.filter((g) => g.show ?? true) as group}
				{#if group.link}
					{#if !group.disabled}
						<!-- Menu without children -->
						<li>
							<a href={group.link} on:click={closeSidebarAfterClick}>
								{#if group.image}
									<img src={group.image} class="pointer-events-none mr-2" alt={group.title} />
								{:else if group.icon}
									<svelte:component this={iconMap[group.icon]} />
								{/if}
								{group.title}
							</a>
						</li>
					{:else}
						<!-- Disabled Menu without children -->
						<Tooltip tip={group.disabledTooltip ?? ''}>
							<li>
								<div>
									{#if group.image}
										<img src={group.image} class="pointer-events-none mr-2" alt={group.title} />
									{:else if group.icon}
										<svelte:component this={iconMap[group.icon]} />
									{/if}
									{group.title}
								</div>
							</li>
						</Tooltip>
					{/if}
				{:else if group.items}
					<!-- Item with submenu -->
					<li>
						<details>
							<summary
								>{#if group.image}
									<img src={group.image} class="pointer-events-none ml-1 mr-1" alt={group.title} />
								{:else if group.icon}
									<svelte:component this={iconMap[group.icon]} />
								{/if}
								{group.title}
							</summary>
							<ul class="p-2">
								<!-- Submenu -->
								{#each group.items as item}
									<li>
										<a href={item.link} on:click={closeSidebarAfterClick}>
											{#if item.icon}
												<svelte:component this={iconMap[item.icon]} />
											{/if}
											{item.label}
										</a>
									</li>
								{/each}
							</ul>
						</details>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</div>
