<script lang="ts" module>
	export interface TableHeader {
		label: string;
		tooltip?: string;
		textAlign?: 'default' | 'center' | 'right';
		class?: string;
	}
</script>

<script lang="ts">
	import InfoTooltip from '../InfoTooltip.svelte';

	interface Props {
		headers: TableHeader[];
		zebra?: boolean;
		pinRows?: boolean;
		pinCols?: boolean;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		headers,
		zebra = false,
		pinRows = false,
		pinCols = false,
		size = 'md',
		children,
		...rest
	}: Props = $props();

	const sizeClasses = {
		xs: 'table-xs',
		sm: 'table-sm',
		md: 'table-md',
		lg: 'table-lg',
	};
</script>

<table
	class="table {sizeClasses[size]} {rest.class}"
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
		{@render children?.()}
	</tbody>
</table>
