<script lang="ts" module>
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
	interface Props {
		tabs: TabOptions[];
		bold?: boolean;
		activeTab?: number;
	}

	let { tabs, bold = false, activeTab = $bindable(0) }: Props = $props();
</script>

<div role="tablist" class="tabs tabs-bordered flex flex-wrap">
	{#each tabs as tab, i}
		<div
			role="tab"
			class="tab {colorMap[tab.color ?? '']}"
			class:tab-active={i === activeTab}
			class:font-bold={bold}
			tabindex={i + 1}
			onkeyup={() => (activeTab = i)}
			onclick={() => (activeTab = i)}
		>
			{tab.name}
		</div>
	{/each}
</div>
