<script lang="ts">
	export let title: string;
	export let groups: MenuGroup[];

	interface MenuGroup {
		title: string;
		icon?: string;
		items: MenuItem[];
	}

	interface MenuItem {
		label: string;
		link: string;
	}
</script>

<div class="dropdown-end dropdown ml-auto md:hidden">
	<label tabindex="0" class="btn-ghost rounded-btn btn">{title}</label>
	<ul tabindex="0" class="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow">
		{#each groups as group}
			<span class="m-2 flex text-center text-xs font-semibold uppercase"
				><img src={group.icon} class="mr-2" />{group.title}</span
			>
			{#each group.items as item}
				<li>
					<a href={item.link} tabindex="0" style="border-radius: 0px">{item.label}</a>
				</li>
			{/each}
		{/each}
	</ul>
</div>

<div class="navbar-end hidden md:flex">
	{#each groups as group}
		<div class="dropdown-end dropdown">
			<label tabindex="0" class="btn-ghost no-animation btn rounded-none"
				><span class="flex whitespace-nowrap">
					{#if group.icon}
						<img src={group.icon} class="mr-2" />
					{/if}
					{group.title}<i class="bi bi-caret-down ml-2" /></span
				></label
			>
			<ul
				tabindex="-1"
				class="dropdown-content menu whitespace-nowrap border border-secondary bg-neutral text-base shadow"
			>
				{#each group.items as item}
					<li>
						<a href={item.link} tabindex="0" style="border-radius: 0px">{item.label}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
