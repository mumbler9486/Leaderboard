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
	import Tooltip from '../../Components/Tooltip.svelte';
	import AlertInfoIcon from '../../Components/Icons/AlertInfoIcon.svelte';
	import {
		Inbox,
		Identification,
		Cog8Tooth,
		ArrowRightOnRectangle,
		ShieldCheck,
		ChevronDown,
		UserCircle,
	} from 'svelte-heros-v2';
	import type { ComponentType } from 'svelte';

	export let title: string;
	export let groups: MenuGroup[];

	const iconMap: Record<string, ComponentType> = {
		'info-circle': AlertInfoIcon,
		'envelope-paper': Inbox,
		profile: Identification,
		gear: Cog8Tooth,
		logout: ArrowRightOnRectangle,
		shield: ShieldCheck,
		'person-circle': UserCircle,
	};
</script>

<!-- TODO icon -->

<!--Mobile Headers-->
<div class="dropdown dropdown-end ml-auto md:hidden">
	<label tabindex="0" class="btn btn-ghost rounded-btn">{title}</label>
	<ul tabindex="0" class="menu dropdown-content mt-4 w-52 rounded-box bg-base-100 p-2 shadow">
		{#each groups.filter((g) => g.show ?? true) as group}
			{#if group.link}
				<li>
					<a class="flex text-sm font-semibold uppercase" href={group.link}>
						{#if group.image}
							<img src={group.image} class="pointer-events-none mr-2" />
						{:else if group.icon}
							<svelte:component this={iconMap[group.icon]} />
						{/if}
						{group.title}
					</a>
				</li>
			{:else if group.items}
				<span class="m-2 flex text-xs font-semibold uppercase">
					{#if group.image}
						<img src={group.image} class="pointer-events-none mr-2" />
					{:else if group.icon}
						<svelte:component this={iconMap[group.icon]} />
					{/if}
					{group.title}
				</span>
				{#each group.items as item}
					<li>
						<a href={item.link} tabindex="0" style="border-radius: 0px">
							{#if item.icon}
								<svelte:component this={iconMap[item.icon]} />
							{/if}
							{item.label}
						</a>
					</li>
				{/each}
			{/if}
		{/each}
	</ul>
</div>

<!-- Desktop Headers -->
<div class="navbar-end hidden md:flex">
	{#each groups.filter((g) => g.show ?? true) as group}
		{#if group.link}
			{#if !group.disabled}
				<a href={group.link} class="btn btn-ghost no-animation rounded-none">
					{#if group.image}
						<img src={group.image} class="pointer-events-none mr-2" />
					{:else if group.icon}
						<svelte:component this={iconMap[group.icon]} />
					{/if}
					{group.title}
				</a>
			{:else}
				<Tooltip left tip={group.disabledTooltip ?? ''}>
					<div class="btn btn-disabled no-animation cursor-not-allowed rounded-none">
						{#if group.image}
							<img src={group.image} class="pointer-events-none mr-2" />
						{:else if group.icon}
							<svelte:component this={iconMap[group.icon]} />
						{/if}
						{group.title}
					</div>
				</Tooltip>
			{/if}
		{:else if group.items}
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost no-animation rounded-none">
					<span class="flex whitespace-nowrap">
						{#if group.image}
							<img src={group.image} class="pointer-events-none mr-2" />
						{:else if group.icon}
							<svelte:component this={iconMap[group.icon]} />
						{/if}{group.title}
						<ChevronDown />
					</span>
				</label>
				<ul
					tabindex="-1"
					class="menu dropdown-content whitespace-nowrap border border-secondary bg-neutral text-base shadow"
				>
					{#each group.items as item}
						<li>
							<a href={item.link} tabindex="0" style="border-radius: 0px">
								{#if item.icon}
									<svelte:component this={iconMap[item.icon]} />
								{/if}
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{/each}
</div>
