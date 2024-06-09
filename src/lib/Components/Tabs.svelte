<script lang="ts" context="module">
	export interface TabOptions {
		name: string;
		color?: keyof typeof colorMap;
	}

	export const colorMap: Record<string, string> = {
		red: 'text-red-600',
		yellow: 'text-primary',
		green: 'text-green-600',
		blue: 'text-blue-600',
		purple: 'text-purple-600',
		orange: 'text-orange-600',
		pink: 'text-pink-600',
	} as const;
</script>

<script lang="ts">
	export let tabs: TabOptions[];
	export let bold: boolean = false;
	export let activeTab: number = 0;
</script>

<div role="tablist" class="tabs tabs-bordered flex flex-wrap">
	{#each tabs as tab, i}
		<div
			role="tab"
			class="tab {colorMap[tab.color ?? '']}"
			class:tab-active={i === activeTab}
			class:font-bold={bold}
			tabindex={i + 1}
			on:keyup={() => (activeTab = i)}
			on:click={() => (activeTab = i)}
		>
			{tab.name}
		</div>
	{/each}
</div>
