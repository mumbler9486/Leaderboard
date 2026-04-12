<script lang="ts" context="module" generics="T">
	export interface SelectValues<T> {
		label: string;
		value: T;
		icon?: string | undefined;
		disabled?: boolean;
	}
	export type DropdownSize = 'lg' | 'md' | 'sm' | 'xs' | 'default';

	// 1. Define the Props Interface named Props, incorporating generics
	interface Props<T> {
		options: SelectValues<T>[];
		label?: string | undefined;
		value?: T | null | undefined;
		placeholder?: string | undefined;
		disabled?: boolean;
		error?: string | undefined;
		size?: DropdownSize;
		fullWidth?: boolean;
	}
</script>

<script lang="ts" generics="T">
	// 2. Use $props() to capture props, setting defaults in the argument object
	let {
		options,
		label = undefined,
		value = null,
		placeholder = undefined,
		disabled = false,
		error = undefined,
		size = 'default',
		fullWidth = false
	} = $props<Props<T>>();

	const sizeClasses: Record<DropdownSize, string> = {
		lg: 'select-lg',
		md: 'select-md',
		sm: 'select-sm',
		xs: 'select-xs',
		default: ''
	};
</script>

<label class="form-control" class:w-full={fullWidth}>
	{#if !!label && label.length > 0}
		<div class="label">
			<span class="label-text-alt">{label}</span>
		</div>
	{/if}
	<select class="select-bordered select {sizeClasses[size]}" {disabled} bind:value on:change>
		{#if placeholder}
			<option disabled selected>{placeholder}</option>
		{/if}
		{#each options as option}
			{#if option.icon}
				<img class="pointer-events-none" src={option.icon} alt={`${option.value}-icon`} />
			{/if}
			<option value={option.value} disabled={option.disabled ?? false}>{option.label}</option>
		{/each}
	</select>
	{#if !!error && error.length > 0}
		<div class="label">
			<span class="label-text-alt text-error">{error}</span>
		</div>
	{/if}
</label>
