<script lang="ts" context="module">
	export interface TableHeader {
		label: string;
		tooltip?: string;
		textAlign?: 'default' | 'center' | 'right';
		class?: string;
	}
</script>

<script lang="ts">
	import InfoTooltip from '../InfoTooltip.svelte';

	export let headers: TableHeader[];
	export let zebra: boolean = false;
	export let pinRows: boolean = false;
	export let pinCols: boolean = false;
	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

	const sizeClasses = {
		xs: 'table-xs',
		sm: 'table-sm',
		md: 'table-md',
		lg: 'table-lg'
	};
</script>

<table
	class="table {sizeClasses[size]} {$$restProps.class}"
	class:table-zebra={zebra}
	class:table-pin-rows={pinRows}
	class:table-pin-cols={pinCols}
>
	<thead>
		<tr class="text-sm" class:top-16={pinRows}>
			{#each headers as header}
				<th
					class="bg-neutral text-neutral-content {header.class ?? ''}"
					class:text-right={header.textAlign === 'right'}
					class:text-center={header.textAlign === 'center'}
				>
					{header.label}
					{#if header.tooltip}
						<InfoTooltip tip={header.tooltip} />
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		<slot />
	</tbody>
</table>
