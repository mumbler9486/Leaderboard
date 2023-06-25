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
	import Tooltip from './Components/Tooltip.svelte';

	export let title: string;
	export let groups: MenuGroup[];
</script>

<!--Mobile Headers-->
<div class="dropdown-end dropdown ml-auto md:hidden">
	<label tabindex="0" class="btn-ghost rounded-btn btn">{title}</label>
	<ul tabindex="0" class="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow">
		{#each groups.filter((g) => g.show ?? true) as group}
			{#if group.link}
				<li>
					<a class="flex text-sm font-semibold uppercase">
						{#if group.image}
							<img src={group.image} class="mr-2" />
						{:else if group.icon}
							<i class="bi mr-2 {group.icon}" />
						{/if}
						{group.title}
					</a>
				</li>
			{:else if group.items}
				<span class="m-2 flex text-xs font-semibold uppercase">
					{#if group.image}
						<img src={group.image} class="mr-2" />
					{:else if group.icon}
						<i class="bi mr-2 {group.icon}" />
					{/if}
					{group.title}
				</span>
				{#each group.items as item}
					<li>
						<a href={item.link} tabindex="0" style="border-radius: 0px">
							{#if item.icon}
								<i class="bi mr-2 {item.icon}" />
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
				<a href={group.link} class="btn-ghost no-animation btn rounded-none">
					{#if group.image}
						<img src={group.image} class="mr-2" />
					{:else if group.icon}
						<i class="bi mr-2 {group.icon}" />
					{/if}
					{group.title}
				</a>
			{:else}
				<Tooltip left tip={group.disabledTooltip ?? ''}>
					<div class="btn-disabled no-animation btn cursor-not-allowed rounded-none">
						{#if group.image}
							<img src={group.image} class="mr-2" />
						{:else if group.icon}
							<i class="bi mr-2 {group.icon}" />
						{/if}
						{group.title}
					</div>
				</Tooltip>
			{/if}
		{:else if group.items}
			<div class="dropdown-end dropdown">
				<label tabindex="0" class="btn-ghost no-animation btn rounded-none">
					<span class="flex whitespace-nowrap">
						{#if group.image}
							<img src={group.image} class="mr-2" />
						{:else if group.icon}
							<i class="bi mr-2 {group.icon}" />
						{/if}{group.title}<i class="bi bi-caret-down ml-2" />
					</span>
				</label>
				<ul
					tabindex="-1"
					class="dropdown-content menu whitespace-nowrap border border-secondary bg-neutral text-base shadow"
				>
					{#each group.items as item}
						<li>
							<a href={item.link} tabindex="0" style="border-radius: 0px">
								{#if item.icon}
									<i class="bi mr-2 {item.icon}" />
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
