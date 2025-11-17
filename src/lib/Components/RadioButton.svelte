<script lang="ts">
	interface Props {
		icon?: string | undefined;
		alt: string;
		value: string;
		name: string;
		group: any;
		disabled?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		icon = undefined,
		alt,
		value,
		name,
		group = $bindable(),
		disabled = false,
		children
	}: Props = $props();
</script>

<div class="form-control">
	<label
		class="label w-32 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2 md:w-[10.1rem]"
	>
		{#if !!icon}
			<img class="pointer-events-none" src={icon} {alt} />
		{/if}
		<span class="label-text">{@render children?.()}</span>
		<input
			type="radio"
			class="radio radio-sm rounded border-neutral-content/25 checked:bg-neutral-content"
			checked
			bind:group
			{name}
			{value}
			{disabled}
		/>
	</label>
</div>
